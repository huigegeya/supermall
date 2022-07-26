import Vue from 'vue'
import Toast from './Toast.vue'

const obj = {}

obj.install = function () {
    // console.log('执行了install函数');
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    // 2.new的方式，根据组件构造器，可以创建出一个组件对象
    const toast = new toastConstructor()

    // 3.将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    // 4.toast.$el对应的就是div
    // appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj