<template>
  <div class="toast-container position-fixed pe-3 top-10 end-0">
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>
  
<script>

import { storeToRefs } from 'pinia';
import Toast from '@/components/Toast.vue';
import statusStore from '@/stores/statusStore.js'

export default {
  components: { 
    Toast 
  },
  setup() { //  composition API寫法
    const status = statusStore()
    const { messages } = storeToRefs(status)
    return {
      messages
    }
  }

  // data() {
  //   return {
  //     messages: [],
  //   };
  // },
  // EventBus 改用pinia-statusStore 處理
  // inject: ['emitter'],
  // mounted() {
  //   this.emitter.on('push-message', (message) => {
  //     const { style = 'success', title, content } = message;
  //     this.messages.push({ style, title, content });
  //   });
  // },
};
</script>