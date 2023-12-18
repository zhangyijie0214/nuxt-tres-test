<!--
 * @description : 
 * @author : zhangyijie
 * @date : 2023-12-18 20:19:42
 * @lastTime : 2023-12-18 20:32:57
 * @LastAuthor : Do not edit
 * @文件路径 : /components/institute/Test.vue
-->
<template>
    <div style="width: 1000px;height: 1000px">
        <Suspense>
            <TresCanvas ref="canvasRef" clear-color="#FFFFFF" shadows power-preference="high-performance">
                <TresPerspectiveCamera />
                <Suspense>
                    <TheModel ref="modelRef"></TheModel>
                </Suspense>
                <TresDirectionalLight name="directionalLight" :position="[7.974, 6.250, -3.938]" :intensity="1"
                    cast-shadow />
            </TresCanvas>
        </Suspense>
    </div>
</template>
<script setup>
import TheModel from "./threeModel/TheModel.vue"
import { TresCanvas } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'

const gl = {
    clearColor: '#F78B3D',
    shadows: true,
    alpha: false,
    shadowMapType: BasicShadowMap,
    outputColorSpace: SRGBColorSpace,
    toneMapping: NoToneMapping,
    windowSize: true,
}
</script>