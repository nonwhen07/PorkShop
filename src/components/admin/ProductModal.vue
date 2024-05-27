<template>
    <div
      id="productModal"
      ref="productModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span v-if="tempProduct">編輯{{ tempProduct.title }}</span>
              <span v-else>新增產品</span>
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <v-form ref="form"  v-slot="{ errors }" @submit="updateProduct(tempProduct)">
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-2">
                    <div class="mb-3">
                      <label for="imageUrl" class="form-label">輸入圖片網址</label>
                      <input
                        id="addImageUrl"
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                        ref="image"
                        v-model="editProduct.imageUrl" />
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-sm d-block w-100"
                        @click="addImage()">
                        新增圖片
                      </button>
                    </div>
                    <!-- <template v-if="editProduct.imagesUrl" v-for="(image, index) in tempProduct.imagesUrl" :key="image">
                      <img :src="image" v-bind:alt="tempProduct.title" class="card-img-top primary-image"
                        v-bind:title="tempProduct.title+':'+tempProduct.description">
                      <button type="button" class="btn btn-outline-danger btn-sm d-block w-100" @click="delImage(index)">
                        刪除圖片
                      </button>
                    </template> -->
                    <!-- <template v-for="(image, index) in tempProduct.imagesUrl" :key="image">
                      <img
                        :src="image"
                        v-bind:alt="tempProduct.title"
                        class="card-img-top primary-image"
                        v-bind:title="tempProduct.title + ':' + tempProduct.description" />
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm d-block w-100"
                        @click="delImage(index)">
                        刪除圖片
                      </button>
                    </template> -->
                    <template v-for="(image, index) in editProduct.imagesUrl" :key="index">
                      <img
                        :id="`${editProduct.title +'_'+ index}`"
                        :src="image"
                        v-bind:alt="editProduct.title"
                        class="card-img-top primary-image"
                        v-bind:title="editProduct.title + ':' + editProduct.description" />
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm d-block w-100"
                        @click="delImage(index)">
                        刪除圖片
                      </button>
                    </template>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label for="title" class="form-label">標題</label>
                    <v-field
                      id="title"
                      name="標題"
                      type="text"
                      class="form-control"
                      placeholder="請輸入標題"
                      :class="{ 'is-invalid': errors['標題'] }"
                      rules="required"
                      v-model="editProduct.title"></v-field>
                    <error-message name="標題" class="invalid-feedback"></error-message>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="category" class="form-label">分類</label>
                      <v-field
                        id="category"
                        name="分類"
                        type="text"
                        class="form-control"
                        placeholder="請輸入分類"
                        :class="{ 'is-invalid': errors['分類'] }"
                        rules="required"
                        v-model="editProduct.category"></v-field>
                      <error-message name="分類" class="invalid-feedback"></error-message>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="unit" class="form-label">單位</label>
                      <v-field
                        id="unit"
                        name="單位"
                        type="text"
                        class="form-control"
                        placeholder="請輸入單位"
                        :class="{ 'is-invalid': errors['單位'] }"
                        rules="required"
                        v-model="editProduct.unit"></v-field>
                      <error-message name="單位" class="invalid-feedback"></error-message>
                    </div>
                  </div>
                  <div class="row">
                    <div class="mb-3 col-md-6">
                      <label for="origin_price" class="form-label">原價</label>
                      <v-field
                        id="origin_price"
                        name="原價"
                        type="number"
                        class="form-control"
                        placeholder="請輸入原價"
                        :class="{ 'is-invalid': errors['原價'] }"
                        rules="required"
                        v-model.number="editProduct.origin_price"></v-field>
                      <error-message name="原價" class="invalid-feedback"></error-message>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label for="price" class="form-label">售價</label>
                      <v-field
                        id="price"
                        name="售價"
                        type="number"
                        class="form-control"
                        placeholder="請輸入售價"
                        :class="{ 'is-invalid': errors['售價'] }"
                        rules="required"
                        v-model.number="editProduct.price"></v-field>
                      <error-message name="售價" class="invalid-feedback"></error-message>
                    </div>
                  </div>
                  <hr />
                  <div class="mb-3">
                    <label for="description" class="form-label">產品描述</label>
                    <textarea
                      id="description"
                      type="text"
                      class="form-control"
                      placeholder="請輸入產品描述"
                      v-model="editProduct.description">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <label for="content" class="form-label">說明內容</label>
                    <textarea
                      id="content"
                      type="text"
                      class="form-control"
                      placeholder="請輸入說明內容"
                      v-model="editProduct.content">
                    </textarea>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        id="is_enabled"
                        class="form-check-input"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        v-model="editProduct.is_enabled" />
                      <label class="form-check-label" for="is_enabled">是否啟用</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
              </button>
              <!-- <button type="button" class="btn btn-primary" @click="updateProduct(tempProduct)">
                確認送出
              </button> -->
              <button type="submit" class="btn btn-primary">
                確認送出
              </button>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
//import { Modal } from 'bootstrap';
import Modal from 'bootstrap/js/dist/modal'

export default {
  props: ['tempProduct', 'updateProduct', 'addImage', 'delImage'],
  data() {
    return {
      prodModal: null,
      editProduct: {}
    }
  },
  methods: {
    openModal() {
      this.prodModal.show()
    },
    closeModal() {
      this.prodModal.hide()
    }
  },
  watch: {
    tempProduct() {
      //由於eslint 不能直接在 v-model使用 props傳入的 tempProduct，
      this.editProduct = this.tempProduct //所以新定義一個參數 editProduct，來使用 v-model
    }
  },
  mounted() {
    this.prodModal = new Modal(this.$refs.productModal)
    this.editProduct = this.tempProduct
  }
}
</script>