import { useGlobalStore } from '~/stores/global'

export default defineNuxtPlugin((nuxtApp) => {
  const store = useGlobalStore()

  // Inject the store into the Vue instance
  nuxtApp.vueApp.config.globalProperties.$store = store

  // Also provide it for Composition API
  return {
    provide: {
      store: store
    }
  }
}) 