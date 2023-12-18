
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    data() {
      return {
        assetPrefix: '/',
      }
    }
  })
})
