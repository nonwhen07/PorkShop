import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入axios功能
import axios from 'axios'
import VueAxios from 'vue-axios'

// 引入 vue-loadivng功能
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'

// 引入 vee-validate功能
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
// 引入 VeeValidate 的驗證規則
import * as VeeValidateRules from '@vee-validate/rules'
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n'
// 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// 改用自定義的bootstrap
//import './assets/all.scss'
// 引入 bootstrap
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Vue內部
import App from './App.vue'
import router from './router'

Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== 'default') {
    defineRule(rule, VeeValidateRules[rule])
  }
})

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true // 調整為：輸入文字時，就立即進行驗證
})
setLocale('zh_TW')

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)

// LoadingOverlay 元件
app.component('LoadingOverlay', Loading)

// VeeValidate 元件
app.component('VField', Field)
app.component('VForm', Form)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
