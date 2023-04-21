// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", '@formkit/nuxt', '@nuxtjs/supabase', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  app: {
    head: {
      title: "Ecomm"
    }
  }
});
