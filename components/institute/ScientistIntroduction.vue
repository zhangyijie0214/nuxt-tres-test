<script lang="ts" setup>
import { ref, computed } from 'vue';
import { Color } from 'three';
import { useRenderLoop, useTres } from '@tresjs/core';
import { OrbitControls } from '@tresjs/cientos';
import Carousel from "./threeModel/Carousel.vue"
const { onLoop } = useRenderLoop();

</script>
<template>
  <div class="scientist-introduction">

    <div class="scientist-introduction__three">
      <Suspense>
        <TresCanvas clear-color="#F3F5F7">
          <TresPerspectiveCamera :position="[0, 0, 4]" :fov="45" :aspect="1" :near="0.1" :far="100" />
          <Carousel></Carousel>
        </TresCanvas>
      </Suspense>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.scientist-introduction {
  position: relative;
  height: 10.23rem;

  &__title {
    font-size: 0.4rem;
    position: relative;
    display: inline-block;
    font-family: AlimamaShuHeiTi, Helvetica Neue, sans-serif;
    left: 50%;
    transform: translateX(-50%);

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: #57B898;
      height: 0.06rem;
      width: 0.85rem;
    }
  }

  &__three {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 8.23rem;
  }
}
</style>
