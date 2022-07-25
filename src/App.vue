<template>
  <div id="app" class="wrapper">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
     <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/maintabbar/MainTabBar.vue'
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>

<style>
@import './assets/css/base.css';
</style>
<!-- 
  github第一次需要连接电脑 （绑定个密钥） 

  从零开始开发项目 
  1.脚手架初始化项目 vue create xxx 
  2.划分目录结构（创建好可能需要用到的包） 
  3.初始化css(统一样式) 引入两个css文件 
  4.给路径配置别名，在vue.config.js,导入的时候不用再想../ 项目组长需要在配置个.editorconfig统一编码习惯 
  5.项目模块划分：tabbar->路由映射关系 
    5.1路由配置 
      5.1.1 router需要下载npm install vue-router --save
      5.1.2 本项目是vue2 脚手架cli3
      5.1.3 router-view
    5.2网络请求axios
      5.2.1 axios需要下载npm install axios --save
      5.2.2 一般axios封装在request中 请求需要另外在network再创建一个对应的js发送请求(多封装一层)
      5.2.3 在对应的组件中导入那个对应的js 然后再created（组件创建完成时发送请求）
      5.2.4 请求回来的数据需要从请求中传出到组件的data中，不然会垃圾回收掉（data中的属性指向res.data就不会被回收掉）
      5.2.5 注意：request函数中记得返回
    5.3better-scroll滚动
      5.3.1 better-scroll需要下载框架npm install better-scroll --save
      5.3.2 因为项目发布到服务器后用安卓或ios手机打开如果是原生的滚动overflow-y：scroll会不适配有卡顿，所以需要用到封装好的better-scroll框架 
      5.3.3 一般better-scroll需要多封装一层，以防框架不更新导致耦合度太高而不方便修改
      5.3.4 better-scroll的wrapper（一般名称）里面只能有一个元素（这一个元素里面再有多少个无所谓）
      5.3.5 scroll需要在data中保存起来
      5.3.6 注意：版本1.13.2
      5.3.7 注意:上拉加载pullingUp需要调用完成加载函数finsihPullingUp函数 不然只会加载一次
      5.3.8 better-scroll可滚动区域的问题
          5.3.8.1 better-scroll是由scrollerHeight决定有多少区域可以滚动
          5.3.8.2 产生卡顿原因：刚开始计算scrollerHeight是由子组件的高度决定，没有将图片高度计算在内，后来图片加载进来有了新的高度，所以计算出来是错误的
          5.3.8.3 解决：监听每张图片是否加载完成，只要有一张图片加载完成了，就执行一次refresh()
          5.3.8.4 监听图片加载完成：1.原生js img:onload=function(){} 2.vue中监听 @load='方法'
          5.3.8.5 better-scroll必须设置高度  父级需要设置视口高度100vh
      5.3.9 注意：默认情况下是没有$bus 需要原型添加 Vue.prototype.$bus = new Vue()
      5.3.10 对于fresh非常频繁的问题，进行防抖操作 防抖debounce/节流throttle 可以将refresh函数传到debounce函数中形成一个新的函数-
      5.3.11 tabControl的吸顶效果
          5.3.11.1 必须知道滚动到多少,才开始有吸顶效果 需要获取tabControl中的offsetTop 一般是获取轮播图的offsetTop
          5.3.11.2 为了不让因为轮播图四张图片发出四次事件 可以使用isLoad记录状态
          5.3.11.3 监听滚动,动态的改变tabControl的值
      5.3.12 让Home保持原来的状态
          5.3.12.1 keep-alive让Home不要destroy()掉
          5.3.12.2 离开时保存一个saveY 进来时将位置设成saveY
      5.3.13 mapGetters
          5.3.13.1 mapGetters是vuex里的一个辅助函数
          5.3.13.2 mapGetters可以把vuex中getters的方法变成computed计算属性-->
   

   <!-- 注意：
   1.css两个.xxx之间是逗号隔开 
   2.一般文件夹用小驼峰命名 组件用大驼峰命名
   3.一般组件名字需要的网络请求封装名字一致 
   4.复用时数组之间用=的话会覆盖 所以需要push进去可以for循环 也可以解构array.push(...list) 
   5.style中的scoped设置了作用域
   6.$ref绑定到组件上this.$refs获取到的就是一个组件对象 绑定到div上拿到的就是div就是一个元素对象
   7.组件不能绑定@click 但是可以使用修饰词@click.native
   8.button无论click是否设置ture都可以点击 但是div一定要设置click:true
   9.属性=''传过去的是字符串 v-bind绑定的属性才是变量
   10. 防抖和设置变量:防抖是一直需要执行采用 设置变量是后面几次可以不执行才用 
   11.一般需要请求的数据过多时 需要用类（类中有构造函数）去进行封装 然后在面向这一个对象就行
   12.非父子组件的通信涉及到事件总线 Vue.protoType.$bus=new Vue() this.$bus.emit('xxx',)  this.$bus.on('xxx')
   13.filters与方法的区别 vue 对数据提供一个 filter 的处理器，用以在不改变data 的情况下 输出前端需要的数据格式。
   14.find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
   15.JS for in 循环是为遍历对象而创建的，虽然也可以遍历数组，但是并不推荐，若要遍历数组，可以使用 for 循环或者 for of 循环
      for in遍历index    for of遍历的是item
   16.给组件添加事件（例如点击事件）需要.native-->

    <!-- 根据id请求详情数据
    1.先请求所有的数据拿到所有的id
    2.通过id进行路由跳转
    3.拿到路由跳转时的id
    4.传入id请求详情数据 -->