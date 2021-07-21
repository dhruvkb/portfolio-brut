import { createApp } from 'vue'

import router from '@/router'
import store from '@/store'

import App from '@/App.vue'

const app = createApp(App)

app
  .use(store)
  .use(router)

app.mount('div#app__slot')
