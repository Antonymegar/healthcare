// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ['vuetify/styles','@mdi/font/css/materialdesignicons.min.css'],

  // Plugins
  plugins: ['~/plugins/axios.ts'],

  // Transpile Vuetify to avoid build errors
  build: {
    transpile: ['vuetify'],
  },

  runtimeConfig: {
    public: {
      apiBase: 'http://127.0.0.1:8000/api', // Or your live Django API URL
    }
  }
})
