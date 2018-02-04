<template>
    <div class='left-right-progress'>
        <div class='progress-line'>
            <span class='progress-name'>{{name}}</span>
            <span class='progress-number'>{{number}}</span>
            <span class='progress-company'>{{company}}</span>
        </div>
        <el-progress :percentage="speed" :show-text='false'></el-progress>
    </div>
</template>

<script>

export default {
  props:['name', 'number', 'company', 'speed'],
  data () {
    return {
    }
  }
}
</script>
