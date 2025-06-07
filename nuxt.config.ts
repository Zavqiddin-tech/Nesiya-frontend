// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2025-01-15",
  modules: ["@nuxt/ui", "@pinia/nuxt", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folter/stores/**"],
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css",
        },
      ],
    },
  },
});
