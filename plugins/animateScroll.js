import VueAnimateOnScroll from 'vue-animate-onscroll'
import VueScrollTo from 'vue-scrollto'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(VueAnimateOnScroll)

  vueApp.use(VueScrollTo,{
    container: 'body',
    duration: 500,
    easing: 'ease',
    offset: -130,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})
})