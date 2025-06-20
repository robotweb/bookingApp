import { useGlobalStore } from '~/stores/global'

declare module '#app' {
  interface NuxtApp {
    $store: ReturnType<typeof useGlobalStore>
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: ReturnType<typeof useGlobalStore>
  }
}

export {} 