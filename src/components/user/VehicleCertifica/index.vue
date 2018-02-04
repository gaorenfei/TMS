<template>
  <tab-common-bg>
    <div id="vehicleCertification" class="user-common">
        <div class="user-header">
          <select-city class="user-select"></select-city>
          <div class="user-select">
            <span>提交时间:</span>
            <el-date-picker
              v-model="dateValue1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            <el-date-picker
              v-model="dateValue2"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="user-select">
            <span>车牌号:</span>
            <el-input placeholder="请输入车牌号" ></el-input>
          </div>
          <el-button type="primary" icon="search" class="user-searchBtn
          " @click="handleSearch">查询</el-button>
        </div>

        <div class="user-body">
          <handle-tab @changeTab="changeTab" class="fl">
            <handle-table
              :tableData="tableData"
              :slot="slotName"
              @changeVisible="changeVisible"
            ></handle-table>
          </handle-tab>
          <paging
            :pageArry='page.pageArry'
            @handleSizeChange='handleSizeChange'
            @setCurrentPage='setCurrentPage'
            :total='page.total'
            :currentPageSize='page.currentPageSize'
            :currentPage='page.currentPage'
            class="paging-position"
            >
          </paging>
        </div>
        <el-dialog
          title="车辆审核"
          :visible.sync="dialogVisible"
          size="tiny"
          :before-close="handleClose">
          <div class="user-dialog-body">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <div class="user-license">
                <handle-dialog-tab @changeDialogTab="changeDialogTab"></handle-dialog-tab>
                  <div class="user-license-msg-box fl">
                    <div class="user-license-msg">
                        <div class="user-license-frag" :style="{marginBottom:'7px'}">
                          <span class="user-tag-left">车牌号<i>*</i>:</span>
                          <span>浙A11100</span>
                        </div>
                        <div class="user-license-frag" :style="{marginBottom:'7px'}">
                          <span class="user-tag-left fl">车牌类型:</span>
                          <span>黄牌</span>
                        </div>
                        <div class="user-license-frag" :style="{marginBottom:'7px'}">
                          <span class="user-tag-left fl">车辆规格:</span>
                          <span>4.2米</span>
                        </div>
                         <div class="user-license-frag">
                            <span class="user-tag-left fl">车辆类型:</span>
                            <address-select
                              textName=''
                              :region='provinceAry'
                              @getSelect='provinceSelect'
                              @getdata="provinceData"
                              :regionName='defaultProvinceName'
                              class="user-select"
                              >
                            </address-select>
                          </div>
                        <el-form-item prop="UseCharacter">
                          <div class="user-license-frag">
                            <span class="user-tag-left fl">使用性质:</span>
                            <el-input placeholder="请填写" class="fl user-select"></el-input>
                          </div>
                        </el-form-item>
                        <div class="user-license-frag">
                          <span class="user-tag-left fl">注册日期:</span>
                          <el-date-picker
                            v-model="dateValue3"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </div>
                         <div class="user-license-frag">
                           <span class="user-tag-left fl">发证日期:</span>
                          <el-date-picker
                            v-model="dateValue4"
                            type="date"
                            placeholder="选择日期"
                          >
                          </el-date-picker>
                        </div>
                    </div>
                  </div>
                </div>
                <div class="user-license">
                  <div class="user-license-left fl">
                    <el-form-item prop="Manufacturer">
                      <div class="user-license-frag">
                        <span class="fl user-license-s">厂商:</span>
                        <address-select
                          textName=''
                          :region='provinceAry'
                          @getSelect='provinceSelect'
                          @getdata="provinceData"
                          :regionName='defaultProvinceName'
                          class="fl"
                          >
                        </address-select>
                      </div>
                    </el-form-item>
                    <el-form-item prop="Manufacturer">
                    <div class="user-license-frag">
                      <span class="fl user-license-s">车辆型号:</span>
                      <address-select
                        textName=''
                        :region='provinceAry'
                        @getSelect='provinceSelect'
                        @getdata="provinceData"
                        :regionName='defaultProvinceName'
                        class="fl"
                        >
                      </address-select>
                      <el-input class="fl spe-input" placeholder="输入型号"></el-input>
                    </div>
                    </el-form-item>
                    <div class="user-license-frag">
                      <span class="fl user-license-s">车辆识别代码:</span>
                      <el-input class="fl"></el-input>
                    </div>
                    <div class="user-license-frag">
                      <span class="fl user-license-s">发动机号码:</span>
                      <el-input class="fl"></el-input>
                    </div>
                    <div class="user-license-frag">
                      <span class="fl user-license-s">核定载质量:</span>
                      <el-input class="fl"></el-input>
                      <span class="user-license-kg">kg</span>
                    </div>
                    <div class="user-license-frag">
                      <span class="fl user-license-s">准牵引总质量:</span>
                      <el-input class="fl"></el-input>
                      <span class="user-license-kg">kg</span>
                    </div>
                  </div>
                  <div class="user-license-right fl">
                    <div class="user-license-frag">
                      <span class="fl user-license-s">档案编号:</span>
                      <el-input class="fl"></el-input>
                    </div>
                    <div class="user-license-frag">
                      <span class="fl user-license-s">经营许可证号:</span>
                      <el-input class="fl"></el-input>
                    </div>
                    <div class="user-license-frag">
                      <span class="fl user-license-s">住址:</span>
                      <el-input class="fl"></el-input>
                    </div>
                    <div class="user-license-frag">
                      <span class="fl user-license-s">总质量:</span>
                      <el-input class="fl"></el-input>
                      <span class="user-license-kg">kg</span>
                    </div>
                    <div class="user-license-frag">
                      <span class="fl user-license-s">核定载人数:</span>
                      <address-select
                        textName=''
                        :region='provinceAry'
                        @getSelect='provinceSelect'
                        @getdata="provinceData"
                        :regionName='defaultProvinceName'
                        class="fl"
                        >
                      </address-select>
                    </div>
                    <div class="user-license-frag">
                      <span class="fl user-license-s">外廓尺寸:</span>
                      <el-input class="fl x"></el-input>
                      <span class="fl s-x">x</span>
                      <el-input class="fl x"></el-input>
                      <span class="fl s-x">x</span>
                      <el-input class="fl x"></el-input>
                      <span class="user-license-kg">kg</span>
                    </div>
                  </div>
              </div>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancle">取 消</el-button>
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
          </span>
        </el-dialog>
    </div>
  </tab-common-bg>
