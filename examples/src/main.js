import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import LmUI from '../../packages/index'
import $lm from '../../packages/utils/$lm'
// import {LmLoading} from '../../packages/index'

const app=createApp(App)
app.use(ElementPlus)
app.use($lm)
app.use(LmLoading)
app.use(LmUI)
// app.prototype.$lmLoading=LmLoading

Vue.config.productionTip = false
app.mount('#app')
