<template>
  <tab-common-bg>
    <div id="RegisteredUser" class="user-common">
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
export default {
  name: "RegisteredUser",
  data() {
    return {
      dateValue1: "", //日期选择
      dateValue2: "",
      page: {
        total: 100, //表格总条数,
        pageArry: [5, 10, 15], //下拉框-每页的条数选择
        currentPageSize: 10, //每页的条数
        currentPage: 1 //目前页码
      },
      slotName: "all",
      tableData: [
        {
          order: "1",
          phoneNumber: "12222222222",
          authenticaName: "刘",
          userStatus: "已启用",
          identityAuthentica: "司机",
          registrateTime: "2017-1-1",
          registrateSource: "司机端",
          operate: "审核"
        },
        {
          order: "1",
          phoneNumber: "12222222222",
          authenticaName: "刘",
          userStatus: "已启用",
          identityAuthentica: "司机",
          registrateTime: "2017-1-1",
          registrateSource: "司机端",
          operate: "审核"
        },
        {
          order: "1",
          phoneNumber: "12222222222",
          authenticaName: "刘",
          userStatus: "已启用",
          identityAuthentica: "司机",
          registrateTime: "2017-1-1",
          registrateSource: "司机端",
          operate: "审核"
        },
        {
          order: "1",
          phoneNumber: "12222222222",
          authenticaName: "刘",
          userStatus: "已启用",
          identityAuthentica: "司机",
          registrateTime: "2017-1-1",
          registrateSource: "司机端",
          operate: "审核"
        },
        {
          order: "1",
          phoneNumber: "12222222222",
          authenticaName: "刘",
          userStatus: "已启用",
          identityAuthentica: "司机",
          registrateTime: "2017-1-1",
          registrateSource: "司机端",
          operate: "审核"
        }
      ]
    };
  },
  methods: {
    handleSizeChange(size) {},
    //当前页的页码发生改变时发生
    setCurrentPage(currentPage) {},
    //查询
    handleSearch() {},
    //tab组件传回选中的tab
    changeTab(activeName) {
      this.slotName = activeName;
    }
  },
  components: {
    addressSelect,
    tabCommonBg,
    paging,
    selectCity,
    handleTable,
    handleTab
  }
};
</script>
<style lang="scss">
@import "../../../assets/style/user/vehicleCertification.scss";
</style>
