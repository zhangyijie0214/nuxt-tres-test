/*
 * @description : 支持中心
 * @author : zhangyijie
 * @date : 2023-12-05 11:32:58
 * @lastTime : 2023-12-06 14:19:51
 * @LastAuthor : Do not edit
 * @文件路径 : /store/useSupportStore.ts
 */

import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { FileCodeInfo } from '../config'
// 服务热线
interface IServiceHotline {
    // 服务热线代码
    service_hotline_id:string,
    // 地址
    address:string,
    // 电话
    phone:string,
    // 邮箱
    email:string,
}
// 合作伙伴
interface Partner{
    // 合作伙伴代码
    partner_id:string,
    // 地址
    address:string,
    // 合作伙伴名称
    partner_name:string,
    // 公司
    company:string,
    // 联系人名称
    contact_name:string,
    // 邮箱
    email:string,
}
// 产品下载
interface ProductDownload{
    // 产品下载代码
    product_download_id:string,
    // 产品名称
    product_name:string,
    // 产品图片路径
    product_pic_path:string,
    // 技术参数链接
    technical_param_link:string,
    // 质保条款链接
    warranty_terms_link:string,
    // 用户手册链接
    user_manual_link:string,
    // 产品视频链接
    product_video_link:string
}

interface ProductDownloadCategory{
    // 产品下载分类代码
    product_download_category_id:string,
    // 产品下载分类描述
    product_download_category_desc:string,
    // 产品下载列表
    product_download_list:ProductDownload[]
}
// 文件
interface FileInfo{
    // 文件代码
    file_id:string,
    // 文件路径
    file_path:string,
    // 文件名称
    file_name:string,
    // 日期
    date:string
}

// 支持中心相关信息
interface ISupportStoreState {
    // 服务热线列表
    serviceHotlineList:IServiceHotline[],
    // 合作伙伴
    partnerList:Partner[],
    // 产品下载列表
    productDownloadList:ProductDownloadCategory[],
    // 文件列表
    fileList:FileInfo[]
}

const Support_STORE_STATE: ISupportStoreState = {
}

export const useSupportStore = defineStore('useSupportStore', () => {

    // 创建 Store state
    const state: ISupportStoreState = reactive(Support_STORE_STATE)
    const { $api } = useNuxtApp()

    /**
     * @description : 获取服务热线
     * @author : zhangyijie
     * @date : 2023-12-05 11:55:45
     */
    const getServiceHotline = async() => {
        // 如果有值就不请求数据了
        if(state.serviceHotlineList){
            return 
        }
        const _res = await $api.getServiceHotline()
        if(!_res.success) {

            console.warn('getServiceHotline file ==> ',_res.msg)

            return

        }
        state.serviceHotlineList = _res.data
    }

    /**
     * @description : 获取合作伙伴
     * @author : zhangyijie
     * @date : 2023-12-05 11:55:45
     */
    const getPartner = async() => {
        // 如果有值就不请求数据了
        if(state.partnerList){
            return 
        }
        const _res = await $api.getPartner()
        if(!_res.success) {

            console.warn('getPartner file ==> ',_res.msg)

            return

        }
        state.partnerList = _res.data
    }

    /**
     * @description : 获取产品下载列表
     * @author : zhangyijie
     * @date : 2023-12-05 14:43:43
     */    
    const getProductDownloadList = async() => {

         // 如果有值就不请求数据了
         if(state.productDownloadList){
            return 
        }
        const _res = await $api.getProductDownloadList()
        if(!_res.success) {

            console.warn('getProductDownloadList file ==> ',_res.msg)

            return

        }
        state.productDownloadList = _res.data
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
        file_category_id:FileCodeInfo.SUPPORT_CENTER_COMPANY_DOWNLOADS
       })
       if(!_res.success) {

           console.warn('getFileList file ==> ',_res.msg)

           return

       }
       state.fileList = _res.data
   }
    return {
        state,
        getServiceHotline,
        getPartner,
        getProductDownloadList,
        getFileList
    }

})

export type UseSupportStoreReturn = ReturnType<typeof useSupportStore>