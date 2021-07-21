import { createApp } from 'vue'

import router from '@/router'
import store from '@/store'
import seeelaye from '@/terminal'

import App from '@/App.vue'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(seeelaye)

app.mount('div#app__slot')
