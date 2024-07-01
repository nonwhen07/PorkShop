


<template>
  <Loading :active="isLoading" />
  <div class="Products">
    <h2 class="d-flex justify-content-center" style="margin-top: 75px">商品列表</h2>
  </div>
</template>



<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
// const{VITE_URL, VITE_PATH} = import.meta.env;

import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { mapState } from 'pinia'


import statusStore from '@/stores/statusStore.js'

export default {
  data() {
    return {}
  },
  mounted() {},
  components: {
    Loading,
    
  },
  computed:{
    ...mapState(statusStore, ['isLoading']),
  }
}
</script>