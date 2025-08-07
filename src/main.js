
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
	components,
	directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#142445', // rgb(20, 36, 69)
          surface: '#FFFFFF',
        }
      },
    },
  },
})

createApp(App)
	.use(router)
	.use(vuetify)
	.mount('#app')
