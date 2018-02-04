<template>
    <div :id="idName" v-if='chart'>
        <div class='middle-top'>
          <span class='middle-title'>{{title}}</span>
          <el-radio-group v-model="radio" size="small">
              <el-radio-button  label="半个月"></el-radio-button>
              <el-radio-button  label="三个月"></el-radio-button>
              <el-radio-button  label="一年"></el-radio-button>
          </el-radio-group>
        </div>
    </div>
</template>
<script>

export default {
  props:['title','idName'],
  mounted () {
    this.chart = true;
   
  },
  data () {
    return {
      chart:false,
      radio:'半个月'
    }
  }
}
</script>