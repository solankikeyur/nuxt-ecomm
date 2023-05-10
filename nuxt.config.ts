// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@formkit/nuxt",
    "@nuxtjs/supabase",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-snackbar",
    '@vite-pwa/nuxt'
  ],
  pwa: {
    manifest: {
      name: "Ecomm App",
      short_name: "Ecomm App",
      description: "Ecomm App",
      theme_color: "#32CD32",
      icons: [
        {
          src: "ecomm.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "ecomm.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
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
