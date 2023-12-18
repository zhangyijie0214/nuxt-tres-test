<!--
 * @description : 
 * @author : zhangyijie
 * @date : 2023-12-01 18:06:57
 * @lastTime : 2023-12-08 11:11:10
 * @LastAuthor : Do not edit
 * @文件路径 : /components/institute/threeModel/Carousel.vue
 * 手机点击有问题
 * 层级问题
-->
<template>
  <TresGroup ref="groupRef">
    <CarouselItem v-for="(item, index) in images" :key="index" :width="planeSettings.width" :height="planeSettings.height"
      :index="index" :hover="hover" :item="item" v-model:activePlane="activePlane">
    </CarouselItem>

    <!-- 弹窗 -->
    <TresMesh ref="panelRef" v-if="isCloseActive" :position="[0, 0, 0.02]">
      <TresPlaneGeometry :args='[viewport.width, viewport.height]' />
      <TresMeshBasicMaterial :transparent='true' :opacity='0' />
    </TresMesh>
  </TresGroup>
  <TresMesh ref="aRef" :position="[0, 0, 1]">
    <TresPlaneGeometry :args='[viewport.width, viewport.height]'>
    </TresPlaneGeometry>
    <TresMeshTransmissionMaterial ref="testRef" :chromaticAberration="0.03" :anisotropy="0" :ior="0.9" :transmission="1"
      :roughness="0" :thickness="0" :args="[8, false]" :buffer="fboTarget?.texture ?? null" :anisotropicBlur="1"
      :sid="THREE.FrontSide" :_transmission="1">
    </TresMeshTransmissionMaterial>
  </TresMesh>
</template>

<script lang="ts" setup>
import { shallowRef, ref, computed, onUnmounted } from "vue"
import { usePrevious } from '@vueuse/core'
import { Color } from "three"
import images from "./images"
import CarouselItem from "./CarouselItem.vue"
import gsap from 'gsap'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { useFBO, Html } from '@tresjs/cientos'
import { DiscardMaterial } from "./DiscardMaterial"
import './shaders/TresMeshTransmissionMaterial'
import * as THREE from "three"
const { sizes, renderer, camera, scene } = useTresContext()
const { onLoop } = useRenderLoop();
const canvas = computed(() => renderer.value.domElement as HTMLCanvasElement)
const fboTarget = useFBO({})
/*------------------------------
Plane Settings
------------------------------*/
const planeSettings = {
  width: 1,
  height: 2,
  gap: 0.1
}

/*------------------------------
Gsap Defaults
------------------------------*/
gsap.defaults({
  duration: 2.5,
  ease: 'power3.out'
})

onMounted(() => {
  const a = testRef.value
  console.log(a)
})
// 是否按下
let isDown = false;
// 进度
let progress = 0

let startX = 0
// 速度
let speed = 0
// 速度轮
const speedWheel = 0.02
// 速度拖拽
const speedDrag = -0.3
// 旧进度
let oldProgress = 0
// TresGroup 的实例
const groupRef: any = shallowRef(null)
// 蒙层弹窗
const panelRef: any = shallowRef(null)
// 后处理测试
const testRef: any = shallowRef(null)
const aRef = shallowRef(null)
// 选中的弹窗
const activePlane = shallowRef(-1)
const prevActivePlane = usePrevious(activePlane)

// hover的元素
const hover = shallowRef(-1)

// 是否展开弹窗
const isCloseActive = shallowRef(false)

/*--------------------
Diaplay Items
--------------------*/
const displayItems = (item: any, index: number, active: number) => {
  const _items = groupRef.value.children
  const piramidalIndex = getPiramidalIndex(_items, active)[index]
  gsap.to(item.position, {
    x: (index - active) * (planeSettings.width + planeSettings.gap),
    y: _items.length * -0.1 + piramidalIndex * 0.1
  })
}
/*--------------------
RAF
--------------------*/

let oldBg
let oldTone
let parent: any
const discardMaterial = new DiscardMaterial()

onLoop((a) => {
  if (groupRef.value) {
    const _items = groupRef.value.children

    progress = Math.max(0, Math.min(progress, 100))

    const active = Math.floor((progress / 100) * (_items.length - 1))
    _items.forEach((item: any, index: number) => displayItems(item, index, active))
    speed = lerp(
      speed,
      Math.abs(oldProgress - progress),
      0.1
    )

    oldProgress = lerp(oldProgress, progress, 0.1)
  }


  if (testRef.value && fboTarget.value && camera.value) {
    testRef.value.time = a.clock.getElapsedTime()
    // Render only if the buffer matches the built-in and no transmission sampler is set
    if (testRef.value.buffer === fboTarget.value.texture) {
      parent = aRef.value
      if (parent) {
        // Save defaults
        oldTone = renderer.value.toneMapping
        oldBg = scene.value.background

        // Switch off tonemapping lest it double tone maps
        // Save the current background and set the HDR as the new BG
        // Use discardmaterial, the parent will be invisible, but it's shadows will still be cast
        renderer.value.toneMapping = THREE.NoToneMapping
        parent.material = discardMaterial

        renderer.value.setRenderTarget(fboTarget.value)
        renderer.value.render(scene.value, camera.value)

        parent.material = testRef.value
        parent.material.thickness = 0
        parent.material.side = THREE.FrontSide
        parent.material.buffer = fboTarget.value.texture

        // Set old state back
        scene.value.background = oldBg
        renderer.value.setRenderTarget(null)
        renderer.value.toneMapping = oldTone
      }
    }
    testRef.value.thickness = speed
  }
})

