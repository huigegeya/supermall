<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="item in topImages">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import { Swiper,SwiperItem } from 'components/common/swiper'
export default {
    name:'DetailSwiper',
    components: { 
        Swiper,
        SwiperItem
    },
    props:{
        topImages:{
            type:Array,
            default(){
                return[]
            }
        }
    },
  data () {
    return {}
  },
  methods: {},
}
</script>

<style type="text/css" scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
</style>
