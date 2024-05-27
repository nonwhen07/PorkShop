<template>
    <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-light py-2">
      <div class="container text-secondary py-1 px-3 d-flex justify-content-end">
        <RouterLink class="router-link-active px-3 px-md-4 py-1" style="text-decoration: none; color: #6c757d;" to="/">這是前台</RouterLink>
        <div class="collapse navbar-collapse" >
          <ul class="navbar-nav category list-unstyled d-flex justify-content-left">
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/">Home</RouterLink>
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/about">關於我們</RouterLink>
            </li>
            
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/products/all"
                >產品列表</RouterLink
              >
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/admin/products"
                >後台 產品列表</RouterLink
              >
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/admin/orders"
                >後台 訂單列表</RouterLink
              >
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/admin/coupon"
                >後台 優惠卷列表</RouterLink
              >
            </li>
            <li class="nav-item btn btn-outline-secondary p-0 ms-1">
              <RouterLink v-if="!isSignIn" class="router-link-active px-3 px-md-4 py-1" to="/login"
                >登入頁面</RouterLink
              >
              <RouterLink v-else class="router-link-active px-3 px-md-4 py-1" to="#" @click="logout"
                >登出</RouterLink
              >
            </li>
          </ul>
        </div>
        
        <div role="button" >
          購物車
          <i class="bi bi-bag">
            <span class="position-absolute top-35 start-55 translate-middle badge rounded-pill bg-danger">
              9
              <span class="visually-hidden">unread messages</span>
            </span>
          </i>
        </div>
        
      </div>
    </nav>
  </template>
    
  <script>
    // import { mapState } from 'pinia';
    // import cartStore from '../stores/cartStore.js';
  
    export default {
      props: ['isSignIn', 'logout'],
      data() {
        return {
          // isSignIn: false
        }
      },
    methods: {
      // check() {
      //   const token = document.cookie.replace(/(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      //   this.isSignIn = token.length ? true : false
      // },
    },
    mounted() {
      // this.check()
    }
  }
  </script>