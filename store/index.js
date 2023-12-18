import { defineStore } from 'pinia'
export * from './useSupportStore.ts'
export * from './useNewsStore.ts'
export * from './useCapitalStore.ts'
export const useStore = defineStore('default', {
  state: () => {
    return {
      isMobile: false,
      // dark
      mode: '',
    }
  },
  actions: {
    setMode(mode) {
      this.mode = mode
    },
  }
})