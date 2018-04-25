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
  components: {
    headers
  }
}
</script>



