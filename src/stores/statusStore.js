import { defineStore } from 'pinia'

export default defineStore('statusStore', {
  //data, methods, computed  vue    Component上下對應
  //stste, actions, getters  pinia  Store上下對應
  stste: () => ({
    isLoading: false,
    addCartLoading: '',
    cartQtyLoading: '',
    delCart: '',
    messages: []
  }),
  actions: {
    pushMessage(data) {
      const { style = 'success', title, content } = data
      this.messages.push({ style, title, content })
    }
  }
})
