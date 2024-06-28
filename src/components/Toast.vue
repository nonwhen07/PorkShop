<template>
  <div ref="toast" class="toast top-1 end-0 p-3" role="alert" aria-live="assertive" aria-atomic="true" style="z-index: 1">
    <div class="toast-header" style="border-bottom: none;">
      <span :class="`bg-${msg.style}`" class="p-2 rounded me-2 d-inline-block"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>

<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Toast',
  props: [
    'msg',
  ],
  mounted() {
    const toastEl = this.$refs.toast;
    const toast = new Toast(toastEl, {
      delay: 5000,
    });
    toast.show();
  },
};
</script>