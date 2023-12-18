<template>
  <div :class="[{ dark: dark }, mode]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script>
import { useStore } from './store'
export default {
  setup() {
    const store = useStore()
    return {
      store
    }
  },
  data() {
    return {}
  },
  computed: {
    dark() {
      console.log(this.store.mode, this.store.mode == 'dark')
      return this.store.mode == 'dark'
    },
    mode() {
      return this.store.mode
    }
  }
}
</script>
