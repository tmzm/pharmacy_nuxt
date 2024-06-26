import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
import defaults from './defaults'
import { icons } from './icons'
import { themes } from './theme'

// Styles

import '@/@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    components: {
      VTimePicker
    },
    ssr: true,
    aliases: {
      IconBtn: VBtn
    },
    defaults,
    icons,
    theme: {
      defaultTheme: 'light',
      themes
    }
  })

  nuxtApp.vueApp.use(vuetify)
})
