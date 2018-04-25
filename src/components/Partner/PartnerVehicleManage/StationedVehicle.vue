<template>
  <div id="consignor">
         <div class="consignor-show">
           <div class="consignor-input">
            <!-- Element组件Select 选择器 -->
            <div class="block">
              <span class="text"> 车辆规格: </span>  
              <el-select v-model="value" placeholder="请选择" class="condition-select">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="block">
              <span class="text"> 车辆类型: </span>  
              <el-select v-model="value1" placeholder="请选择" class="condition-select">
                <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div class="block">
              <span class="text"> 车辆服务状态: </span>  
              <el-select v-model="value2" placeholder="请选择" class="condition-select">
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </div>

            <span class="text"> 车牌号: </span>  
              <div class="block">
                <el-input v-model="input" placeholder="请输入内容" class="condition-select"></el-input>
              </div>

            <span class="text"> 司机: </span>  
              <div class="block">
                <el-input v-model="input" placeholder="请输入内容" class="condition-select"></el-input>
              </div>
              
           <el-button type="primary" class="text"> 查 询 </el-button>
           </div>

            <!-- 表格 -->
           <div class="consignor-input">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%;height:100%">
                    <el-table-column
                    fixed
                    prop="serialnum"
                    label="序号"
                    width="70">
                    </el-table-column>
                    <el-table-column
                    prop="licensenum"
                    label="车牌号"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="servicestatus"
                    label="服务状态"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="driver"
                    label="司机"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="driverphone"
                    label="司机联系方式"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="vehicletype"
                    label="车辆类型"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="vehiclespecifications"
                    label="车辆规格"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="vehiclebrandmodel"
                    label="车辆品牌/型号"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="length"
                    label="车(长)"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="width"
                    label="车(宽)"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="height"
                    label="车(高)"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="licenseplatetype"
                    label="牌照类型"
                    width="100">
                    </el-table-column>
                    <el-table-column
                    prop="maximumcarriervolume"
                    label="最大运载体积"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    prop="maximumcarryingweight"
                    label="最大运载重量"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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

      options1: [
        {
          value: "10",
          label: "厢式货车"
        },
        {
          value: "1",
          label: "牵引车"
        },
        {
          value: "0",
          label: "挂车"
        }
      ],
      value1: "",

      options2: [
        {
          value: "10",
          label: "正在服务"
        },
        {
          value: "1",
          label: "暂停状态"
        },
        {
          value: "0",
          label: "空闲状态"
        }
      ],
      value2: "",


      value6: "",
      value7: "",
      input: '',
      //表格假数据
      tableData: [{
          serialnum: 1,
          licensenum: '浙A0047',
          servicestatus: '暂停服务',
          driver: '擎天柱',
          driverphone: '12345678900',
          vehicletype: '厢式货车',
          vehiclespecifications:'6.8米',
          vehiclebrandmodel:'宾利 EXP 9 F',
          length:'11.5米',
          width :'4米',
          height:'5.6米',
          licenseplatetype:'A2',
          maximumcarriervolume:'150平方米',
          maximumcarryingweight:'3t'
        }],
    };
  },

  //组件注册
  components: {
    tabCommonBg,
    selectCity
  },
  methods: {
    //表格
      handleClick(row) {
        console.log(row);
      },
      onSubmit() {
        console.log('submit!');
      }
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
      margin-top: 20px;
      margin-left: 20px;
      margin-right: 20px;
  }
  .condition-select{
      width: 120px;
  }
}
</style>