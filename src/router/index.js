import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/user/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/user/UserView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/user/HomeView.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/user/AboutView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/user/LoginView.vue')
    },
    //admin
    // {},

    //404
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/user/NotFound.vue')
    }
  ]
})

export default router
