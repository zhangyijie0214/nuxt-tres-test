/*
 * @description : 本项目相关常量
 * @author : zhangyijie
 * @date : 2023-12-05 10:48:02
 * @lastTime : 2023-12-07 14:29:06
 * @LastAuthor : Do not edit
 * @文件路径 : /config/index.ts
 */

// 信息列表映射表 为防止以后后端对相关信息更改
export enum ColumnCodeInfo {
    // 投资者新闻
    INVESTOR_NEWS = 8,

    // 公司治理 - 领导团队
    CORPORATE_GOVERNANCE_LEADERSHIP = 9,
    // 投资者工具 前端定义 后端未使用
    INVESTOR_TOOLS= -1,
    // 投资者工具 - 企业信息
    INVESTOR_TOOLS_COMPANY_INFO = 11,

    // 投资者工具 - 业务信息
    INVESTOR_TOOLS_BUSINESS_INFO = 12,

    // 投资者工具 - 投资信息
    INVESTOR_TOOLS_INVESTMENT_INFO = 13,

    // 投资者工具 - 财务报告
    INVESTOR_TOOLS_FINANCIAL_REPORTS = 14,

    // 投资者工具 - 公司治理
    INVESTOR_TOOLS_CORPORATE_GOVERNANCE = 15,

    // 投资者工具 - 联络信息
    INVESTOR_TOOLS_CONTACT_INFO = 16,
    // 联系人
    CONTACT_PERSON = -2,
    // 公司新闻
    COMPANY_NEWS = 17,

    // 重要公告
    IMPORTANT_ANNOUNCEMENTS = 18,

    // 储能科研
    ENERGY_STORAGE_RESEARCH = 19,

    // 行业研究
    INDUSTRY_RESEARCH = 20
}
export enum FileCodeInfo {
    // 资本运营模块 - 公司治理
    CAPITAL_OPERATION_CORPORATE_GOVERNANCE = 1,

    // 支持中心 - 公司下载
    SUPPORT_CENTER_COMPANY_DOWNLOADS = 2
}