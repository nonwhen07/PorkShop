import axios from 'axios'
import { defineStore } from 'pinia'

import statusStore from '@/stores/statusStore.js'

const { VITE_URL, VITE_PATH } = import.meta.env

const status = statusStore()

export default defineStore('cartStore', {
  //data,  methods, computed  vue    Component上下對應
  //state, actions, getters   pinia  Store上下對應
  state: () => ({
    carts: [], //購物車菜單
    cartslength: 0 //判定購物車筆數，給外部參考用
  }),
  actions: {
    getCarts() {
      status.isLoading = true //改使用statusStore()來管理狀態

      const api = `${VITE_URL}/api/${VITE_PATH}/cart`
      axios
        .get(api)
        .then((res) => {
          this.carts = res.data.data
          //console.log('carts',  this.carts.carts)
          this.cartslength = res.data.data.carts.length
        })
        .catch(() => {
          this.carts = []
          this.cartslength = 0
        })

      status.isLoading = false
    },

    addToCart(itemId, qty = 1) {
      status.isLoading = true
      status.addCartLoading = itemId //改使用statusStore()來管理狀態

      let api = `${VITE_URL}/api/${VITE_PATH}/cart`
      let httpMethod = 'post'
      let cart = {
        product_id: itemId,
        qty: qty
      }
      axios[httpMethod](api, { data: cart })
        .then((res) => {
          status.addCartLoading = '' //改使用statusStore()來管理狀態
          // this.$refs.uModal.closeModal()
          if (res.data.success) {
            this.getCarts()
            status.pushMessage({ style: 'success', title: '已加入購物車' })
          }
        })
        .catch(() => {
          status.addCartLoading = ''
          status.isLoading = false
        })
    },

    cartChangeQty(orderItem, qty = 1, change = '++') {
      status.isLoading = true
      status.cartQtyLoading = orderItem.id //根據訂頒編號來disabled //改使用statusStore()來管理狀態

      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${orderItem.id}`
      let httpMethod = 'put'
      let order = {
        product_id: orderItem.product.id,
        qty: qty
      }
      axios[httpMethod](api, { data: order })
        .then((res) => {
          status.cartQtyLoading = '' //改使用statusStore()來管理狀態
          // this.$refs.uModal.closeModal()

          if (res.data.success) {
            this.getCarts()
            if (change === '++') {
              status.pushMessage({ style: 'success', title: '已增加數量' })
            } else {
              status.pushMessage({ style: 'success', title: '已刪減數量' })
            }
          }
        })
        .catch((err) => {
          status.pushMessage({
            style: 'danger',
            title: '數量調整失敗',
            content: err.data.message.join('、')
          })

          status.cartQtyLoading = '' //改使用statusStore()來管理狀態
          status.isLoading = false
        })
    },

    delCartItem(itemID) {
      status.isLoading = true
      status.delCart = itemID //改使用statusStore()來管理狀態

      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${itemID}` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          status.delCart = '' //改使用statusStore()來管理狀態
          if (res.data.success) {
            this.getCarts()

            // this.emitter.emit('push-message', { //改使用statusStore-pushMessage 來處理Toastmessage
            //   style: 'success',
            //   title: '刪除品項成功',
            // });
            status.pushMessage({ style: 'success', title: '已刪除品項' })
          }
        })
        .catch(() => {
          status.isLoading = false
        })
    },

    delAllCart() {
      status.isLoading = true
      status.delCart = 'delAll' //改使用statusStore()來管理狀態

      let api = `${VITE_URL}/api/${VITE_PATH}/carts` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          status.delCart = '' //改使用statusStore()來管理狀態

          if (res.data.success) {
            this.getCarts()

            // this.emitter.emit('push-message', { //改使用statusStore-pushMessage 來處理Toastmessage
            //   style: 'success',
            //   title: '已清空購物車',
            // });
            status.pushMessage({ style: 'success', title: '已清空購物車' })
          }
        })
        .catch(() => {
          status.isLoading = false
        })
    }
  }
  //,
  // getters: {
  // }
})
