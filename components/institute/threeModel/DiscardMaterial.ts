/*
 * @description : 
 * @author : zhangyijie
 * @date : 2023-12-01 15:58:38
 * @lastTime : 2023-12-01 16:01:31
 * @LastAuthor : Do not edit
 * @文件路径 : /components/institute/threeModel/discardMaterial.ts
 */
import { shaderMaterial } from './core/shaderMaterial'

export const DiscardMaterial = /* @__PURE__ */ shaderMaterial(
  {},
  'void main() { }',
  'void main() { gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0); discard;  }'
)
