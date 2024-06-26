import { createRouter, createWebHashHistory } from 'vue-router'
//import HomeView from '../views/user/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // linkActiveClass: 'active',
  routes: [
    {
      // user
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
        },
        {
          path: 'products',
          name: 'products',
          component: () => import('../views/user/ProductsView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/user/LoginView.vue')
    },
    {
      // admin
      path: '/admin',
      component: () => import('../views/admin/AdminView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/admin/ProductsView.vue')
        },
        // {
        //   path: 'products/:category',
        //   component: () => import('../views/admin/ProductsView.vue'),
        //   props: (route) => {
        //     return {
        //       category: route.params.category
        //     }
        //   }
        // },
        {
          path: 'orders',
          component: () => import('../views/admin/OrdersView.vue')
        },
        {
          path: 'coupon',
          component: () => import('../views/admin/CouponView.vue')
        }
      ]
    },

    //404
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/user/NotFound.vue')
    }
  ]
})

export default router
