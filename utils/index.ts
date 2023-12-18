
import { getDefaultServerUrl } from "cgl"
/**
 * 将相对路径转换为绝对路径
 *  - 如果是绝对路径则直接返回
 *  - 如果是相对路径则拼接成绝对路径
 *
 * @author Evil
 * @date 17/04/2023/  10:05:37
 * @export
 * @param {string} relativeUrl 相对路径
 * @param {{pathname:string,baseUrl:string}} [options] 配置项
 * @param {string} [options.pathname='Cg'] 相对路径的前缀, 默认值: 如果 `relativeUrl` 中包含 `/Cg/` 则为空字符串, 否则为 `Cg`
 * @param {string} [options.baseUrl=getDefaultServerUrl()] 基础路径, 默认值: `main.ts` 中设置的服务器路径
 * @returns {string}
 */
export function toAbsoluteUrl(relativeUrl: string, options?: { pathname?: string, baseUrl?: string }): string {
    if (!relativeUrl || isAbsoluteUrl(relativeUrl)) {

        return relativeUrl

    }


    let _baseUrl = ''
    _baseUrl = import.meta.env.MODE === 'development' ? import.meta.env.VITE_PROJECT_POST_URL : window.location.origin

    const _defaultPathName = '/'
    const _pathname = options?.pathname ?? relativeUrl.includes(_defaultPathName) ? '' : _defaultPathName.replace(/\/$/, '')

    const { pathname = _pathname, baseUrl = _baseUrl } = options || {}

    // baseUrl 是否以 / 结尾, 如果是则移除
    const sanitizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
    // pathname 是否以 / 开头, 如果是则移除
    const sanitizedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname
    // relativeUrl 是否以 / 开头, 如果是则移除
    const sanitizedRelativeUrl = relativeUrl.startsWith('/') ? relativeUrl.slice(1) : relativeUrl

    const _tempList = []
    sanitizedBaseUrl && _tempList.push(sanitizedBaseUrl)
    sanitizedPathname && _tempList.push(sanitizedPathname)
    sanitizedRelativeUrl && _tempList.push(sanitizedRelativeUrl)

    const _tempUlr = _tempList.join('/')

    return _tempUlr

}

/**
 * 判断是否是绝对路径
 *
 * @author Evil
 * @date 17/04/2023/  09:55:55
 * @param {string} str 需要判断的字符串
 * @returns {boolean}
 */
export function isAbsoluteUrl(str: string): boolean {

    // 定义正则表达式
    const pattern = /(?:(([\w-]+:)\/\/))[^\\/]+/
    // 使用test方法进行匹配，返回匹配结果
    return pattern.test(str)

}