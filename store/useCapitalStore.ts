/*
 * @description : 
 * @author : zhangyijie
 * @date : 2023-12-06 17:20:22
 * @lastTime : 2023-12-07 15:30:31
 * @LastAuthor : Do not edit
 * @文件路径 : /store/useCapitalStore.ts
 */
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ColumnCodeInfo,FileCodeInfo } from '../config'
import { ElLoading } from "element-plus"

interface ICapitalStoreState {
    // 是否加载中
    isLoading: boolean,
    // 当前显示的栏目
    curPartId:number,
    // 资本列表
    capitalList:any[],
    // 投资者工具列表
    investorToolsList:any[],
}

const CAPITAL_STORE_STATE: ICapitalStoreState = {
    isLoading:false,
    curPartId:ColumnCodeInfo.INVESTOR_NEWS,
    capitalList:[
        {
            id: ColumnCodeInfo.INVESTOR_NEWS,
            bannerImg: 'img/capital/news_banner.png',
            name: "投资者新闻",
            desc: "实时投资市场信息，助您明智投资。",
            event:null,
            info:{
                // 当前页面
                curPage:1,
                // 总数量
                recCount:0,
                // 页面尺寸 如果为0显示全部
                pageSize:8,
                // 当前页面数据
                list:[]
            }
        },
        {
            id:ColumnCodeInfo.CORPORATE_GOVERNANCE_LEADERSHIP,
            bannerImg: 'img/capital/news_banner.png',
            name: "公司治理",
            desc: "多种方式规范化管理公司",
            topList:[],
            bottomList:[]
        },
        {
            id:ColumnCodeInfo.INVESTOR_TOOLS,
            bannerImg: 'img/capital/news_banner.png',
            name: "投资者工具",
            desc: "",
            dataList: []
        },
        {
            id: ColumnCodeInfo.CONTACT_PERSON,
            bannerImg: 'img/capital/news_banner.png',
            name: "联络投资者关系部",
            desc: "",
        }
    ],
    investorToolsList:[
        {
            id: ColumnCodeInfo.INVESTOR_TOOLS_COMPANY_INFO,
            title: '企业信息',
            icon: 'icon-qiyexinxi',
            list:[]
        },
        {
            id: ColumnCodeInfo.INVESTOR_TOOLS_BUSINESS_INFO,
            title: '业务信息',
            icon: 'icon-business',
            list:[]

        }, {
            id:ColumnCodeInfo.INVESTOR_TOOLS_INVESTMENT_INFO,
            title: '投资信息',
            icon: 'icon-touzixinxi',
            list:[]

        }, {
            id: ColumnCodeInfo.INVESTOR_TOOLS_FINANCIAL_REPORTS,
            title: '财务报告',
            icon: 'icon-caiwubaogao',
            list:[]

        }, {
            id: ColumnCodeInfo.INVESTOR_TOOLS_CORPORATE_GOVERNANCE,
            title: '公司治理',
            icon: 'icon-gongsizhili',
            list:[]

        }, {
            id: ColumnCodeInfo.INVESTOR_TOOLS_CONTACT_INFO,
            title: '联络信息',
            icon: 'icon-lianluoxinxi',
            list:[]

        }
    ]
}

export const useCapitalStore = defineStore('useCapitalStore', () => {

    // 创建 Store state
    const state: ICapitalStoreState = reactive(CAPITAL_STORE_STATE)
    const { $api } = useNuxtApp()

    let loadingInstance = null
    watch(()=> state.isLoading,()=>{
        if (!state.isLoading) {
          loadingInstance && loadingInstance.close()
        } else {
          loadingInstance = ElLoading.service({ fullscreen: true })
        }
    })

    /**
     * @description : 获取投资者新闻信息列表
     * @author : zhangyijie
     * @date : 2023-08-22 09:20:26
     * @param {any} date
     */
    const getCapitalNewsListInfoList = async() => {
        const _newsItem = state.capitalList.find(item => item.id === ColumnCodeInfo.INVESTOR_NEWS)
        const { info } = _newsItem
        const _date = {
            PageSize:info.pageSize,
            CurPage:info.curPage,
            cmn_user_type_key:"FrontEndUser",
            part_id:_newsItem.id
        }
        info.list = []
        state.isLoading = true
        const _res = await $api.getInfoList(_date)
        state.isLoading = false

        if(!_res.success) {

            console.warn('getInfoList',_res.msg)

            return

        }
        info.list = _res.data
        info.recCount = _res.RecCount
        return 

    }
    /**
     * @description : 不分页请求全全部信息列表
     * @author : zhangyijie
     * @date : 2023-12-07 14:16:05
     */    
    const getInfoList = async(id) => {
        const _date = {
            cmn_user_type_key:"FrontEndUser",
            part_id:id
        }
        const _res = await $api.getInfoList(_date)
        if(!_res.success) {

            console.warn('getInfoList',_res.msg)
            return []
        }
        return _res.data
    }
    /**
     * @description : 获取产品下载列表
     * @author : zhangyijie
     * @date : 2023-12-05 14:43:43
     */  
    const getFileList = async() => {

        // 如果有值就不请求数据了
        if(state.fileList){
           return 
       }
       const _res = await $api.getFileList({
        file_category_id:FileCodeInfo.CAPITAL_OPERATION_CORPORATE_GOVERNANCE
       })
       if(!_res.success) {

           console.warn('getFileList file ==> ',_res.msg)

           return []

       }
       return _res.data
   }
    return {
        state,
        getCapitalNewsListInfoList,
        getInfoList,
        getFileList
    }

})

export type UseCapitalStoreReturn = ReturnType<typeof useCapitalStore>