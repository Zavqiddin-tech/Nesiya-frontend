// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: "2025-01-15",
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  css: ['~/assets/css/main.css'],
  pinia: {
    storesDirs: ['./stores/**', './custom-folter/stores/**'],
  },
})