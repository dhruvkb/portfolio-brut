import { createRouter, createWebHashHistory } from 'vue-router'

import store from '@/store'

import { SliderContent } from '@/models/slider'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '@/components/detail/Home.vue'),
    },
    {
      name: 'hello',
      path: '/hello',
      component: () => import(/* webpackChunkName: "hello" */ '@/components/detail/Hello.vue'),
    },
    {
      name: 'experience',
      path: '/experience/:rolePath(.*)',
      props: true,
      component: () => import(/* webpackChunkName: "experience-item" */ '@/components/detail/ExperienceItem.vue'),
    },
    {
      name: 'work',
      path: '/work/:projectPath(.*)',
      props: true,
      component: () => import(/* webpackChunkName: "work-item" */ '@/components/detail/WorkItem.vue'),
    },
  ],
})

const ensureIsSliderOpen = (isSliderOpen: boolean) => {
  if (
    store.getters['ui/sliderContents'] === SliderContent.DETAIL
    && store.state.ui.isSliderOpen !== isSliderOpen
  ) {
    store.commit('ui/setIsSliderOpen', {
      isSliderOpen,
    })
  }
}

router.afterEach((to) => {
  if (['hello', 'experience', 'work'].includes(to.name?.toString() ?? '')) {
    ensureIsSliderOpen(true)
  } else {
    ensureIsSliderOpen(false)
  }
})

export default router
