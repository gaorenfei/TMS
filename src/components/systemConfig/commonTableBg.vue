<template>
  <div id="common-table-bg">
      <div class='common-table-bg-box'>
          <slot></slot>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style>
#common-table-bg {
  padding: 20px 50px;
}
.common-table-bg-box {
  padding: 40px;
  background: #f9f9f9;
}
</style>
