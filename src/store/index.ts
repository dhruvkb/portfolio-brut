import type { RootState } from '@/store/state'

import { createStore } from 'vuex'
import { getVuexModule } from 'seeelaye'

import { module as uiModule } from '@/store/ui'
import { module as resumeModule } from '@/store/resume'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    ui: uiModule,
    resume: resumeModule,
    terminal: getVuexModule<RootState>(),
  },
})

export default store
