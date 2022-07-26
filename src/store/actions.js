import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    addCar(context, payload) {
        //     // state.carList.push(payload)
        //     let oldProduct=null;
        //     for(let item of state.carList){
        //         if(item.iid===payload.iid){
        //             oldProduct=item
        //         }
        //     }
        // },

        return new Promise((resolve, reject) => {
            // 1.查找之前的数组是否有该商品
            let oldProduct = context.state.carList.find(item => item.iid === payload.iid)

            // 2.判断oldProduct
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve('当前的商品数量+1')
            } else {
                payload.count = 1
                // state.carList.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve('添加了新商品')
            }
        })
    }
}