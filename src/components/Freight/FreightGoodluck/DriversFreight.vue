<template>
  <div id='drivertariff'>
    
          <div class='fleet-value'>
              <select-city></select-city>
              <div class='carSelect'>
                <com-select
                textName='车辆规格'
                :region='carSizeList'
                @getSelect='getSelect'
                ></com-select>
              </div>
              <div class='carDriver'>
                <el-button type="primary" @click='newfleet'>查询</el-button>
              </div>
              <div class='driver-table'>
                <div class="page">
                <paging 
                  :pageArry='[4]'
                  @handleSizeChange='getTitle'
                  @setCurrentPage='getCurrentPage'
                  :total='total'
                  :currentPageSize='80'
                  :currentPage='2'
                  >
                </paging>
                </div>
                <template>
                  <el-table
                    :data="deiverFreight"
                    height="580"
                   >
                    <el-table-column prop="number" label="序号" >
                    </el-table-column>
                    <el-table-column prop="carSize" label="车辆规格" >
                    </el-table-column>
                    <el-table-column prop="initialMile" label="起步里程（元）">
                    </el-table-column>
                    <el-table-column prop="startPrice" label="起步价（元）" >
                    </el-table-column>
                    <el-table-column prop="exceedPrice" width="130" label="超出里程收费（/公里）">
                    </el-table-column>
                    <el-table-column prop="agencyPrice" label="平台抽成（/公里）">
                    </el-table-column>
                    <el-table-column label="操作" width="260">
                        <template slot-scope="scope" >
                          <el-button size="small" type='primary' @click='editFreight(scope.row)'>编辑</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
          </div>
          <div class='newfleet-dialog'>
            <com-dialog
            :showDialog='showDialog'
            @saveConfig='saveConfig'
            @closeDialog='showDialog = false'
            :title='dialogTitle'>
                <el-form :model="form">
                  <el-form-item label="起步里程:" :label-width="formLabelWidth">
                      <com-input 
                        :inputValue='form.initialMile' 
                        :error='false' 
                        errorPropt='' 
                        @setValue='getValue'
                        :maxlength='10' 
                        ref='initialMile'>
                      </com-input>
                      <i class="unit">(元/公里)</i>
                    </el-form-item>
                    <el-form-item label="起步价" :label-width="formLabelWidth">
                      <com-input 
                        :inputValue='form.startPrice' 
                        :error='false' 
                        errorPropt='' 
                        @setValue='getValue'
                        :maxlength='10' 
                        ref='initialMile'>
                      </com-input>
                      <i class="unit cg1">(元)</i>
                    </el-form-item>
                    <el-form-item label="超出里程收费" :label-width="formLabelWidth">
                      <com-input 
                        :inputValue='form.exceedPrice' 
                        :error='false' 
                        errorPropt='' 
                        @setValue='getValue' 
                        ref='exceedPrice'>
                      </com-input>
                      <i class="unit">(元/公里)</i>
                    </el-form-item>
                    <el-form-item label="平台抽成" :label-width="formLabelWidth">
                      <com-input 
                        :inputValue='form.agencyPrice' 
                        :error='false' 
                        errorPropt='' 
                        @setValue='getValue' 
                        ref='agencyPrice'>
                      </com-input>
                        <i class="unit cg2">(%)</i>
                    </el-form-item>
                </el-form>
            </com-dialog>
        </div>
  </div>
</template>

