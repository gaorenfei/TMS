<template>
  <tab-common-bg>
    <table-common-bg>
      <div id="goodluck">
        <div class="address-show">
          <div class="address-show-filter">
            <address-select class="fl"
              textName='省份:'
              :region='regionAry'
              @getSelect='getSelect'
              @getdata="getdata"
              :regionName='defaultName'>
            </address-select>
            <el-button type="primary" class="address-select-btn fr" @click="handleAdd" v-waves>
              <i class='el-icon-edit'></i>
              新增
            </el-button>
          </div>
          <div class="address-show-table">
            <div>
              <handle-table
                :tableDataList="tableDataList"
                :tableThList="tableThList"
                slotName="slotBtn"
                @updateData="updateData"
                v-loading="loading"
              >
              </handle-table>
            </div>
          </div>
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

        <!--弹框-->
        <el-dialog
          title="新增"
          :visible.sync="dialog.visible"
          size="tiny"
          :before-close="handleClose"
          custom-class="dialogStyle"
          >
          <div class="address-select">
            <div class="address-select-header">
              <div class="address-select-province fl">
                <ul class="address-select-provinceList">
                  <li v-for="(item,index) of dialog.ProList" :key="index" :style="{height:proHeight(item.arrLi)}">
                    <div class="fl initial">{{item.initial}}</div>
                    <ul class="fl">
                      <li v-for="(pro,index) of item.arrLi" :key="index" class="fl">
                        <a href="jascript:;" @click="handleProChoosed($event,pro)"
                          :class="[pro.checked?activeClass:'']"
                        >{{pro.provinceName}}</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="address-select-city fl" v-loading="cityLoading">
                <ul class="address-select-cityList" :style="{height:cityHeight}">
                  <li v-for="(city,index) in dialog.cityList" :key="index" class="fl address-select-pro">
                    <a href="jascript:;" @click="handleCityChoosed($event,city.cityCode)" :class="[city.checked?activeClass:'']">{{city.cityName}}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="address-select-footer">
              <div v-for="(item,index) of dialog.choosedArray" :key="index" class="goodluck-tag-box">
                <a href="javascript:;" v-if="item.cities.length>0">{{item.provinceName}}</a>
                <el-tag
                  type="primary"
                  :key="key"
                  v-for="(city,key) of item.cities"
                  :closable="true"
                  :close-transition="false"
                  @close="(tag)=>{handleTagClose(tag,index,key)}"
                  class="goodluck-tag"
                >
                  {{city.cityName}}
                </el-tag>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancle">取 消</el-button>
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </table-common-bg>
  </tab-common-bg>
</template>

