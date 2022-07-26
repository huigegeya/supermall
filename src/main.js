import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
fastclick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyload, {
    loading: require('./assets/img/common/dog.icon.jpeg'),
    preLoad: 1.3,
    attempt: 1
})

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')
