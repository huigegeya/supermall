<template>
  <div class="bottom-bar">
    <CheckButton 
      class="select-all"
      :is-checked="isSelectAll"
      @click.native="checkClick"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计:{{totalPrice}}</span>
    <span class="buy-product">去计算({{carChecked}})</span>
  </div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex';
export default {
    data() {
        return {};
    },
    methods: {
      checkClick(){
        if(this.isSelectAll){
          this.carList.forEach(item=>item.checked=false) 
        }else{
          this.carList.forEach(item=>item.checked=true)
        }
      }
    },
    components: { CheckButton },
    computed:{
        ...mapGetters(['carList']),
        totalPrice(){
            return '￥'+this.carList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue+item.newPrice*item.count
            },0).toFixed(2)
        },
        carChecked(){
            return this.carList.filter(item=>{
                return item.checked
            }).length
        },
        isSelectAll(){
          if(this.carList.length===0) return false
          // 方法一filter()
          return !this.carList.filter(item=>!item.checked).length

          // 方法二find()
          // find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
          // return !this.carList.find(item=>!item.checked)

          // 方法三遍历
          // for(let item of this.carList){
          //   if(!item.checked)
          //   return false
          // }return true
        }
    }
}
</script>

<style type="text/css" scoped>
.bottom-bar {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-bar .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-bar .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-bar .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
