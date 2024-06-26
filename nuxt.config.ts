import vuetify from 'vite-plugin-vuetify'
import svgLoader from 'vite-svg-loader'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: 'Moafa',
      title: 'Moafa',

      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },

        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com'
        },

        {
          rel: 'stylesheet',
          href: 'https://fonts.gstatic.com'
        },

        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap'
        }
      ]
    }
  },

  i18n: {
    baseUrl: 'http://localhost:3000',
    locales: [
      { code: 'en', file: 'en.json', iso: 'en-US' },
      { code: 'ar', file: 'ar.json', iso: 'ar-SY' }
    ],

    langDir: 'locale',
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieCrossOrigin: true
    }
  },

  css: [
    '@/@core/main.css',
    '@/@core/scss/template/index.scss',
    '@/assets/styles/styles.scss',
    '@/plugins/iconify/icons.css',
    '@/@layouts/styles/index.scss'
  ],

  components: {
    dirs: [
      {
        path: '~/components',
        pathPrefix: false
      }
    ]
  },

  plugins: ['@/plugins/vuetify/index.ts', '@/plugins/iconify/index.ts'],

  // ℹ️ Disable source maps until this is resolved: https://github.com/vuetifyjs/vuetify-loader/issues/290
  sourcemap: {
    server: false,
    client: false
  },

  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag: any) =>
  //       tag === 'swiper-container' || tag === 'swiper-slide'
  //   }
  // },

  vite: {
    define: { 'process.env': {} },

    build: {
      chunkSizeWarningLimit: 5000
    },

    optimizeDeps: {
      exclude: ['vuetify'],
      entries: ['./**/*.vue']
    },

    plugins: [
      svgLoader(),
      vuetify({
        styles: {
          configFile: 'assets/styles/variables/_vuetify.scss'
        }
      }),
      null
    ]
  },

  build: {
    transpile: ['vuetify']
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      baseUrl: process.env.BASE_URL
    }
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/device',
    '@pinia/nuxt',
    '@unocss/nuxt',
    'dayjs-nuxt',
    '@nuxt/image',
    '@ant-design-vue/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts'
  ]
})
