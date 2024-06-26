<template>
  <Loading :active="isLoading" />
  <div class="container">
    <div class="mt-4">
      <h2 class="d-flex justify-content-center" style="margin-top: 75px;">商品列表</h2>
      <!-- 產品分類 -->
      <!-- <ProductNavbar :is-active="isActive"></ProductNavbar> -->
      <!-- <ul class="category list-unstyled d-flex justify-content-center mt-4" style="margin-bottom: 50px;">
        <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === 'all' ? 'active' : ''">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/all">全部</RouterLink>
        </li>
        <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === '旅遊' ? 'active' : ''">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/旅遊">旅遊</RouterLink>
        </li>
        <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === '蔬果' ? 'active' : ''">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/蔬果">蔬果</RouterLink>
        </li>
        <li class="btn btn-outline-secondary p-0 ms-1" :class="isActive === '肉品' ? 'active' : ''">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/肉品">肉品</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/吐司">吐司</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/漢堡">漢堡</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/蛋餅">蛋餅</RouterLink>
        </li>
        <li class="list-group-item btn btn-outline-primary p-0">
          <RouterLink class="router-link-active active px-3 px-md-4 py-1" to="/products/飲品">飲品</RouterLink>
        </li>
      </ul> -->
      <!-- 產品列表 -->
      <ul class="row d-flex list-unstyled">
        <li class="col-lg-4 col-md-8" v-for="product in products" :key="product.id">
          <div class="img-fluid hovereffect px-3" style="background-size: cover; background-position: center; width: 100%; height: 250px;">
            <img class="img-responsive" style="width: 100%; height: 100%;" :src="product.imageUrl" :alt="product.title" :title="product.title + ':' + product.description">
              <div class="overlay" style="margin-top: 100px;">
                <h2>{{product.title}}</h2>
                <a href="#" type="button"
                  class="info"
                  :disabled="product.id === status.checkProduct"
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
      <!-- <Pagination :pages="pages" :update-page="getProducts"></Pagination> -->

      <!-- 購物車列表 -->
      <!-- <UserCart v-if="cartslength > 0" :carts="carts" :del-all-cart="delAllCart" :del-cart="delCart"
        :cart-change-qty="cartChangeQty" :get-carts="getCarts"></UserCart> -->
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
// import Pagination from '@/components/PaginationTool.vue'
// import UserModal from '@/components/UserProductModal.vue'

// import ProductNavbar from '@/components/user/ProductNavbar.vue'
import UserCart from '@/components/user/UserCart.vue'



// 引用圖片顯示 <!-- USE_https://miketricking.github.io/bootstrap-image-hover/ HOVER EFFECT 9 -->
import '@/assets/css/_img_hovereffect.css'

// import Navbar from '@/components/FrontNavbar.vue'

import productStore from '@/stores/productStore.js'
import cartStore from '@/stores/cartStore.js'
import { mapActions, mapState } from 'pinia'