<script>
import headers from "@/components/header";
import tabCommonBg from "@/components/public/commonBg";
import tableCommonBg from "../commonTableBg";
import addressSelect from "@/components/public/select";
import paging from "@/components/public/paging";
import handleTable from "../handleTable";
import defaultProList from "./defalutProList";
import setRowSpan from "@/api/setRowSpan";
import waves from "@/directive/waves"; // 水波纹指令
import * as Interface from "../interface";
import proCheckList from "./proCheckList";
export default {
  data() {
    return {
      loading: false,
      cityLoading: false,
      dialog: {
        visible: false, //弹框出现或者隐藏
        choosedPro: "浙江省", //弹框选中的省,
        choosedArray: [], //弹框选中在弹框下方显示的数据
        ProList: [], //弹框所有的省
        cityList: [] //用来展示的所有的市
      },
      page: {
        total: 0, //表格总条数,
        pageArry: [5, 10, 15], //下拉框-每页的条数选择
        currentPageSize: 10, //每页的条数
        currentPage: 1 //目前页码
      },
      activeClass: "activeClass", //弹框联动选中时的样式
      regionAry: [], //省份选择框
      defaultName: "", //下拉框的值
      tableThList: ["省份", "城市", "操作"], //表头
      tableDataList: [] //用来展示的表格列表
    };
  },
  directives: {
    waves
  },
  mounted() {
    //请求全部列表
    this.requestData();
  },
  methods: {
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
      this.$http
        .post(Interface.PAGEFINDCITY, sendObj)
        .then(res => {
          this.dataReduction(res);
        })
        .catch(_ => {
          this.$message({
            message: "服务器数据返回失败!",
            type: "error"
          });
        });
    },
    //整理数据
    dataReduction(res) {
      this.tableDataList = res.data.data.list;
      this.page.total = res.data.data.total;
      this.loading = false;
    },
    //删除后更新数据
    updateData() {
      this.loading = true;
      this.requestData();
    },
    //弹框取消
    handleCancle() {
      this.dialog.visible = false;
    },
    //弹框关闭
    handleClose(done) {
      this.dialog.visible = false;
      this.dialog.choosedArray = [];
    },
    //确认按钮
    handleConfirm() {
      this.dialog.visible = false;
      var arr = [];
      this.dialog.choosedArray.forEach(obj => {
        obj.cities.forEach(city => {
          arr.push({
            fprovinceName: obj.provinceName,
            fprovinceCode: proCheckList[obj.provinceName],
            fcityName: city.cityName,
            fcityCode: city.cityCode
          });
        });
      });
      this.dialog.choosedArray = [];
      arr = {
        areaOpenParams: [...arr]
      };
      this.$http.post(Interface.ADDCITY, arr).then(res => {
        if (res.data.code == 100000) {
          if (arr.areaOpenParams.length) {
            this.$message({
              message: "区域添加成功!",
              type: "success"
            });
            this.loading = true;
            this.requestData();
          }
        } else {
          this.$message({
            message: "区域添加失败!",
            type: "error"
          });
        }
      });
    },
    //弹框选中省
    handleProChoosed(e, pro) {
      this.cityLoading = true;
      this.$http
        .post(Interface.FIND_ALLCITY_BYPROVINCE, {
          name: pro.provinceName,
          code: pro.provinceCode
        })
        .then(res => {
          this.dialog.cityList = res.data.data;
          this.cityLoading = false;
        })
        .catch(_ => {
          this.cityLoading = false;
          this.$message({
            message: "服务器数据返回失败!",
            type: "error"
          });
        });
      for (let item of this.dialog.ProList) {
        for (let pro of item.arrLi) {
          if (pro.checked == true) {
            pro.checked = false;
          }
          if (pro.provinceName == e.target.innerHTML) {
            pro.checked = true;

            this.dialog.choosedPro = pro.provinceName;
          }
        }
      }
    },
    //弹框选中市
    handleCityChoosed(e, cityCode) {
      //添加省
      var exist = this.dialog.choosedArray.some(item => {
        return item.provinceName == this.dialog.choosedPro;
      });
      if (!exist) {
        this.$set(this.dialog.choosedArray, this.dialog.choosedArray.length, {
          provinceName: this.dialog.choosedPro,
          cities: []
        });
      }
      //添加市
      for (let item of this.dialog.choosedArray) {
        if (item.provinceName == this.dialog.choosedPro) {
          var exist = item.cities.some(
            city => city.cityName == e.target.innerHTML
          );
          if (!exist) {
            item.cities.push({ cityName: e.target.innerHTML, cityCode });
          }
        }
      }
      //改变样式
      for (let city of this.dialog.cityList) {
        if (city.checked == true) {
          city.checked = false;
        }
        if (city.cityName == e.target.innerHTML) {
          city.checked = true;
        }
      }
    },
    //添加区域按钮
    handleAdd() {
      this.dialog.visible = true;
      for (let item of this.dialog.ProList) {
        for (let pro of item.arrLi) {
          if (pro.checked == true) {
            pro.checked = false;
          }
          if (pro.provinceName == "浙江省") {
            pro.checked = true;

            this.dialog.choosedPro = "浙江省";
          }
        }
      }
      this.cityLoading = true;
      //给左边默认省份列表赋值
      this.dialog.ProList = defaultProList;
      //弹框默认显示城市
      this.$http
        .post(Interface.FIND_ALLCITY_BYPROVINCE, {
          name: "浙江省",
          code: 33
        })
        .then(res => {
          this.dialog.cityList = res.data.data;
          this.cityLoading = false;
        })
        .catch(_ => {
          this.loading = false;
          this.$message({
            message: "服务器数据返回失败!",
            type: "error"
          });
        });

      //弹框下方默认
      this.dialog.choosedArray = [{ provinceName: "浙江省", cities: [] }];
    },
    //点击下拉框请求数据
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
    proHeight(arr) {
      return Math.ceil(arr.length / 5) * 27 + "px";
    },
    //关闭 tag
    handleTagClose(tag, index, key) {
      this.dialog.choosedArray[index].cities.splice(key, 1);
    }
  },
  computed: {
    //弹框市级的高度,各行高30,分为4列
    cityHeight() {
      return Math.ceil(this.dialog.cityList.length / 3) * 34 + "px";
    }
  },
  watch: {},
  components: {
    tabCommonBg,
    tableCommonBg,
    addressSelect,
    paging,
    handleTable
  }
};
</script>

