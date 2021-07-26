import { createRouter, createWebHashHistory } from 'vue-router'

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

export default router
