import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'


export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-02",
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxt/test-utils/module',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  css: ['~/assets/css/main.css'],
   postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})