<script>
import selectCity from "@/components/public/selectCity";
import comDialog from "@/components/public/dialog";
import comInput from "@/components/public/comInput";
import paging from "@/components/public/paging";
import comSelect from "@/components/public/select";
import * as requset from "../interface";
export default {
  created() {
    this.serachFleet();
  },
  data() {
    return {
      showDialog: false,
      addDialog: false,
      formLabelWidth: "120px",
      isEdit: false,
      total:100,
      deiverFreight: [
          {
              number:1,         //序号
              carSize:22,       //车辆规格
              initialMile:10,   //起步里程（元）
              startPrice:200,   //起步价（元）
              exceedPrice:10,   //超出里程收费（/公里）
              agencyPrice:12    //平台抽成
          }
      ],
      carSizeList: [
        {
          value: "1",
          label: "车长2.4M"
        },
        {
          value: "2",
          label: "车辆2"
        },
        {
          value: "3",
          label: "车辆3"
        },
        {
          value: "4",
          label: "车辆3"
        },
        {
          value: "5",
          label: "车辆3"
        },
        {
          value: "6",
          label: "车辆3"
        },
        {
          value: "7",
          label: "车辆3"
        },
        {
          value: "8",
          label: "车辆3"
        }
      ],
      //编辑后的弹窗效果
      form: {
        initialMile: "",
        startPrice: "",
        exceedPrice: "",
        agencyPrice: ""
      },
      dialogTitle: "详细讯息", //*
    };
  },
  methods: {
    //确定方法
    saveConfig() {
      let data = {
        initialMile: this.form.initialMile,
        startPrice: this.form.startPrice,
        exceedPrice: this.form.exceedPrice,
        agencyPrice: this.form.agencyPrice
      };
      this.showDialog=false;
      let request = requset.CREATED_FLEET;
      if (this.isEdit) {
        data.fOperator = "";
        data.fId = this.fid;
        request = requset.EDIT_FLEET;
      }
      this.$http
        .post(request, data)
        .then(res => {
          if (res.data.success) {
            this.serachFleet();
            this.showDialog = false;
            this.$message({
              message: "操作成功",
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取输入框的值
    getValue() {
      let ref = this.$refs;
      this.form.initialMile = ref.initialMile.input;
      this.form.exceedPrice = ref.exceedPrice.input;
      this.form.agencyPrice = ref.agencyPrice.input;
    },
    //车队创建
    newfleet() {

    },
    //编辑运费
    editFreight(row) {
      this.showDialog=true;
      
    },
    //添加操作
    addNewFleet(row) {
      this.addDialog = true;
      this.addfleetName = row.initialMile;
      this.fleetNum = row.fAmount;
      let data = {};
      this.$http
        .post(requset.SEARCH_LIST, data)
        .then(res => {
          if (res.data.success) {
            console.log(res.data.data);
            this.catData = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取车队状态
    getSelect(value) {
      let data = {
        startPrice: "3303",
        fFleetState: value
      };
      this.serachFleet(data);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //解散车队
    deleteFleet(row) {
      let data = {
        fFleet: row.fId
      };
      this.$http
        .post(requset.DELETE_FLEET, data)
        .then(res => {
          if (res.data.success) {
            this.$message({
              message: "解散成功",
              type: "success"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTitle(titleNumber) {
      console.log(titleNumber);
    },
    getCurrentPage(titleNumber) {
      console.log(titleNumber);
    },
    //查询车队
    serachFleet(data) {
      this.$http
        .post(requset.GET_ALL_FLEET, data)
        .then(res => {
          if (res.data.success) {
            this.fleetData = res.data.data;
            for (let [key, data] of this.fleetData.entries()) {
              data.number = key + 1;
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    selectCity,
    comDialog,
    comInput,
    paging,  
    comSelect  
  }
};
</script>
<style lang="scss">
  #drivertariff {
    .fleet-value{
      position: relative;

    }
    .page {
      position: absolute;
      top: 65px;
      right: 34px;
    }
    .fleet-value {
        padding: 30px;
        .carSelect {
            display: inline-block;
        }
        .new-fleet-btn {
            margin-top: 30px;
        }
        .driver-table {
            margin-top: 80px;
        } 
    }
    .carSelect {
            display: inline-block;
        }
    .carDriver {
      display: inline-block;
      margin-left: 30px
    }
    .newfleet-dialog {
      .el-dialog {
        width: 400px;
      }
      .com-input{
         width: 75%;
      }
      .unit {
        position: absolute;
        right: 5px;
        top: 20px;
        transform: translate(0,-50%)
      }
      //位置调整
      .cg1 {
        right: 38px;
      }
      .cg2 {
        right: 40px;
      }
    }
  }

</style>
