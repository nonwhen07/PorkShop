<template>
  <nav class="navbar fixed-top navbar-expand-sm navbar-dark bg-light py-2">
    <div class="container text-secondary py-1 px-3 d-flex justify-content-end">
      <RouterLink class="router-link-active px-3 px-md-4 py-1" style="text-decoration: none; color: #6c757d;" to="/">{{title}}</RouterLink>
      <div class="collapse navbar-collapse" >
        <ul class="navbar-nav category list-unstyled d-flex justify-content-left">
          <!-- <li class="nav-item btn btn-outline-secondary p-0 ms-1">
            <RouterLink class="router-link-active px-3 px-md-4 py-1" to="/">Home</RouterLink>
          </li> -->
          <li class="nav-item">
            <RouterLink class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" to="/about">關於我們</RouterLink>
          </li>
          
          <li class="nav-item">
            <RouterLink class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" to="/products"
              >商品列表(前)</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" to="/admin/products"
              >商品列表(後-未搬遷)</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" to="/admin/orders"
              >訂單列表(後)</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" to="/admin/coupon"
              >優惠卷(後-未製作)</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink v-if="!isSignIn" class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" to="/login"
              >登入頁面</RouterLink
            >
            <RouterLink v-else class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" to="#" @click="logout"
              >帳號登出</RouterLink
            >
          </li>
        </ul>
      </div>
      
      <!-- <div role="button">
        <i class="bi bi-bag"></i>
        購物車
        <span v-if="cartslength > 0" class="position-absolute top-15 start-75 translate-middle badge rounded-circle bg-danger">
          {{ cartslength }}
          <span class="visually-hidden">unread messages</span>
        </span>
      </div> -->
      
      <button v-if="title == '這是前台' " type="button" class="btn btn-outline-secondary position-relative">
        <i class="bi bi-bag"></i>
        購物車
        <span v-if="cartslength > 0"  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ cartslength }}
          <span class="visually-hidden">unread messages</span>
        </span>
      </button>
      
    </div>
  </nav>
</template>
    
<script>

import axios from 'axios'
  // import { mapActions, mapState } from 'pinia'
import { mapState } from 'pinia'
import cartStore from '@/stores/cartStore.js'

const { VITE_URL } = import.meta.env

export default {
  // props: ['isSignIn', 'logout'],
  props: ['title'],
  data() {
    return {
      isSignIn: false
    }
  },
  methods: {
    check() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)shopToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.isSignIn = token.length ? true : false
    },
    logout() {
      const api = `${VITE_URL}/logout`
      axios.post(api).then(() => {
        // emitter.emit('push-message', {
        //   style: 'success',
        //   title: '登出成功'
        // })
        //alert('登出成功');
        //this.$router.push('/login');

        //document.cookie = `shopToken=; expires=${new Date()}`;
        const emptytoken = '' //清空shopToken內的植
        document.cookie = `shopToken=${emptytoken}; expires=${new Date()}`
      })
      this.isSignIn = false
    }
  },
  mounted() {
    this.check()
  },
  computed:{
    ...mapState(cartStore, ['cartslength']),
  }
}
</script>