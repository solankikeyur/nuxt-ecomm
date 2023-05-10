// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-snackbar"
  ],
  app: {
    head: {
      title: "Ecomm",
      script: [
        {src: "https://js.stripe.com/v3/", defer: true}
      ]
    },
  },
  snackbar: {
    top: true,
    right: true,
    duration: 5000,
  },
  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY,
      stripeSk: process.env.STRIPE_SK_KEY
    }
  }
});
