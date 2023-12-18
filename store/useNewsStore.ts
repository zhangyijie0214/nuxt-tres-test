/*
 * @description : 新闻资讯Store
 * @author : zhangyijie
 * @date : 2023-12-05 10:19:49
 * @lastTime : 2023-12-07 13:04:31
 * @LastAuthor : Do not edit
 * @文件路径 : /store/useNewsStore.ts
 */

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ColumnCodeInfo } from '../config'
import { ElLoading } from "element-plus"

interface INewsStoreState {
    newsList:any[],
    curDataInfo:any
}

const News_STORE_STATE: INewsStoreState = {
    curDataInfo:{
        partId:ColumnCodeInfo.COMPANY_NEWS,
        list:[],
        curPage:1,
        recCount:0,
        pageSize:8,
        isLoading:false
    },
    newsList:[
        {
          id: ColumnCodeInfo.INDUSTRY_RESEARCH,
          name: "行业研究",
          icon: "icon-hangyeyanjiu",
        },
        {
          id: ColumnCodeInfo.IMPORTANT_ANNOUNCEMENTS,
          name: "重要公告",
          icon: "icon-zhongyaogonggao",
        },
        {
          id: ColumnCodeInfo.ENERGY_STORAGE_RESEARCH,
          name: "储能科研",
          icon: "icon-chunengkeyan",
        },
        {
          id: ColumnCodeInfo.COMPANY_NEWS,
          name: "公司新闻",
          icon: "icon-gongsixinwen",
        }
      ]
}

export const useNewsStore = defineStore('useNewsStore', () => {

    // 创建 Store state
    const state: INewsStoreState = reactive(News_STORE_STATE)
    const { $api } = useNuxtApp()
    // 加载事件
    let loadingInstance = null
    watch(()=> state.curDataInfo.partId,()=>{
        state.curDataInfo.curPage = 1
        state.curDataInfo.recCount = 0
        state.curDataInfo.list = []
        getInfoList()
    })

    watch(()=> state.curDataInfo.isLoading,()=>{
      if (!state.curDataInfo.isLoading) {
        loadingInstance && loadingInstance.close()
      } else {
        loadingInstance = ElLoading.service({ fullscreen: true })
      }
  })
    
    /**
     * @description : 获取信息列表
     * @author : zhangyijie
     * @date : 2023-08-22 09:20:26
     * @param {any} date
     */
    const getInfoList = async() => {
        const _date = {
            PageSize:state.curDataInfo.pageSize,
            CurPage:state.curDataInfo.curPage,
            cmn_user_type_key:"FrontEndUser",
            part_id:state.curDataInfo.partId
        }
        state.curDataInfo.isLoading = true
        state.curDataInfo.list = []
        const _res = await $api.getInfoList(_date)
        state.curDataInfo.isLoading = false
        if(!_res.success) {

            console.warn('getInfoList',_res.msg)
            
            return

        }
        state.curDataInfo.list = _res.data
        state.curDataInfo.recCount = _res.RecCount
        return _res

    }
    return {
        state,
        getInfoList,
    }

})

export type UseNewsStoreReturn = ReturnType<typeof useNewsStore>