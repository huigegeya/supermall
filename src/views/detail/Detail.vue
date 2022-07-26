<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll"
            :probe-type="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <DetailShopInfo :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="goodsParam" ref="params"/>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCar="addToCar"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isBackTopShow"></back-top>
    <!-- <toast :message="message" :isShow="isShow"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from  './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from '@/components/common/scroll/Scroll.vue'
// import Toast from '@/components/common/toast/Toast.vue'

import { debounce } from '@/common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'
import { getDetail,getRecommend,Goods,Shop,GoodsParam
} from '@/network/detail'
import { mapActions } from 'vuex'



export default {
  components: { 
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo ,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    // Toast,
  },
    name:'Detail',
  mixins:[itemListenerMixin,backTopMixin],
  data () {
    return { 
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        goodsParam:{},
        commentInfo:{},
        recommends:[],
        // itemImgListener:null,
        themeTopY:[],
        getThemeTopY:null,
        positionY:null,
        currentIndex:0,
        // isShow:false,
        // message:''
    }
  },
  created(){
    // route是一个跳转的路由对象，每一个路由都会有一个route对象，是一个局部的对象，可以获取对应的name,path,params,query等
    // 1.保存传入的iid
    this.iid=this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      console.log(res);
      // 2.1.获取数据
      const data =res.result

      // 2.2.获取轮播图的图片
      this.topImages=data.itemInfo.topImages

      // 2.3.获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)

      // 2.4.获取店铺信息
      this.shop=new Shop(data.shopInfo)

      // 2.5.保存商品详情数据
      this.detailInfo=data.detailInfo

      // 2.6.获取商品参数
      this.goodsParam=new GoodsParam(data.itemParams.info,data.itemParams.rule)

      // 2.7.取出评论的信息
      if(data.rate.cRate!==0){
        this.commentInfo=data.rate.list[0]
      }
    })
    
    // 3.请求推荐数据
    getRecommend().then(res=>{
      this.recommends=res.data.list
    })

    // 4.1 created获取 this.$refs.params.$el还没渲染 拿不到值所以值不对
    // this.getThemeTopY()

    // 4.2 this.$nextTick()获取值不对 此时图片还没加载完
    // this.$nextTick(()=>{
    //   this.getThemeTopY()
    // })

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(()=>{
      this.themeTopY=[]
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop)
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopY.push(Number.MAX_VALUE)
      console.log(this.themeTopY);
    })
  },
  mounted(){
    // let newRefresh=debounce(this.$refs.scroll.refresh,100)
    // this.itemImgListener=()=>{
    //   newRefresh()
    // }
    // this.$bus.$on('itemImgLoad',this.itemImgListener)

    // 4.3 mounted()中获取 值不对 没拿到数据
    // this.getThemeTopY()
  },
  //detail没有设置keep-alive所以没有deactivated
  destroyed(){
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCar']),
    imageLoad(){
      //refresh刷新 把图片加载出来重新计算高度 防止下滑过程卡顿
      // this.$refs.scroll.refresh()
      this.newRefresh()
      this.getThemeTopY()
    },
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index],0)
      console.log(this.themeTopY[index]);
    },
    contentScroll(position){
      // 方案一
      // this.positionY=-position.y
      // // console.log(this.positionY);
      // let length = this.themeTopY.length
      // for(let i=0;i<this.themeTopY.length;i++){
      //   if((this.currentIndex!==i&&(i<length-1&&this.positionY>this.themeTopY[i]&&this.positionY<this.themeTopY[i+1])
      //   ||(i===length-1&&this.positionY>this.themeTopY[i]))){
      //     this.currentIndex=i
      //     this.$refs.nav.currentIndex=this.currentIndex
      //     console.log(this.currentIndex);
      //   }
      // }
      
      // 方案二 hacker
      this.positionY=-position.y
      for(let i=0;i<this.themeTopY.length-1;i++){
        if(this.currentIndex!==i&&(this.positionY>=this.themeTopY[i]&&this.positionY<this.themeTopY[i+1])){
          this.currentIndex=i
          this.$refs.nav.currentIndex=this.currentIndex
        }
      }
      this.isBackTopShow=(-position.y)>1000
    },
    addToCar(){
       // 1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.newPrice
        product.iid = this.iid
        product.newPrice = this.goods.nowPrice

        // 2.将商品添加到购物车里
        // this.$store.carList.push(product)
        // this.$store.dispatch('addCar',product).then(res=>console.log(res))

      // 方法一 ...mapActions 未封装
       this.addCar(product).then(res=>{
      //     this.isShow=true;
      //     this.message=res;

      //     setTimeout(()=>{
      //       this.isShow=false
      //       this.message=''
      //     },2000)
      //  })

        // 方法二 插件方式的封装
        this.$toast.show(res,2000)
       })
    }
  },
}
</script>

<style type="text/css" scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

/* .detail-nav{
  position: relative;
  z-index: 9;
} */
.content {
    overflow: hidden;

    position: absolute;
    top: 40px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
