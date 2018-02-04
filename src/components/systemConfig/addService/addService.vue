<template>
  <tab-common-bg>
    <table-common-bg>
      <div id='addService'
        ref="addService"
      >
          <div class="select-box">
            <address-select class="fl"
              textName='省份:'
              :region='regionAry'
              @getSelect='getSelect'
              @getdata="getdata"
              :regionName='defaultName'>
            </address-select>
          </div>
          <div class="addService-top">
            <handle-table
              :tableDataList="tableDataList"
              :tableThList="tableThList"
              slotName="slotTag"
              custom="服务"
              :exitBtn="false"
              :deleteUrl="deleteUrl"
              :addUrl="addUrl"
              :addList="addList"
              serviceName="附加"
              param1="tAddService"
              param2="fServiceName"
              param3="fAddserviceId"
              @updateData="updateData"
              v-loading="loading"
            >
            </handle-table>
            <paging
              :pageArry='page.pageArry'
              @handleSizeChange='handleSizeChange'
              @setCurrentPage='setCurrentPage'
              :total='page.total'
              :currentPageSize='page.currentPageSize'
              :currentPage='page.currentPage'
              >
            </paging>
          </div>
      </div>
    </table-common-bg>
  </tab-common-bg>
</template>

<script>
import tabCommonBg from "@/components/public/commonBg";
import handleTable from "../handleTable";
import tableCommonBg from "../commonTableBg";
import paging from "@/components/public/paging";
import addressSelect from "@/components/public/select";
import proCheckList from "../goodluck/proCheckList";
import * as Interface from "../interface.js";
export default {
  data() {
    return {
      loading: false,
      tableDataList: [],
      tableThList: ["省份", "城市", "开放", "操作"],
      page: {
        total: 0, //表格总条数,
        pageArry: [5, 10, 15], //下拉框-每页的条数选择
        currentPageSize: 10, //每页的条数
        currentPage: 1 //目前页码
      },
      regionAry: [], //省份选择框
      defaultName: "", //下拉框的值
      deleteUrl: Interface.DELETE_AREA_ADD,
      addUrl: Interface.QUERY_ALL_ADD,
      addList: Interface.ADD_LIST_ADD
    };
  },
  methods: {
    //每页目录条数改变时发生
    handleSizeChange(size) {
      this.loading = true;
      this.page.currentPageSize = size;
      this.requestData();
    },
    //当前页的页码发生改变时发生
    setCurrentPage(currentPage) {
      this.loading = true;
      this.page.currentPage = currentPage;
      this.requestData();
    },
    //添加服务后重新更新页面数据
    updateData() {
      this.loading = true;
      this.requestData();
    },
    //请求数据
    requestData() {
      var sendObj;
      if (this.defaultName != "全部" && this.defaultName) {
        sendObj = {
          condition: {
            fprovinceName: this.defaultName,
            fprovinceCode: proCheckList[this.defaultName]
          },
          page: this.page.currentPage,
          itemsPerPage: this.page.currentPageSize
        };
      } else {
        sendObj = {
          condition: {},
          page: this.page.currentPage,
          itemsPerPage: this.page.currentPageSize
        };
      }
      this.joinData(sendObj);
    },
    //点击下拉框
    getdata(isOpen) {
      if (isOpen) {
        this.$http
          .post(Interface.GET_ALL_OPEN_PROVINCE)
          .then(res => {
            if (res.data.code == 100000) {
              res.data.data.forEach((item, index) => {
                this.regionAry.push({
                  label: item.provinceName,
                  value: item.provinceName
                });
              });
              this.regionAry.unshift({ label: "全部", value: "全部" });
            }
          })
          .catch(_ => {
            this.regionAry.push({ label: "无数据返回", value: "无数据返回" });
          });
      } else {
        this.regionAry = [];
      }
    },
    //下拉框选中省份
    getSelect(province) {
      this.loading = true;
      this.defaultName = province;
      this.requestData();
    },
    //两个接口拼接数据
    joinData(arr) {
      var sendArr = [];
      var tableSource = [];
      this.$http
        .post(Interface.PAGEFINDCITY, arr)
        .then(res => {
          this.page.total = res.data.data.total;
          tableSource = res.data.data.list;
          tableSource.forEach(item => {
            sendArr.push(item.fid);
          });
          sendArr = {
            fAreaId: [...sendArr]
          };
          this.$http.post(Interface.QUERYADD, sendArr).then(res2 => {
            Object.keys(res2.data.data).forEach((item, index) => {
              tableSource[index].fService = res2.data.data[item].ll;
            });
            this.tableDataList = tableSource;
            this.loading = false;
          });
        })
        .catch(_ => {
          this.$message({
            message: "服务器数据返回失败!",
            type: "error"
          });
        });
    }
  },
  mounted() {
    var arr = {
      page: this.page.currentPage,
      itemsPerPage: this.page.currentPageSize
    };
    this.joinData(arr);
  },
  components: {
    tabCommonBg,
    handleTable,
    tableCommonBg,
    addressSelect,
    paging
  }
};
</script>
<style>

</style>


