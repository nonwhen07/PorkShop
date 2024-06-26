<template>
  <Loading :active="isLoading"></Loading>
  
  <div class="container">
    <div class="mt-4">
      <h2 class="d-flex justify-content-center" style="margin-top: 75px;">訂單列表</h2>
      <table class="table">
        <thead>
          <tr>
            <th width="120">下單時間</th>
            <th width="120">Email</th>
            <th>訂單品項</th>
            <th>應付金額</th>
            <th width="100">付款狀態</th>
            <th width="220">編輯</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="order in orders" :key="order.id">
            <tr v-if="orders.length">
              <td>{{ new Date(order.create_at * 1000).toLocaleDateString() }}</td>
              <td>
                <span v-text="order.user.email" v-if="order.user"></span>
              </td>
              <td class="text-start">
                <ul>
                  <li v-for="(product, i) in order.products" :key="i">
                    品項 : {{ product.product.title }} / {{ product.qty }}{{ product.product.unit }}
                  </li>
                </ul>
              </td>
              <td class="text-right">{{ order.total }}</td>
              <td>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="`paidSwitch${order.id}`"
                    v-model="order.is_paid"
                    @change="updatePaid(order)"
                  />
                  <label class="form-check-label" :for="`paidSwitch${order.id}`">
                    <span v-if="order.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal('check', order)"
                  >
                    查看細節
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openModal('dele', order)"
                  >
                    刪除訂單
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <!-- pagination -->
  <!-- <Pagination :pages="pages" :update-page="getOrders"></Pagination> -->
  <!-- Modal -->
  <!-- <Ord-Modal :temp-order="tempOrder" :update-paid="updatePaid" ref="oModal"></Ord-Modal>
  <Del-Modal :temp-order="tempOrder" :del-order="delOrder" ref="dModal"></Del-Modal> -->
</template>


<script>
import axios from 'axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

//import OrderPagination from '@/components/OrderPagination.vue'

// import Pagination from '@/components/PaginationTool.vue'
// import OrdModal from '@/components/OrderModal.vue'
// import DelModal from '@/components/DeleteOrderModal.vue'

const { VITE_URL, VITE_PATH } = import.meta.env

export default {
  data() {
    return {
      isLoading: false,
      tempOrder: {}, //點選訂單
      selectID: '', //點選訂單ID
      orders: [], //訂單菜單
      pages: {} //訂單列表-頁碼
    }
  },
  // inject: ['emitter'],
  methods: {
    //取得頁面Orders
    getOrders(page = 1) {
      this.isLoading = true
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`
      axios.get(api).then((res) => {
        this.orders = res.data.orders
        this.pages = res.data.pagination
      })
      .catch((err)=>{
        console.log('err', err)
      })

      setTimeout(() => {
        this.isLoading = false //狀態驅動'元件'
      }, 1000)
    },
    //開啟Modal判斷
    openModal(action = 'check', item) {
      if (action == 'dele') {
        this.$refs.dModal.openModal()
      } else {
        this.$refs.oModal.openModal()
      }
      this.tempOrder = { ...item }
    },
    //更新訂單的"付款"資訊
    updatePaid(item) {
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/order/${item.id}`
      const httpMethod = 'put'
      const paid = {
        is_paid: item.is_paid
      }
      axios[httpMethod](api, { data: paid }).then(() => {
        //this.$refs.oModal.closeModal()
        //alert(res.data.message)
        //this.getOrders()
        // if (res.data.success) {
        //   this.getOrders()
        //   this.emitter.emit('push-message', {
        //     style: 'success',
        //     title: '更新已付款'
        //   })
        // } else {
        //   this.emitter.emit('push-message', {
        //     style: 'danger',
        //     title: '更新失敗',
        //     content: res.data.message.join('、')
        //   })
        // }
      })
      // .catch(() => {
      //   this.isLoading = false
      //   this.$refs.oModal.closeModal()
      //   //alert(err.data.message)
      // })
    },
    //刪除訂單(itemID)
    delOrder(itemID) {
      // 刪除訂單(all)
      //const api2 = `${VITE_URL}/api/${VITE_PATH}/admin/orders/all`;
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/order/${itemID}`
      const httpMethod = 'delete'
      axios[httpMethod](api).then(() => {
        //this.$refs.dModal.closeModal()
        // this.getOrders()
        // alert(res.data.message)
        // if (res.data.success) {
        //   this.getOrders()
        //   this.emitter.emit('push-message', {
        //     style: 'success',
        //     title: '已刪除訂單'
        //   })
        // } else {
        //   this.emitter.emit('push-message', {
        //     style: 'danger',
        //     title: '刪除失敗',
        //     content: res.data.message.join('、')
        //   })
        // }
      })
      // .catch((err) => {
      //   alert(err.data.message)
      // })
    }
  },
  created() {
    this.getOrders()
  },
  mounted() {},
  components: {
    //OrderPagination,

    // Pagination,
    // OrdModal,
    // DelModal,

    Loading
  }
}
</script>