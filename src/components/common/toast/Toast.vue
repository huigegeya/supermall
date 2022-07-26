<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
    name:'Toast',
    // props:{
    //     message:{
    //         type:String,
    //         default:''
    //     },
    //     isShow:{
    //         type:Boolean,
    //         default:false
    //     }
    // },
  data () {
    return {
        isShow:false,
        message:''
    }
  },
  methods: {
    show(message='商品',duration=2000){
          this.isShow=true;
          this.message=message;

          setTimeout(()=>{
            this.isShow=false
            this.message=''
          },duration)
    }
  },
}
</script>

<style type="text/css" scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;
    width: 180px;
    text-align: center;
    z-index: 999;

    color: #fff;
    background-color: rgba(0,0,0,.75);
  }
</style>
