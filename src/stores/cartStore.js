import axios from 'axios'
import { defineStore } from 'pinia'

import statusStore from '@/stores/statusStore.js'

const { VITE_URL, VITE_PATH } = import.meta.env

const status = statusStore()

export default defineStore('cartStore', {
  stste: () => ({
    // isLoading: false, //改使用statusStore()來管理狀態

    carts: [], //購物車菜單
    cartslength: 0, //判定購物車筆數，給外部參考用
    // checkProduct: '',
    addCartLoadingItem: '',
    cartQtyLoading: '', //訂單異動或送出時轉圈圈Loading,
    delCart: ''
    // status: {
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

      //this.status.addCartLoading = itemId
      this.addCartLoading = itemId

      let api = `${VITE_URL}/api/${VITE_PATH}/cart`
      let httpMethod = 'post'
      let cart = {
        product_id: itemId,
        qty: qty
      }
      axios[httpMethod](api, { data: cart })
        .then((res) => {
          //this.status.addCartLoading = ''
          this.addCartLoading = ''
          // this.$refs.uModal.closeModal()
          if (res.data.success) {
            this.getCarts()
            // this.emitter.emit('push-message', {
            //   style: 'success',
            //   title: '加入購物車成功',
            // });
          }
        })
        .catch(() => {
          //this.status.addCartLoading = ''
          this.addCartLoading = ''
          status.isLoading = false
        })
    },

    cartChangeQty(orderItem, qty = 1) {
      status.isLoading = true

      //this.status.cartQtyLoading = item.id
      this.cartQtyLoading = orderItem.id //根據訂頒編號來disabled

      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${orderItem.id}`
      let httpMethod = 'put'
      let order = {
        product_id: orderItem.product.id,
        qty: qty
      }
      axios[httpMethod](api, { data: order })
        .then((res) => {
          //this.status.cartQtyLoading = ''
          this.cartQtyLoading = ''
          // this.$refs.uModal.closeModal()

          if (res.data.success) {
            this.getCarts()
            // this.emitter.emit('push-message', {
            //   style: 'success',
            //   title: '加入購物車成功',
            // });
          }
        })
        .catch(() => {
          // this.emitter.emit('push-message', {
          //     style: 'danger',
          //     title: '加入失敗',
          //     content: err.data.message.join('、'),
          //   });
          //this.status.cartQtyLoading = ''
          this.cartQtyLoading = ''
          status.isLoading = false
        })
    },

    delCartItem(itemID) {
      status.isLoading = true

      // this.status.delCart = itemID
      this.delCart = itemID
      let api = `${VITE_URL}/api/${VITE_PATH}/cart/${itemID}` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          // this.status.delCart = ''
          this.delCart = ''
          if (res.data.success) {
            this.getCarts()
            // this.emitter.emit('push-message', {
            //   style: 'success',
            //   title: '刪除品項成功',
            // });
          }
        })
        .catch(() => {
          status.isLoading = false
        })
    },

    delAllCart() {
      status.isLoading = true

      // this.status.delCart = 'delAll'
      this.delCart = 'delAll'
      let api = `${VITE_URL}/api/${VITE_PATH}/carts` //預設新增，再來判斷isNew
      let httpMethod = 'delete'
      axios[httpMethod](api)
        .then((res) => {
          // this.status.delCart = ''
          this.delCart = ''
          if (res.data.success) {
            this.getCarts()
            // this.emitter.emit('push-message', {
            //   style: 'success',
            //   title: '已清空購物車',
            // });
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
