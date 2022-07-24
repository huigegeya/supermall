<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
    name:'BackTop',
  data () {
    return {}
  },
  methods: {},
}
</script>

<style type="text/css" scoped>
    .back-top{
        position: fixed;
        right: 8px;
        bottom: 55px;
    }

    .back-top img{
        width:43px;
        height: 43px;
    }
</style>
