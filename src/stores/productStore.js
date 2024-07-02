import axios from 'axios'
import { defineStore } from 'pinia'

import statusStore from '@/stores/statusStore.js'

const { VITE_URL, VITE_PATH } = import.meta.env

const status = statusStore()

export default defineStore('productStore', {
  //data,  methods, computed  vue    Component上下對應
  //state, actions, getters   pinia  Store上下對應
  state: () => ({
    products: [], //對應ProductsView-產品菜單
    pages: {}, //產品菜單-頁碼
    category: [] // 讀取產品的分類
  }),
  actions: {
    getProducts(page = 1) {
      // this.isLoading = true //改使用statusStore()來管理狀態
      status.isLoading = true

      let api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}`

      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products
          this.pages = res.data.pagination

          const arry = this.products.map((item) => item.category)
          //console.log('arrye', arry)
          const newSet = new Set(arry)
          //console.log('newSet', newSet)
          this.category = [...newSet]
        })
        .catch(() => {
          this.products = []
          this.pages = {}
          this.category = []
        })

      setTimeout(() => {
        status.isLoading = false
      }, 1000)
    },

    filterProducts(page = 1, selected = 'all') {
      //分類查詢
      status.isLoading = true

      let api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}`

      //分類先別匯入
      if (selected !== 'all') {
        api = `${VITE_URL}/api/${VITE_PATH}/products?page=${page}&category=${selected}`
      }

      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products
          this.pages = res.data.pagination
        })
        .catch(() => {
          this.products = []
          this.pages = {}
        })

      status.isLoading = false
    }
  }
  //,
  // getters: {
  //   sortProducts: ({ products }) => {
  //     return products
  //   }
  // }
})
