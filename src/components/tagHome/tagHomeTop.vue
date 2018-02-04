<template>
    <div :class='className' v-if='topShow'>
          <img :src='imgPath' class='top-icon'>
          <div class='top-en'>{{en}}</div>
          <div class='top-font'>{{fontValue}}</div>
          <div class='top-number'>{{number}}</div>
    </div>
</template>
<script>
export default {
  props:['className', 'fontValue','en','number','imgPath'],
  data () {
    return {
        topShow:false
    }
  },
  mounted(){
     this.topShow = true;
  }
}
</script>