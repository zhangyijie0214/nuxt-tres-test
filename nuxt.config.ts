
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'test',
      htmlAttrs: {
        lang: 'zh'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: '/plugin/locomotive-scroll.min.css' }
      ],
      script: [
        {
          src: '/plugin/gsap.min.js'
        },
        {
          src: '/plugin/ScrollTrigger.min.js'
        },
        {
          src: '/plugin/lenis.min.js'
        }
      ]
    }
  },

  css: [
    '@/assets/styles/styles.scss',
    '/public/icon/iconfont.css'
  ],

  styleResources: {
  },

  plugins: [
    '@/plugins/utils',
    { src: '@/plugins/animateScroll' },
  ],

  // components: [{ path: '~/components/app', prefix: 'app' }],
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/style-resources',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    '@vueuse/nuxt',
    '@tresjs/nuxt',
    '@pinia/nuxt',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  // build: {
  //   extractCSS: true, // 提取公共css
  //   vendor: ['jquery'],
  //   plugins: [
  //     new webpack.ProvidePlugin({
  //       $: 'jquery',
  //       jQuery: 'jquery',
  //       'window.jQuery': 'jquery'
  //     })
  //   ]
  // },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/styleMixin.scss" as *;',
        }
      }
    }
  },
  nitro: {
    devProxy: {
        '/Cg': {
            target: import.meta.env.VITE_PROJECT_POST_URL, // 这里是接口地址
            changeOrigin: true,
            prependPath: true,
        },
    },
},
})
