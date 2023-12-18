<template>
  <TresMesh ref="meshRef">
    <TresPlaneGeometry :args='[props.width, props.height, 30, 30]' />
    <TresShaderMaterial v-if="shaderArgs" :vertex-shader="shaderArgs.vertexShader"
      :fragment-shader="shaderArgs.fragmentShader" :uniforms="shaderArgs.uniforms" />
  </TresMesh>
</template>

<script lang="ts" setup>
import { shallowRef, watch, computed } from 'vue'
import { useTexture, useTresContext } from '@tresjs/core'
import gsap from 'gsap'
import { Html } from '@tresjs/cientos'
const props = defineProps<{
  width: number,
  height: number,
  texture: any,
  active?: boolean,
  index: number,
}>()
const { sizes } = useTresContext()
const meshRef = shallowRef()
const shaderArgs: any = shallowRef(null);
watch([sizes.width, shaderArgs, meshRef, () => props.active], () => {
  if (meshRef.value && meshRef.value.material) {
    meshRef.value.index = props.index
    const fovDegrees = 45;
    const aspect = sizes.aspectRatio.value;
    const distance = 4;  // 计算视口尺寸的距离

    // 将 FOV 从度转换为弧度
    const fovRadians = fovDegrees * (Math.PI / 180);

    // 计算视口高度和宽度
    const height = 2 * distance * Math.tan(fovRadians / 2);
    const width = height * aspect;
    const viewport = {
      width,
      height
    }

    //  Setting the 'uZoomScale' uniform in the 'Plane' component to resize the texture proportionally to the dimensions of the viewport.
    meshRef.value.material.uniforms.uZoomScale.value.x =
      viewport.width / props.width
    meshRef.value.material.uniforms.uZoomScale.value.y =
      viewport.height / props.height

    gsap.to(meshRef.value.material.uniforms.uProgress, {
      value: props.active ? 1 : 0
    })
    gsap.to(meshRef.value.material.uniforms.uRes.value, {
      x: props.active ? viewport.width : props.width,
      y: props.active ? viewport.height : props.height
    })
  }
})



const res: any = await useTexture([props.texture])
shaderArgs.value = {
  uniforms: {
    uProgress: { value: 0 },
    uZoomScale: { value: { x: 1, y: 1 } },
    uTex: { value: res },
    uRes: { value: { x: 1, y: 1 } },
    uImageRes: {
      value: { x: res.source.data.width, y: res.source.data.height }
    },
    uBlurAmount: { value: 0.5 }
  },
  vertexShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec2 uZoomScale;
        vec4 blur(sampler2D image, vec2 uv, vec2 resolution, float radius) {
        vec4 color = vec4(0.0);
        float total = 0.0;
        for (float dx = -radius; dx <= radius; dx++) {
          for (float dy = -radius; dy <= radius; dy++) {
            vec2 uvOffset = uv + vec2(dx, dy) / resolution;
            color += texture2D(image, uvOffset);
            total += 1.0;
          }
        }
        return color / total;
      }
        void main() {
          vUv = uv;
          vec3 pos = position;
          float angle = uProgress * 3.14159265 / 2.;
          float wave = cos(angle);
          float c = sin(length(uv - .5) * 15. + uProgress * 12.) * .5 + .5;
          pos.x *= mix(1., uZoomScale.x + wave * c, uProgress);
          pos.y *= mix(1., uZoomScale.y + wave * c, uProgress);

          gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
          
        }
      `,
  fragmentShader: /* glsl */ `
      uniform sampler2D uTex;
      uniform vec2 uRes;
      uniform vec2 uZoomScale;
      uniform vec2 uImageRes;

      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screensize
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect screen size
        float ri = i.x / i.y; // Aspect image size
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }

      varying vec2 vUv;
        void main() {
          vec2 uv = CoverUV(vUv, uRes, uImageRes);
          vec3 tex = texture2D(uTex, uv).rgb;
          gl_FragColor = vec4( tex, 1.0 );
        }
      `
}

</script>

<style></style>