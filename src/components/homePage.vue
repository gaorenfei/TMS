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
  </div>
</template>

<script>
import headers from '@/components/header'
export default {
  data () {
    return {
    }
  },
  components: {
    headers
  }
}
</script>



