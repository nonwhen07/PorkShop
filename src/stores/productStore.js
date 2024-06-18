import axios from 'axios'
import { defineStore } from 'pinia'

const { VITE_URL, VITE_PATH } = import.meta.env

export default defineStore('productStore', {
  //data, methods, computed  vue    Component上下對應
  //stste, actions, getters  pinia  Store上下對應
  stste: () => ({
    products: [], //對應ProductsView-產品菜單
    pages: {} //產品菜單-頁碼
    // category: 'all'
  }),
  actions: {
    getProducts(page = 1) {
      let api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}`

      //分類+分頁先別匯入
      // if (this.category !== 'all') {
      //   api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.category}`
      // }

      //console.log('productStore-getProducts')

      axios.get(api).then((res) => {
        this.products = res.data.products
        this.pages = res.data.pagination // 分頁暫時用不到
      })
    }
  }
  //,
  // getters: {
  //   sortProducts: ({ products }) => {
  //     return products
  //   }
  // }
})
