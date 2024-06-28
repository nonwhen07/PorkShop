import axios from 'axios'
import { defineStore } from 'pinia'

import statusStore from '@/stores/statusStore.js'

const { VITE_URL, VITE_PATH } = import.meta.env

const status = statusStore()

export default defineStore('cartStore', {
  stste: () => ({
    // isLoading: false, //改使用statusStore()來管理狀態

    carts: [], //購物車菜單
    cartslength: 0 //判定購物車筆數，給外部參考用

    // status: { //改使用statusStore()來管理狀態
    //   checkProduct: '',
    //   addCartLoading: '',
    //   cartQtyLoading: '',
    //   delCart: ''
    // }
  }),
  actions: {
    getCarts() {
      //this.isLoading = true //改使用statusStore()來管理狀態
      status.isLoading = true

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
      // this.addCartLoading = itemId //改使用statusStore()來管理狀態
      status.addCartLoading = itemId

      let api = `${VITE_URL}/api/${VITE_PATH}/cart`
      let httpMethod = 'post'
      let cart = {
        product_id: itemId,
        qty: qty
      }
      axios[httpMethod](api, { data: cart })
        .then((res) => {
          //this.addCartLoading = '' //改使用statusStore()來管理狀態
          status.addCartLoading = ''
          // this.$refs.uModal.closeModal()
          if (res.data.success) {
            this.getCarts()

            // this.emitter.emit('push-message', { //改使用statusStore-pushMessage 來處理Toastmessage
            //   style: 'success',
            //   title: '加入購物車成功',
            // });
            status.pushMessage({ style: 'success', title: '加入購物車成功' })
          }
        })
        .catch(() => {
          //this.addCartLoading = '' //改使用statusStore()來管理狀態
          status.addCartLoading = ''
          status.isLoading = false
        })
    },

    cartChangeQty(orderItem, qty = 1) {
      status.isLoading = true

      //this.cartQtyLoading = orderItem.id //根據訂頒編號來disabled //改使用statusStore()來管理狀態
      status.cartQtyLoading = orderItem.id

      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${orderItem.id}`
      let httpMethod = 'put'
      let order = {
        product_id: orderItem.product.id,
        qty: qty
      }
      axios[httpMethod](api, { data: order })
        .then((res) => {
          //this.cartQtyLoading = '' //改使用statusStore()來管理狀態
          status.cartQtyLoading = ''
          // this.$refs.uModal.closeModal()

          if (res.data.success) {
            this.getCarts()

            // this.emitter.emit('push-message', { //改使用statusStore-pushMessage 來處理Toastmessage
            //   style: 'success',
            //   title: '加入購物車成功',
            // });
            status.pushMessage({ style: 'success', title: '加入購物車成功' })
          }
        })
        .catch((err) => {
          // this.emitter.emit('push-message', { //改使用statusStore-pushMessage 來處理Toastmessage
          //     style: 'danger',
          //     title: '加入失敗',
          //     content: err.data.message.join('、'),
          //   });
          status.pushMessage({
            style: 'danger',
            title: '加入失敗',
            content: err.data.message.join('、')
          })

          //this.cartQtyLoading = '' //改使用statusStore()來管理狀態
          status.cartQtyLoading = ''
          status.isLoading = false
        })
    },

    delCartItem(itemID) {
      status.isLoading = true

      //this.delCart = itemID //改使用statusStore()來管理狀態
      status.delCart = itemID

      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${itemID}` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          // this.delCart = '' //改使用statusStore()來管理狀態
          status.delCart = ''
          if (res.data.success) {
            this.getCarts()

            // this.emitter.emit('push-message', { //改使用statusStore-pushMessage 來處理Toastmessage
            //   style: 'success',
            //   title: '刪除品項成功',
            // });
            status.pushMessage({ style: 'success', title: '刪除品項成功' })
          }
        })
        .catch(() => {
          status.isLoading = false
        })
    },

    delAllCart() {
      status.isLoading = true

      //this.delCart = 'delAll' //改使用statusStore()來管理狀態
      status.delCart = 'delAll'

      let api = `${VITE_URL}/api/${VITE_PATH}/carts` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          //this.delCart = '' //改使用statusStore()來管理狀態
          status.delCart = ''

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
