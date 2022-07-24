<template>
  <div class="detail-nav-bar">
    <nav-bar class="nav-bar">
        <div slot="left" class="back" @click="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
          <div v-for="(item,index) in titles" 
            class="title-item"
            :class="{active:index===currentIndex}"
            @click="titleClick(index)">{{item}}</div>
        </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
    name:'DetailNavBar',
  components: { NavBar },
  data () {
    return {
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
    }
  },
  methods: {
    titleClick(index){
      this.currentIndex=index
      this.$emit('titleClick',index)
    },
    back(){
      // this.$router.go(-1)
      this.$router.back()
    }
  },
}
</script>

<style type="text/css" scoped>
  .nav-bar{
    height:40px
  }
  .title{
    display: flex;
    font-size: 13px;
    padding: 0 10px;
  }

  .title-item{
    flex: 1;
  }

  .active{
    color: var(--color-high-text);
  }
  
  .back img{
    margin-top: 10px;
  }
</style>
