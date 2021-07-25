import { createStore } from 'vuex'

import { module as resumeModule } from '@/store/resume'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    resume: resumeModule,
  },
})

export default store
