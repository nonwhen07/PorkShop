<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="mt-4">
      <h2 class="d-flex justify-content-center" style="margin-top: 75px;">商品列表</h2>
      <!-- 產品分類 -->
      <ul class="category list-unstyled d-flex justify-content-center mt-4" style="margin-bottom: 50px;">
        <li class="p-0 ms-1"  @click="filterProducts(1, 'all'), (isActive = 'all')">
          <RouterLink class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" 
            :class="isActive === 'all' ? 'active' : ''" :to="{ query: { category: 'all', page: 1 } }">全部</RouterLink>
        </li>
        <li v-for="(item, i) in category" :key="i" class="p-0 ms-1"  @click="filterProducts(1, item), (isActive = item)">
          <RouterLink class="btn btn-outline-secondary router-link-active px-3 px-md-4 py-1" 
            :class="isActive === item ? 'active' : ''" :to="{ query: { category: item, page: 1 } }">{{item}}</RouterLink>
        </li>
      </ul>
      <!-- 產品列表 -->
      <ul class="row d-flex list-unstyled">
        <li class="col-lg-4 col-md-8" v-for="product in products" :key="product.id">
          <div class="img-fluid hovereffect px-3" style="background-size: cover; background-position: center; width: 100%; height: 250px;">
            <img class="img-responsive" style="width: 100%; height: 100%;" :src="product.imageUrl" :alt="product.title" :title="product.title + ':' + product.description">
              <div class="overlay" style="margin-top: 100px;">
                <h2>{{product.title}}</h2>
                <a href="#" type="button"
                  class="info"
                  :disabled="product.id === checkProduct"
                  @click="openModal(product)">
                  查看更多
                </a>
              </div>
          </div>
          <div class="py-1" style="text-align: center;">
            <p class="products-title m-0" role="button">{{product.title}}</p>
            <p v-if="product.price < product.origin_price" class="products-title mt-1" role="button">
              <del class="small">$ {{ product.origin_price }} </del>&nbsp;現在只要&nbsp;
              <span class="small" style="color:red;">$ {{ product.price }} </span>
            </p>
            <p v-else class="products-title mt-1" role="button">
              <span class="small">$ {{ product.origin_price }} </span>
            </p>
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm mx-auto fs-6"
              :disabled="product.id === addCartLoading"
              @click="addToCart(product.id, 1)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              <span
                v-if="product.id === addCartLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              加入購物車
            </button>
          </div>
        </li>
      </ul>

      <!-- 分頁工具 pagination -->
      <Pagination :pages="pages" :update-page="filterProducts"></Pagination>

      <!-- 購物車列表 -->
      <UserCart v-if="cartslength > 0"></UserCart>

    </div>
  </div>
  <!-- 產品Modal -->
  <!-- <User-Modal :temp-product="tempProduct" :add-to-cart="addToCart" ref="uModal"></User-Modal> -->
</template>
  
<script>
// import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import Pagination from '@/components/PaginationTool.vue'
// import UserModal from '@/components/UserProductModal.vue'

import UserCart from '@/components/user/UserCart.vue'

// 引用圖片顯示 <!-- USE_https://miketricking.github.io/bootstrap-image-hover/ HOVER EFFECT 9 -->
import '@/assets/css/_img_hovereffect.css'

import { mapActions, mapState } from 'pinia'

import productStore from '@/stores/productStore.js'
import cartStore from '@/stores/cartStore.js'
import statusStore from '@/stores/statusStore.js'


// const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  //   props: ['category'],
  data() {
    return {
      tempProduct: {}, //點選產品
      selectID: '', //點選產品ID
      checkProduct:'',
      // status: {
      //   // checkProduct: '',
      //   // addCartLoading: '',
      //   // cartQtyLoading: '',
      //   // delCart: ''
      // },

      tempArry: [], // filter 產品項目的品項

      isActive: 'all',
      path: {
        category: 'all',
        page: 1
      },


      form: {
        //購物車user
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: '' //購物車user-message
      }

    }
  },
  // inject: ['emitter'],
  methods: {
    openModal(item) {
      this.$refs.uModal.openModal()
      // this.status.checkProduct = item.id
      this.checkProduct = item.id
      this.tempProduct = { ...item }
      setTimeout(() => {
        //this.status.checkProduct = ''
        this.checkProduct = ''
      }, 200)
    },

    ...mapActions(productStore, ['getProducts','filterProducts']), //改引用pinia-productStore裡面的action(對應methods)
    ...mapActions(cartStore, ['getCarts', 'addToCart', 'cartChangeQty', 'delCartItem', 'delAllCart']), //改引用pinia-cartStore裡面的action(對應methods) 
    

    getPath() {
      this.path.category = this.$route.query.category || 'all';
      this.path.page = this.$route.query.page || 1;
      this.isActive = this.path.category;
      this.$router.push(
        `./products?category=${this.path.category}&page=${this.path.page}`,
      );
    },

    

    // getPath() { //路由判定使用
    //   this.isActive = this.category;
    // },

  },
  created() {
  },
  // watch: { //因改用WebHash的動態路由調整的部分，等pinia完成再開啟處理
  //   category() {// watch 動態路由 props
  //     this.getProducts();
  //     //console.log(this.$route.params.category); //測試動態路由匯入

  //     this.getPath()
  //   }
  // },
  
  
  mounted() { 
    //VueLoading作為'元件'使用方式
    // this.isLoading = true
    //this.getPath() //路由判定使用 //因改用WebHash的動態路由調整的部分，等pinia完成再開啟處理

    this.getProducts() //改引用pinia-productStore裡面的action(對應methods)
    this.getPath()
    this.getCarts()
  },
  components: {
    Loading,
    Pagination,
    // UserModal,
    UserCart
  },
  
  computed:{
    ...mapState(productStore, ['products', 'pages', 'category']),
    ...mapState(cartStore, ['carts', 'cartslength']),
    ...mapState(statusStore, ['isLoading', 'addCartLoading', 'cartQtyLoading', 'setIsLoading', 'delCart']),
  }
}
</script>
