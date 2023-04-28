import {createApp} from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from "@/store";
const app = createApp(App)
app.config.globalProperties.axios = axios
import {registerPlugins} from '@/plugins'

registerPlugins(app)
app.use(store)
app.mount('#app')

import { createVuetify } from 'vuetify'


export default createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})
