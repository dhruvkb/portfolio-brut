import { createStore } from 'vuex'

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
})

export default store
