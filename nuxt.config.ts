// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-01-15",
  modules: ["@nuxt/ui", "@pinia/nuxt"],
  pinia: {
    storesDirs: ['./stores/**', './custom-folter/stores/**'],
  },
})