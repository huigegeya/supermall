<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goodsItem="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
    name:'GoodsList',
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{GoodsListItem},
  data () {
    return {}
  },
  methods: {},
}
</script>

<style type="text/css" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    z-index: 9;
}
</style>