const viewport = shallowRef({
  width: 0,
  height: 0

})
watch(sizes.aspectRatio, () => {

  const fovDegrees = 45;
  const aspect = sizes.aspectRatio.value;
  const distance = 4;  // 计算视口尺寸的距离

  // 将 FOV 从度转换为弧度
  const fovRadians = fovDegrees * (Math.PI / 180);

  // 计算视口高度和宽度
  const height = 2 * distance * Math.tan(fovRadians / 2);
  const width = height * aspect;
  viewport.value.width = width;
  viewport.value.height = height;
})


// 射线检测器
const raycaster = new THREE.Raycaster();
// 当前和上一个交互的Mesh
let currentIntersect: any = null;
let previousIntersect = null;
// 当前放大显示的mesh
let showCurrentIntersect: any = null;
// timeout 的id
let timeOutId: any = null

const updateIntersect = (event: any) => {
  if (!camera.value || activePlane.value !== -1 || isCloseActive.value) return
  if (timeOutId) {
    clearTimeout(timeOutId)
    timeOutId = null
  }
  // 获取canvas元素相对于视口的位置
  const rect = canvas.value.getBoundingClientRect();

  // 考虑滚动，计算鼠标在canvas中的位置
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  // 获取鼠标在屏幕上的位置
  const mouse = new THREE.Vector2(
    (mouseX / canvas.value.offsetWidth) * 2 - 1,
    - (mouseY / canvas.value.offsetHeight) * 2 + 1
  );
  // 更新射线检测器的射线
  raycaster.setFromCamera(mouse, camera.value);

  // 计算与meshes的交集
  const intersects = raycaster.intersectObjects(groupRef.value.children);

  // 更新当前交互的mesh
  previousIntersect = currentIntersect;
  currentIntersect = intersects.length > 0 ? intersects[0].object : null;

  // 触发自定义事件
  if (currentIntersect !== previousIntersect) {
    if (previousIntersect) {
      // 触发“鼠标移出”事件
      hover.value = -1
    }
    if (currentIntersect) {
      hover.value = currentIntersect.index ?? -1
      // 触发“鼠标移入”事件
    }
  }

  if (activePlane.value !== -1 || !isDown) return
  console.log("event.touches[0].clientX", event.touches && event.touches[0].clientX)
  const x = event.clientX || (event.touches && event.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
};

watch([activePlane, groupRef], () => {
  if (!groupRef.value) return
  const _items = groupRef.value.children
  if (activePlane.value !== -1 && prevActivePlane.value === -1) {
    console.log(123)
    progress = (activePlane.value / (_items.length - 1)) * 100
    console.log("progress", progress)
    // Calculate the progress.current based on activePlane
  }
})

/*--------------------
Handle Down
--------------------*/
let setTimeoutId: any = null
const handleDown = (e: any) => {
  if (activePlane.value !== -1 || isCloseActive.value) {
    activePlane.value = -1
    console.log("isCloseActive", isCloseActive.value)
    setTimeoutId = setTimeout(() => {
      if (showCurrentIntersect) {
        showCurrentIntersect.position.set(...new THREE.Vector3(0, 0, 0))
      }

      showCurrentIntersect = null
      isCloseActive.value = false
    }, 1500)
    return
  }

  timeOutId = setTimeout(() => {
    if (currentIntersect) {
      showCurrentIntersect = currentIntersect
      activePlane.value = showCurrentIntersect.index
      showCurrentIntersect.position.set(...new THREE.Vector3(0, 0, 0.01))
      isCloseActive.value = true
    }
  }, 200)
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

/*--------------------
Handle Up
--------------------*/
const handleUp = () => {
  isDown = false
}


canvas.value.addEventListener('pointerup', handleUp)
canvas.value.addEventListener('pointerdown', handleDown)
canvas.value.addEventListener('pointermove', updateIntersect)
canvas.value.addEventListener('pointerleave', handleUp)


onUnmounted(() => {
  if (!canvas?.value) return
  canvas.value.removeEventListener('pointerup', handleUp)
  canvas.value.removeEventListener('pointerdown', handleDown)
  canvas.value.removeEventListener('pointermove', updateIntersect)
  canvas.value.removeEventListener('pointerleave', handleUp)

})
/*--------------------
Get Piramidal Index
--------------------*/
// Returns an array of decreasing index values in a pyramid shape, starting from the specified index with the highest value. These indices are often used to create overlapping effects among elements.
const getPiramidalIndex = (array: any, index: number) =>
  array.map((_: any, i: number) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  )


const lerp = (v0: number, v1: number, t: number) => v0 * (1 - t) + v1 * t
</script>

<style></style>