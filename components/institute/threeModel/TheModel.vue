<!--
 * @description : 
 * @author : zhangyijie
 * @date : 2023-12-18 20:21:04
 * @lastTime : 2023-12-18 20:24:47
 * @LastAuthor : Do not edit
 * @文件路径 : /components/institute/TheModel.vue
-->
<script setup lang="ts">
import { ref } from 'vue'
import { useAnimations, useGLTF } from '@tresjs/cientos'

const { scene: model, animations } = await useGLTF(
    'https://raw.githubusercontent.com/Tresjs/assets/main/models/gltf/ugly-naked-bunny/ugly-naked-bunny-animated.gltf',
)

const { actions } = useAnimations(animations, model)

const currentAction = ref(actions.Greeting)

currentAction.value.play()

</script>

<template>
    <TresGroup>
        <primitive v-if="model" :object="model" />
    </TresGroup>
</template>