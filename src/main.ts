import { createApp } from 'vue'

import router from '@/router'
import store from '@/store'
import seeelaye from '@/terminal'

import App from '@/App.vue'

// Globally registered terminal binaries
import Concatenate from '@/terminal/bin/Concatenate.vue'
import Intro from '@/terminal/bin/Intro.vue'
import Tip from '@/terminal/bin/Tip.vue'
import Exit from '@/terminal/bin/Exit.vue'

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(seeelaye)

app.component('Intro', Intro)
app.component('Concatenate', Concatenate)
app.component('Tip', Tip)
app.component('Exit', Exit)

app.mount('div#app__slot')
