<template>
  <div class="nav-bar">
    <nav-bar>
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList'
import { mapGetters } from 'vuex'
import CartBottomBar from './childComps/CartBottomBar.vue'


export default {
  name:'cart',
  components: { 
    NavBar,
    CartList,
    CartBottomBar
  },
  data () {
    return {}
  },
  computed:{
    // mapGetters可以把vuex中getters的方法变成computed计算属性
    ...mapGetters(
      {length:'carLength'}
    )
  },
  methods: {},
}
</script>

<style type="text/css" scoped>
.nav-bar{
  background-color: var(--color-tint);
  /* color: #fff; */
  font-weight: 700;
}
</style>
