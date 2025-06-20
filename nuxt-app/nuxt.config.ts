// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon', 
    'shadcn-nuxt',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'storeToRefs']
    }]
  ],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
    define: {
      API_URL: JSON.stringify(process.env.API_URL || 'https://example.com'),
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'https://example.com',
    }
  }
})