</template>

<script>
import addressSelect from "@/components/public/select";
import tabCommonBg from "@/components/public/commonBg";
import paging from "@/components/public/paging";
import selectCity from "@/components/public/selectCity";
import handleTable from "./table";
import handleTab from "../tab";
import handleDialogTab from "../dialogTab";
export default {
  name: "vehicleCertification",
  data() {
    return {
      provinceAry: [], //省下拉框
      defaultProvinceName: "", //省下拉框默认数据
      cityAry: [], //城市下拉框
      defaultcityName: "", //城市下拉框默认数据
      dialogVisible: true,
      activeName1: "first",
      activeName2: "first",
      dateValue1: "", //日期选择
      dateValue2: "",
      dateValue3: "",
      dateValue4: "",
      slotName: "all",
      ruleForm: {
        UseCharacter: "", //使用性质
        BrandModel: "", //品牌，型号
        VehicleDetection: "", //车辆识别代码
        MotorNumber: "", //发动机号码
        Manufacturer: "" //厂商
      },
      rules: {},
      page: {
        total: 100, //表格总条数,
        pageArry: [5, 10, 15], //下拉框-每页的条数选择
        currentPageSize: 10, //每页的条数
        currentPage: 1 //目前页码
      },
      tableData: [
        {
          order: "1",
          auditState: "待审核",
          carOwnerName: "刘",
          carOwnerContacts: "12345678901",
          submissionTime: "2017-12-07 9:00",
          plateNumber: "浙C37001",
          vehicleType: "小型汽车",
          VehicleSpecifica: "中型",
          firm: "北京牌",
          model: "",
          auditor: "刘刘刘",
          auditTime: "2017-12-07 9:00",
          operate: "审核"
        },
        {
          order: "2",
          auditState: "待审核",
          carOwnerName: "刘",
          carOwnerContacts: "12345678901",
          submissionTime: "2017-12-07 9:00",
          plateNumber: "浙C37001",
          vehicleType: "小型汽车",
          VehicleSpecifica: "中型",
          firm: "北京牌",
          model: "",
          auditor: "刘刘刘",
          auditTime: "2017-12-07 9:00",
          operate: "审核"
        },
        {
          order: "3",
          auditState: "待审核",
          carOwnerName: "刘",
          carOwnerContacts: "12345678901",
          submissionTime: "2017-12-07 9:00",
          plateNumber: "浙C37001",
          vehicleType: "小型汽车",
          VehicleSpecifica: "中型",
          firm: "北京牌",
          model: "",
          auditor: "刘刘刘",
          auditTime: "2017-12-07 9:00",
          operate: "审核"
        },
        {
          order: "4",
          auditState: "已通过",
          carOwnerName: "刘",
          carOwnerContacts: "12345678901",
          submissionTime: "2017-12-07 9:00",
          plateNumber: "浙C37001",
          vehicleType: "小型汽车",
          VehicleSpecifica: "中型",
          brandVersion: "北京牌",
          auditor: "刘刘刘",
          auditTime: "2017-12-07 9:00",
          operate: "审核"
        },
        {
          order: "5",
          auditState: "已驳回",
          carOwnerName: "刘",
          carOwnerContacts: "12345678901",
          submissionTime: "2017-12-07 9:00",
          plateNumber: "浙C37001",
          vehicleType: "小型汽车",
          VehicleSpecifica: "中型",
          brandVersion: "北京牌",
          auditor: "刘刘刘",
          auditTime: "2017-12-07 9:00",
          operate: "审核"
        }
      ]
    };
  },
  methods: {
    //选中省下拉框
    provinceSelect() {},
    //返回省下拉框数据
    provinceData() {},
    //选中城市下拉框
    citySelect() {},
    //返回城市下拉框数据
    cityData() {},
    //每页目录条数改变时发生
    handleSizeChange(size) {},
    //当前页的页码发生改变时发生
    setCurrentPage(currentPage) {},
    //查询
    handleSearch() {},
    //关闭弹框
    handleClose() {
      this.dialogVisible = false;
    },
    //弹框取消按钮
    handleCancle() {
      this.dialogVisible = false;
    },
    //弹框确定按钮
    handleConfirm() {
      this.dialogVisible = false;
    },
    //tab组件传回选中的tab
    changeTab(activeName) {
      this.slotName = activeName;
    },
    //弹框中的tab组件传回选中的tab
    changeDialogTab(activeName) {
      //console.log(activeName);
    },
    //table组件当选中审查时发生弹框的联动，弹框显示
    changeVisible() {
      this.dialogVisible = true;
    }
  },
  components: {
    addressSelect,
    tabCommonBg,
    paging,
    selectCity,
    handleTable,
    handleTab,
    handleDialogTab
  }
};
</script>
<style lang="scss">
@import "../../../assets/style/user/vehicleCertification.scss";
</style>
