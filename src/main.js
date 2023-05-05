import {createApp} from 'vue'
import { useVuelidate } from '@vuelidate/core'//без этого валидация работать не будет еще и в файле с валидацией нужно будет подключать отдельно

import App from './App.vue'
import axios from 'axios'
import store from "@/store";
const app = createApp(App)
app.config.globalProperties.axios = axios
import {registerPlugins} from '@/plugins'
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

registerPlugins(app)
app.use(store)
app.use(VueSweetalert2)
app.use(useVuelidate)

app.mount('#app')

import { createVuetify } from 'vuetify'


export default createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})
