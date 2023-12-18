<template>
  <TresGroup ref="groupRef">
    <Suspense>
      <Plane :width="props.width" :height="props.height" :texture="props.item.image" :active="isActive"
        :index="props.index"></Plane>
    </Suspense>

  </TresGroup>
</template>

<script lang="ts" setup>
import { shallowRef, watch, computed } from "vue"
import Plane from './Plane.vue'
import { Color } from 'three';
import { useTresContext } from '@tresjs/core'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  width: number,
  height: number,
  item: any,
  index: number
  activePlane: number,
  hover: number
}>()
const emit = defineEmits(['update:activePlane'])
const activePlane = useVModel(props, 'activePlane', emit)



const { sizes } = useTresContext()


const colorTeal = new Color('red');
const groupRef: any = shallowRef(null)
// 是否激活
const isActive = shallowRef(false)

let timeoutID: any = null

watch(() => props.hover, () => {
  const hoverScale = props.hover === props.index && !isActive.value ? 1.1 : 1
  gsap.to(groupRef.value.scale, {
    x: hoverScale,
    y: hoverScale,
    duration: 0.5,
    ease: 'power3.out'
  })
})


watch(activePlane, () => {
  if (activePlane.value === props.index) {
    isActive.value = activePlane.value === props.index
  } else {
    isActive.value = false
  }
})

// 层级问题在主控解决了
// watch(isActive, () => {
//   // gsap.killTweensOf(groupRef.value.position)
//   // gsap.to(groupRef.value.position, {
//   //   z: isActive.value ? 0 : -0.01,
//   //   duration: 0.2,
//   //   ease: 'power3.out',
//   //   delay: isActive.value ? 0 : 2
//   // })
// })

const handleClose = (_c: any, e: any) => {
  e.stopPropagation()
  if (!isActive.value) return
  timeoutID && clearTimeout(timeoutID)
  timeoutID = setTimeout(() => {
    activePlane.value = -1

  }, 1500) // The duration of this timer depends on the duration of the plane's closing animation.
}

</script>

<style></style>