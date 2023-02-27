import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
import { options } from './quasar-user-options'

createApp(App).use(Quasar, options).use(store).use(router).mount('#app')
