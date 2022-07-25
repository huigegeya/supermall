import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutations-types'

export default {
    // 1.mutations唯一的目的就是修改state中的状态
    // 2.mutations中的每个方法尽可能完成的事件比较单一一点
    [ADD_COUNTER](state, payload) {
        payload.count++
    },
    [ADD_TO_CART](state, payload) {
        payload.checked = true
        state.carList.push(payload)
    }
}