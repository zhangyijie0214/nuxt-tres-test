/*
 * @description : 对全局mixin添加的类型声明
 * @author : zhangyijie
 * @date : 2023-11-27 14:44:17
 * @lastTime : 2023-11-27 14:45:22
 * @LastAuthor : Do not edit
 * @文件路径 : /types/vue-shims.d.ts
 */
import { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    assetPrefix: string;
  }
}