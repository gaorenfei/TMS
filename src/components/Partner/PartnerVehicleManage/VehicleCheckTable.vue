<template>
  <div id="consignor">
         <div class="consignor-show">
           <div class="consignor-input">
            <!-- Element组件Select 选择器 -->
            <div class="block">
              <span class="text"> 车辆规格: </span>  
              <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
              <span class="text"> 司机: </span>  
              <div class="block">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
              <span class="text"> 车牌号: </span>  
              <div class="block">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="block">
                <el-button type="primary" class="text"> 查 询 </el-button>
            </div>
           </div>
         </div>
  </div>
</template>

<script>
import tabCommonBg from "@/components/public/commonBg";
import selectCity from "@/components/vehicle/selectCity";
import comDialog from "@/components/public/dialog";
import comInput from "@/components/public/comInput";
import paging from "@/components/public/paging";
import selectTag from "@/components/public/selectTag";
import comSelect from "@/components/public/select";

export default {
  // 数据
  data() {
    return {
      //状态
      options: [
        {
          value: "10",
          label: "4.2米"
        },
        {
          value: "1",
          label: "5.6米"
        },
        {
          value: "0",
          label: "6.8米"
        }
      ],
      value: "",
     
      value6: "",
      value7: "",
      input: ''
    };
  },

  //组件注册
  components: {
    tabCommonBg,
    selectCity
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
#consignor {
  padding-top: 30px;
  .text {
    margin-right: 20px;
    margin-left: 20px;
  }
  .block {
      display: inline-block;
  }
  .consignor-input{
      // margin-top: 20px;
      margin-left: 20px;
      margin-right: 20px;
  }
}
</style>