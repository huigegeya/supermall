<template>
    <swiper>
        <swiper-item v-for="item in banners">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
 import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'HomeSwiper',
    props:{
        banners:{
            type:Array,
            default(){
                return[]
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    },
  data () {
    return {
        isLoad:false
    }
  },
  methods: {
    imageLoad(){
        //四张图片需要加载四次 这样可以只执行一次
        if(!this.isLoad){
        this.$emit('swipperImageLoad')
        }
    }
  },
}
</script>

<style type="text/css" scoped>

</style>
