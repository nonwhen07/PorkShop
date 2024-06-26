<template>

  <header>
    <!-- <FrontNavbar is-sign-in="isSignIn" logout="logout"></FrontNavbar> -->
    <FrontNavbar :title="title"></FrontNavbar>
  </header>
  
  
  <main class="container-fluid mt-3 position-relative">
    <RouterView></RouterView>
  </main>

  <footer class="footer py-2 bg-light">
    <div class="container text-center">
      <small class="text-black-50 fw-light mb-0">本網站僅供個人作品使用，不提供商業用途</small>
    </div>
  </footer>
</template>

<script>
import axios from 'axios'
// import emitter from '@/methods/emitter.js'

// import ToastMessages from '@/components/ToastMessages.vue'
import FrontNavbar from '@/components/FrontNavbar.vue'

//import productsStore from '@/stores/productsStore.js'

// import '@/assets/_img_hovereffect.css'
// import '@/assets/css/userview.scss'

const { VITE_URL } = import.meta.env

export default {
  data() {
    return {
      title: '這是前台',
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
  // provide() {
  //   return {
  //     emitter
  //   }
  // },
  components: {
    // ToastMessages,
    FrontNavbar
  },
  created() {
    //this.check();
  },
  mounted() {
    this.check()
  }
}
</script>

