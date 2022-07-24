<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name:'Scroll',
      props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
  data () {
    return {
        //scroll需要保存起来
        scroll:null
    }
  },
  mounted(){
    //1.创建BScroll对象
    this.scroll=new BScroll(this.$refs.wrapper,{
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
    })

    //2.监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      // console.log(position);
      this.$emit('scroll',position)
    })

    //3.监听上拉事件
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x,y,time=300){
      //this.scroll&&保证能拿到数据后才执行
      this.scroll&&this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll&&this.scroll.finishPullUp()
    },
    refresh(){
      console.log('----------');
      this.scroll&&this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll?this.scroll.y:0
    }
  },
}
</script>

<style type="text/css" scoped>
</style>
