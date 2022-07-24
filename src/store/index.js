import Vue from 'vue'
import Vuex from 'vuex'

// 1.安装插件
Vue.use(Vuex)

// 2.创建Store对象
const store = new Vuex.Store({
    state: {
        carList: []
    },
    mutations: {
        addCar(state, payload) {
            //     // state.carList.push(payload)
            //     let oldProduct=null;
            //     for(let item of state.carList){
            //         if(item.iid===payload.iid){
            //             oldProduct=item
            //         }
            //     }
            // },

            // 1.查找之前的数组是否有该商品
            let oldProduct = state.carList.find(item => item.iid === payload.iid)

            // 2.判断oldProduct
            if (oldProduct) {
                oldProduct.count += 1
            } else {
                payload.count = 1
                state.carList.push(payload)
            }
        }
    }
})

// 3.挂载到Vue实例上
export default store