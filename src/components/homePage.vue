<template>
  <div id='homePage'>
    <headers></headers>
    <transition name="fade-out">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade-out">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <span>{{message}}</span>
  </div>
</template>

<script>
import headers from '@/components/header'
export default {
  created(){
    this.updateMessage()
  },
  data () {
    return {
      message: '没有更新'
    }
  },
  methods: {
    updateMessage() {
      this.message = '更新完成'
      console.log(this.$el) // => 'DOM没有更新'
      this.$nextTick(()=> {
        console.log(this.$el) // => 'DOM更新完成'
      })
    }
  },
  watch:{
    "$route"(to,from){
        //from 对象中包含当前地址
        //to 对象中包含目标地址
        //其实还有一个next参数的，这个参数是控制路由是否跳转的，如果没写，可以不用写next()来代表允许路由跳转，如果写了就必须写next(),否则路由是不会生效的。
    }
  },
  components: {
    headers
  }
}
</script>



