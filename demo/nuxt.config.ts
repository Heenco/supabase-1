export default defineNuxtConfig({
  modules: [
    // https://github.com/nuxt-modules/supabase
    '@nuxtjs/supabase',
    // https://github.com/nuxt/ui
    '@nuxt/ui',
  ],

  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },

  compatibilityDate: '2024-09-01',

supabase: {
  redirectOptions: {
    login: '/signin',
    callback: '/confirm',
    exclude: ['/', '/signin', '/confirm'],
  },
},
})
