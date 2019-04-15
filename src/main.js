import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import App from './App'

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
