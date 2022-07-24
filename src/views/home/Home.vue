<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- <div class="wrapper-content"> -->
      <tab-control 
        ref="tabControl1" 
        :titles="['流行','新款','精选']" 
        @tabClick="tabClick"
        class="tab-control"
        v-show="isTabFixed"></tab-control>
    <scroll class="content" 
      ref="scroll" 
      :probe-type='3' 
      @scroll="backScroll"
      :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swipperImageLoad="swipperImageLoad"></home-swiper>
      <RecommendView :recommends="recommend"/>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- </div> -->
    <!-- 组件不能绑定事件,但是可以用修饰词native来绑定 -->
      <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backtop/BackTop.vue'

import {itemListenerMixin,backTopMixin} from 'common/mixin'
import {debounce} from 'common/utils'
import {getHomeMultidata,
getHomeGoods
} from 'network/home'

export default {
  name:'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
},
mixins:[itemListenerMixin,backTopMixin],
  data () {
    return {
      banners:[],
      recommend:[],
      //初始化没数据 page为0
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      // isBackTopShow:false,
      tabOffSetTop:0,
      isTabFixed:false,
      saveY:0,
      // itemImgListener:null
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created(){
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    // //调用防抖函数
    // // const refresh=this.debounce(this.$refs.scroll.refresh,200)
    // let newRefresh=debounce(this.$refs.scroll.refresh,100)

    // //对deactivated里监听的事件进行保存
    // this.itemImgListener=()=>{
    //   newRefresh()
    // }
    //  // 3.监听item中图片加载完成 
    // this.$bus.$on('itemImageLoad',this.itemImgListener
    // // ()=>{ refresh()}
    //   // console.log('----------');
    //   // 监听最好放在mounted中 保证监听到的scroll是有值的
    //   // this.$refs.scroll.refresh()
     
    //   // console.log('------------');
    // )

    //tabControl吸顶 获取tabControl的offsetTop
    // console.log(this.$refs.tabControl.$el.offsetTop);
  },
  methods: {
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
            console.log(res.data);
            this.banners=res.data.banner.list,
            this.recommend=res.data.recommend.list
          })
      },
    getHomeGoods(type){
      //第一页
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1

        this.$refs.scroll.finishPullUp()
        // this.$refs.scroll.scroll.finishPullUp()
      })
    },
    tabClick(index){
      // console.log(index);
      switch(index){
        case 0:
          this.currentType='pop'
          break
        case 1:
          this.currentType='new'
          break
        case 2:
          this.currentType ='sell'
          break
      }
      this.$refs.tabControl1.currentIndex=index;
      this.$refs.tabControl2.currentIndex=index;
    },
    // backClick(){
    //   // this.$refs.scroll.scroll.scrollTo(0,0,500)

    //   //在scroll组件中封装函数 直接访问组件的方法
    //   this.$refs.scroll.scrollTo(0,0,500)
    // },
    backScroll(position){
      // console.log(position);
      //1.判断BackTop是否显示
      this.isBackTopShow=(-position.y)>1000

      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed=(-position.y)>this.tabOffSetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    // 封装防抖函数
    debounce(func,delay){
      let timer = null
      return function(...args){
        if(timer) clearTimeout(timer)//第一次refresh的时候为空不执行 第二次-第30次时会清除掉时间以延长delay的时间（清除执行） 每次传入都会清空时间直到delay规定时间没有传入
        timer=setTimeout(() => {
          // console.log(timer); 
          func.apply(this,args)//执行传入的函数但要等到delay的时间达到
        }, delay);
      }
    },
    swipperImageLoad(){
       console.log(this.$refs.tabControl2.$el.offsetTop);
       this.tabOffSetTop=this.$refs.tabControl2.$el.offsetTop
    }
  },
  destroyed(){
    console.log('destroyed');
  },
   //activated和deactivated需要依赖于keep-alive
  activated(){
    console.log('activated');
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated(){
    console.log('deactivated');
    // 1.保存y值
    this.saveY=this.$refs.scroll.getScrollY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  }
}
</script>

<style type="text/css" scoped>
 #home {
    /*padding-top: 44px;*/
    /* vh视口高度 */
    height: 100vh;
    position: relative;
  }
.home-nav {
    background-color: var(--color-tint);
    color: #fff;

/* 对于原生滚动才有用 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  /* .wrapper-content{
    position: absolute;
    top: 44px;
  } */
  /* .content{
    height: calc(100%-93px);
    overflow: hidden;
    margin-top: 44px;
  } */
   .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
