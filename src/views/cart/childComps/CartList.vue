<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item
            v-for="(item,index) in carList"
            :key="index"
            :item-info="item">
        </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'
import { mapGetters } from 'vuex'

export default {
  name:"CartList",
  components: { 
    Scroll,
    CartListItem 
    },
  data () {
    return {}
  },
  computed:{
    ...mapGetters(['carList'])
  },
  methods: {},
  activated() {
      this.$refs.scroll.refresh()
    }
}
</script>

<style type="text/css" scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
