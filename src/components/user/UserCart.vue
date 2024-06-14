<template>
  <!-- 清空購物車 -->
  <div class="text-end">
    <button
      class="btn btn-outline-danger"
      type="button"
      @click="delAllCart"
      :disabled="status.delCart === 'delAll'"
    >
      <span
        v-if="status.delCart === 'delAll'"
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      清空購物車
    </button>
  </div>
  <!-- 購物車資訊 -->
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 170px">數量/單位</th>
        <th style="width: 120px"></th>
        <th>單價</th>
        <th>小計</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cartitem in carts.carts" :key="cartitem.id">
        <td>
          <button
            type="button"
            class="btn btn-outline-danger btn-sm"
            @click="delCart(cartitem.id)"
            :disabled="cartitem.id === status.delCart"
          >
            <i v-if="cartitem.id !== status.delCart" class="bi bi-x-lg"></i>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              v-if="cartitem.id === status.delCart"
            ></span>
          </button>
        </td>
        <td>
          {{ cartitem.product.title }}
        </td>
        <td>
          <div class="input-group input-group-sm">
            <div class="input-group mb-3">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                :style="cartitem.qty === 1 ? 'display:none;' : ''"
                :disabled="cartitem.qty === 1 || cartitem.id === status.cartQtyLoading"
                @click="cartitem.qty--, cartChangeQty(cartitem, cartitem.qty)"
              >
                -
              </button>
              <input
                min="1"
                type="number"
                class="form-control"
                style="text-align: center"
                v-model="cartitem.qty"
                :disabled="cartitem.id === status.cartQtyLoading"
                readonly
              />
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="cartitem.qty++, cartChangeQty(cartitem, cartitem.qty)"
                :disabled="cartitem.id === status.cartQtyLoading"
              >
                +
              </button>
              <span class="input-group-text" id="basic-addon2">{{ cartitem.product.unit }}</span>
            </div>
          </div>
        </td>
        <td></td>
        <td class="text-end">
          <div v-if="cartitem.product.price < cartitem.product.origin_price">
            <small class="text-success">折扣價：</small>
            <del>{{ cartitem.product.origin_price  }}</del>
            {{ cartitem.product.price }}
          </div>
          <div v-else>
            {{ cartitem.product.origin_price }}
          </div>
        </td>
        <td class="text-end" v-if="cartitem.product.price < cartitem.product.origin_price">
          {{ cartitem.product.price * cartitem.qty }}
        </td>
        <td class="text-end" v-else>
          {{ cartitem.product.origin_price * cartitem.qty }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="5" class="text-end">總計</td>
        <td class="text-end">{{ carts.total }}</td>
      </tr>
      <tr v-if="carts.final_total < carts.total">
        <td colspan="5" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ carts.final_total }}</td>
      </tr>
    </tfoot>
  </table>
  <!-- 購物車客戶資訊 -->
  <div class="my-5 row justify-content-center">
    <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="sendOrder">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field
          id="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="請輸入 Email"
          :class="{ 'is-invalid': errors['email'] }"
          rules="email|required"
          v-model="form.user.email"
        ></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          placeholder="請輸入姓名"
          :class="{ 'is-invalid': errors['姓名'] }"
          rules="required"
          v-model="form.user.name"
        ></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field
          id="tel"
          name="電話"
          type="text"
          class="form-control"
          placeholder="請輸入電話"
          :class="{ 'is-invalid': errors['電話'] }"
          :rules="isPhone"
          v-model="form.user.tel"
        ></v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          placeholder="請輸入地址"
          :class="{ 'is-invalid': errors['地址'] }"
          rules="required"
          v-model="form.user.address"
        ></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button
          type="submit"
          class="btn btn-danger"
          :disabled="form.user.id === status.cartQtyLoading"
        >
          送出訂單
        </button>
      </div>
    </v-form>
  </div>
</template>
  
<script>

import axios from 'axios'
const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  props: ['carts', 'delAllCart', 'delCart', 'cartChangeQty', 'getCarts'],
  data() {
    return {
      userModal: null,
      editCarts: {},
      status: {
        checkProduct: '',
        addCartLoading: '',
        cartQtyLoading: '',
        delCart: ''
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
  template: ``,
  //inject: ['emitter'],
  methods: {
    // cartChangeQty(item, qty = 1) {
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
    //       this.$refs.uModal.closeModal()

    //       if (res.data.success) {
    //         this.getCarts()
    //         this.emitter.emit('push-message', {
    //           style: 'success',
    //           title: '加入購物車成功',
    //         });
    //       }

    //     })
    //     .catch((err) => {
    //       //alert(err.data.message)
    //       this.emitter.emit('push-message', {
    //           style: 'danger',
    //           title: '加入失敗',
    //           content: err.data.message.join('、'),
    //         });
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
    //         this.emitter.emit('push-message', {
    //           style: 'success',
    //           title: '刪除品項成功',
    //         });
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
    //         this.emitter.emit('push-message', {
    //           style: 'success',
    //           title: '已清空購物車',
    //         });
    //       }
    //     })
    //     // .catch((err) => {
    //     //   alert(err.data.message)
    //     //   this.status.delCart = ''
    //     // })
    // },
    
    sendOrder() {
      this.isLoading = true
      let api = `${VITE_URL}/api/${VITE_PATH}/order`
      const order = this.form
      axios
        .post(api, { data: order })
        .then((res) => {
          
          this.$refs.form.resetForm()
          this.isLoading = false

          if (res.data.success) {
            this.getCarts()
            // this.emitter.emit('push-message', {
            //   style: 'success',
            //   title: '已送出訂單',
            // });
          }
          else {
            // this.emitter.emit('push-message', {
            //   style: 'danger',
            //   title: '送出訂單失敗',
            //   content: res.data.message.join('、'),
            // });
          }
        })
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '電話為必填，須為有效的電話號碼'
    },
  },
  watch: {},
  mounted() {}
}
</script>