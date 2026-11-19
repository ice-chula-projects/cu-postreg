import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/register',
      children: [
        {
          path: '',
          name: 'Register landing page',
          component: () => import('@/views/RegistrationView.vue'),
        },
        {
          path: 'courses',
          name: 'Register courses',
          component: () => import('@/views/RegisterCoursesView.vue'),
        },
      ],
    },
    {
      path: '/drop',
      name: 'Drop courses',
      component: () => import('@/views/DropView.vue'),
    },
  ],
})

export default router
