import zh from './locales/zh'
import en from './locales/en'

// You can use `defineI18nConfig` to get type inferences for options to pass to vue-i18n.
export default defineI18nConfig(() => {
  return {
    legacy: false,
    strategy: 'prefix',
    defaultLocale: 'zh',
    locale: 'zh',
    locales: [
      {
        code: 'zh',
        iso: 'zh-CN',
        file: 'zh',
      },
      {
        code: 'en',
        iso: 'en-US',
        file: 'en',
      }
    ],
    messages: {
      en: en,
      zh: zh,
    }
  }
})
