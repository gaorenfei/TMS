<template>
  <div id="driver-certification">
    <tabCommonBg>
      <div class="driver-header">
        <address-select class="fl"
          textName='省份:'
          :region='provinceAry'
          @getSelect='provinceSelect'
          @getdata="provinceData"
          :regionName='defaultProvinceName'>
        </address-select>
      </div>
    </tabCommonBg>
  </div>
</template>

<script>
import addressSelect from "@/components/public/select";
import tabCommonBg from "@/components/public/commonBg";
export default {
  name: "driver-certification",
  data() {
    return {
      provinceAry: [], //省下拉框
      defaultProvinceName: "" //省下拉框默认数据
    };
  },
  methods: {
    //选中省下拉框
    provinceSelect() {},
    //返回省下拉框数据
    provinceData() {}
  },
  components: {
    addressSelect,
    tabCommonBg
  }
};
</script>
<style>

</style>