// const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  //   props: ['category'],
  data() {
    return {
      //category: {}, //動態路由-category //因改用WebHash的動態路由調整的部分，等pinia完成再開啟處理

      tempProduct: {}, //點選產品
      selectID: '', //點選產品ID


      // products: [], //產品菜單  //改使用productStore stste裡面的 products
      // pages: {}, //產品菜單-頁碼 //改使用productStore stste裡面的 pages

      // carts: [], //購物車菜單 //改使用cartStore stste裡面的 carts
      // cartslength: 0, //購物車總比數-用來坐姿ˋ料比對用 //改使用cartStore stste裡面的 cartslength

      status: {
        checkProduct: '',
        // addCartLoading: '',
        // cartQtyLoading: '',
        // delCart: ''
      },


      isActive: 'all',

      isLoading: false, //loading狀態
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

      this.status.checkProduct = item.id
      this.tempProduct = { ...item }
      setTimeout(() => {
        this.status.checkProduct = ''
      }, 200)
    },


    ...mapActions(productStore, ['getProducts']), //改引用pinia-productStore裡面的action(對應methods)
    // getProducts(page = 1) {
    //   //console.log('now getproducts...   ')

    //   this.isLoading = true

    //   let api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}`;
    //   //商品分類部分先移除
    //   // if(this.category !== undefined) {
    //   //   api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.category}`
    //   // }
    //   // if(this.category !== 'all') {
    //   //   api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.category}`
    //   // }

    //   axios.get(api)
    //   .then((res) => {
    //     this.products = res.data.products
    //     // this.pages = res.data.pagination
    //   })

    //   setTimeout(() => {
    //     this.isLoading = false //狀態驅動'元件'
    //   }, 1000)
    // },




    ...mapActions(cartStore, ['getCarts', 'addToCart', 'cartChangeQty', 'delCartItem', 'delAllCart']), //改引用pinia-cartStore裡面的action(對應methods) 
    // getCarts() {
    //   this.isLoading = true
    //   const api = `${VITE_URL}/api/${VITE_PATH}/cart`
    //   axios.get(api)
    //     .then((res) => {
    //       this.carts = res.data.data
    //       //console.log('carts',  this.carts.carts)
    //       this.cartslength = res.data.data.carts.length
    //     })
    //     .catch(() => {
    //       this.carts = []
    //       this.cartslength = 0
    //     })
    //   setTimeout(() => {
    //     this.isLoading = false //狀態驅動'元件'
    //   }, 1000)
    // },

    // addToCart(itemId, qty = 1) {
    //   this.status.addCartLoading = itemId
    //   let api = `${VITE_URL}/api/${VITE_PATH}/cart`
    //   let httpMethod = 'post'
    //   let cart = {
    //     product_id: itemId,
    //     qty: qty
    //   }
    //   axios[httpMethod](api, { data: cart })
    //     .then((res) => {
    //       //this.getCarts()
    //       this.status.addCartLoading = ''
    //       // this.$refs.uModal.closeModal()
    //       if (res.data.success) {
    //         this.getCarts()
    //         // this.emitter.emit('push-message', {
    //         //   style: 'success',
    //         //   title: '加入購物車成功',
    //         // });
    //       } 
    //     })
    //     .catch(() => {
    //       this.status.addCartLoading = ''
    //     })
    // },
    // cartChangeQty(item, qty = 1) {
    //   console.log('now cartChangeQty')
    //   this.status.cartQtyLoading = item.id

      

    //   let api = `${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`
    //   let httpMethod = 'put'
    //   let order = {
    //     product_id: item.id,
    //     qty: qty
    //   }
    //   axios[httpMethod](api, { data: order })
    //     .then((res) => {
    //       //this.getCarts()
    //       this.status.cartQtyLoading = ''
    //       // this.$refs.uModal.closeModal()

    //       if (res.data.success) {
    //         this.getCarts()
    //         // this.emitter.emit('push-message', {
    //         //   style: 'success',
    //         //   title: '加入購物車成功',
    //         // });
    //       }

    //     })
    //     .catch((err) => {
    //       console.log('now cartChangeQty',err)
    //       //alert(err.data.message)
    //       // this.emitter.emit('push-message', {
    //       //     style: 'danger',
    //       //     title: '加入失敗',
    //       //     content: err.data.message.join('、'),
    //       //   });
    //       this.status.cartQtyLoading = ''
    //     })
    // },



    // delCart(itemID) {
    //   this.status.delCart = itemID
    //   let api = `${VITE_URL}/api/${VITE_PATH}/cart/${itemID}` //預設新增，再來判斷isNew
    //   let httpMethod = 'delete'
    //   axios[httpMethod](api)
    //     .then((res) => {
    //       //this.getCarts()
    //       this.status.delCart = ''
    //       if (res.data.success) {
    //         this.getCarts()
    //         // this.emitter.emit('push-message', {
    //         //   style: 'success',
    //         //   title: '刪除品項成功',
    //         // });
    //       }
    //     })
    // },
    // delAllCart() {
    //   this.status.delCart = 'delAll'
    //   let api = `${VITE_URL}/api/${VITE_PATH}/carts` //預設新增，再來判斷isNew
    //   let httpMethod = 'delete'
    //   axios[httpMethod](api)
    //     .then((res) => {
    //       this.getCarts()
    //       this.status.delCart = ''
    //       if (res.data.success) {
    //         this.getCarts()
    //         // this.emitter.emit('push-message', {
    //         //   style: 'success',
    //         //   title: '已清空購物車',
    //         // });
    //       }
    //     })
    // },
   
    
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
    this.isLoading = true
    //this.getPath() //路由判定使用 //因改用WebHash的動態路由調整的部分，等pinia完成再開啟處理


    this.getProducts() //改引用pinia-productStore裡面的action(對應methods)
    this.getCarts()
    //VueLoading作為'元件'使用方式
    setTimeout(() => {
      this.isLoading = false //狀態驅動'元件'
    }, 1000)
    //VueLoading作為'插件'使用方式
    // const loader = this.$loading.show(); //方法驅動'插件'
    // setTimeout(() => {
    //     loader.hide()
    // }, 1000);
  },
  components: {
    Loading,
    // Pagination,
    // UserModal,
    // ProductNavbar,
    UserCart
    //Navbar
  },
  
  computed:{
    ...mapState(productStore, ['products', 'pages']),
    ...mapState(cartStore, ['carts', 'cartslength', 'addCartLoading', 'cartQtyLoading', 'setIsLoading', 'delCart']),
    
    
  }
}
</script>
