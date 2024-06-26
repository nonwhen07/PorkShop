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

      //分類先別匯入
      // if (this.category !== 'all') {
      //   api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${this.category}`
      // }

      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products
          this.pages = res.data.pagination
          console.log('pages', this.pages)
        })
        .catch((err) => {
          console.log('err', err)
          this.products = []
          this.pages = {}
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
