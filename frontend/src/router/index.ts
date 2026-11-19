import { state } from '@/ts/GlobalState'
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
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register for courses',
      component: () => import('@/views/RegistrationView.vue'),
    },
    {
      path: '/drop',
      name: 'Drop courses',
      component: () => import('@/views/DropView.vue'),
    }
  ],
})

router.beforeEach((to, from) => {
  if(!state.value.loggedIn && to.path != "/login") {
    return { path: "/login" };
  }

  if(state.value.loggedIn && to.path == "/login") {
    return { path: "/" };
  }
})

export default router
