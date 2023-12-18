/*
 * @description : 接口处理
 * @author : zhangyijie
 * @date : 2023-12-05 10:26:39
 * @lastTime : 2023-12-06 15:39:19
 * @LastAuthor : Do not edit
 * @文件路径 : /plugins/api.client.ts
 */
import { callEasyItf ,setInterfaceUrl,Request,ERequestEvent,setLogLevel } from 'cgl'
// debug等级
setLogLevel(4)
// 设置路径
setInterfaceUrl('/Cg/Itf/Java/CmnMisItf.jsp')
// 全局拦截器
Request.globalInterceptor.On(ERequestEvent.BEFORE_REQUEST,(res) => {
    // TODO： 先写死获取中文
    res.params.cms_lg_id = 1
})
export default defineNuxtPlugin((nuxtApp) => {

    const _API = {
        // 获取Banner
        getBanner: (data,options) => callEasyItf('getBanner', data,options),
        // 获取栏目列表
        getPartList: (data,options) => callEasyItf('getPartList', data,options),
        // 获取信息列表
        getInfoList: (data,options) => callEasyItf('inf.getInfoList', data,options),
        // 获取信息详情
        getInfoDtl: (data,options) => callEasyItf('getInfoDtl', data,options),
        // 留资
        leaveInfo: (data,options) => callEasyItf('leaveInfo', data,options),
        // 获取科学家列表
        getScientistList: (data,options) => callEasyItf('getScientistList', data,options),
        // 获取文件列表
        getFileList: (data,options) => callEasyItf('getFileList', data,options),
        // 获取产品下载列表
        getProductDownloadList: (data,options) => callEasyItf('getProductDownloadList', data,options),
        // 获取合作伙伴
        getPartner: (data,options) => callEasyItf('getPartner', data,options),
        // 获取服务热线
        getServiceHotline: (data,options) => callEasyItf('getServiceHotline', data,options),
    }
    nuxtApp.provide('api', _API)
})

