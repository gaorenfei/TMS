<template>
  <div id='fleetManage'>
      <tab-common-bg>
          <div class='fleet-value'>
              <select-city></select-city>
              <div class='fleet-type'>
                <com-select
                textName='车队状态'
                :region='options'
                @getSelect='getSelect'
                ></com-select>
              </div>
              <div class='new-fleet-btn'>
                <el-button type="primary" @click='newfleet'>创建车队</el-button>
              </div>
              <div class='fleet-table'>
                <template>
                  <el-table
                    :data="fleetData"
                    height="580"
                   >
                    <el-table-column prop="number" label="序号" >
                    </el-table-column>
                    <el-table-column prop="fFleetName" label="车队名称" >
                    </el-table-column>
                    <el-table-column prop="fCaptainName" label="队长">
                    </el-table-column>
                    <el-table-column prop="fCaptainPhone" label="队长联系方式" >
                    </el-table-column>
                    <el-table-column prop="fAmount" label="车队车辆数">
                    </el-table-column>
                    <el-table-column prop="fAreaId" label="车队运输区域">
                    </el-table-column>
                     <el-table-column prop="fFleetState" label="车队状态" >
                    </el-table-column>
                    <el-table-column prop="fCreationTime" label="创建时间"  >
                    </el-table-column>
                    <el-table-column  prop="address" label="创建人">
                    </el-table-column>
                    <el-table-column label="操作" width="260">
                        <template slot-scope="scope" >
                          <el-button size="small" type='primary'>详情</el-button>
                          <el-button size="small" type='primary' @click='editFleet(scope.row)'>编辑</el-button>
                          <el-button size="small" type='primary' @click='addNewFleet(scope.row)'>添加</el-button>
                          <el-button size="small" type="danger" @click='deleteFleet(scope.row)'>解散</el-button>
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
                      <el-form-item label="车队名称:" :label-width="formLabelWidth">
                          <com-input 
                            :inputValue='form.fFleetName' 
                            :error='false' 
                            errorPropt='' 
                            @setValue='getValue'
                            :maxlength='25' 
                            ref='fFleetName'>
                          </com-input>
                        </el-form-item>
                        <el-form-item label="车队运输区域" :label-width="formLabelWidth">
                              <el-select v-model="form.fAreaId" placeholder="请选区域">
                                <el-option label="3301" value=3301></el-option>
                                <el-option label="3302" value=3302></el-option>
                                <el-option label="3303" value=3303></el-option>
                              </el-select>
                        </el-form-item>
                        <el-form-item label="车队队长:" :label-width="formLabelWidth">
                          <com-input 
                            :inputValue='form.fCaptainName' 
                            :error='false' 
                            errorPropt='' 
                            @setValue='getValue' 
                            ref='fCaptainName'>
                          </com-input>
                        </el-form-item>
                        <el-form-item label="队长联系方式:" :label-width="formLabelWidth">
                          <com-input 
                            :inputValue='form.fCaptainPhone' 
                            :error='false' 
                            errorPropt='' 
                            @setValue='getValue' 
                            ref='fCaptainPhone'>
                          </com-input>
                        </el-form-item>
                </el-form>
            </com-dialog>
          </div>
          <div class='newcar-dialog'>
            <com-dialog
            :showDialog='addDialog'
            @saveConfig='saveConfig'
            @closeDialog='addDialog = false'
            title='添加车辆'>
                  <div class='newcar-title'>
                    <span>车队名称:</span><span>{{addfleetName}}</span>
                    <span>车辆数目:</span><span>{{fleetNum}}</span>
                  </div>
                  <div class='newcar-value'>
                    <div class='newcar-input'>
                      <span>车牌号:</span>
                      <com-input
                      :inputValue='name' 
                      :error='false' 
                      errorPropt='' 
                      @setValue='getValue' >
                      </com-input>
                    </div>
                    <div class='newcar-input'>
                      <span>车主:</span>
                      <com-input
                      :inputValue='name' 
                      :error='false' 
                      errorPropt='' 
                      @setValue='getValue' >
                      </com-input>
                    </div>
                    <div class='newcar-input'>
                      <span>车主联系方式:</span>
                      <com-input
                      :inputValue='name' 
                      :error='false' 
                      errorPropt='' 
                      @setValue='getValue' >
                      </com-input>
                    </div>
                    <div class='newcar-input'>
                      <el-button type="primary" icon="search">查询</el-button>
                    </div>
                    <div class='newCar-tag'>
                      <select-tag 
                      :nameAry='nameAry'
                      >
                      </select-tag>
                    </div>
                    <el-button type="primary">加入车队</el-button>
                    <div class='newCar-table'>
                      <el-table
                        ref="multipleTable"
                        :data="catData"
                        stripe
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                          type="selection"
                          width="55">
                        </el-table-column>
                        <el-table-column
                          label="序号"
                        >
                          <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                          prop="fVehicleType"
                          label="车辆类型"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="fLicensePlate"
                          label="车牌号"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="fVehicleSprcifications"
                          label="车辆规格"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="服务工厂"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="fRatedVolume"
                          label="最大运输体积"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="fRatedLoad"
                          label="最大运输重量"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="fState"
                          label="车辆服务状态"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="address"
                          label="常运输区域"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="fUser"
                          label="司机"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="fUserPhone"
                          label="司机联系方式"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          prop="fUserAddress"
                          label="司机住址"
                          show-overflow-tooltip>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <paging 
                  :pageArry='[4]'
                  @handleSizeChange='getTitle'
                  @setCurrentPage='getCurrentPage'
                  :total='total'
                  :currentPageSize='80'
                  :currentPage='2'
                  >
                  </paging>
            </com-dialog>
          </div>
      </tab-common-bg>
  </div>
</template>

<script>
import tabCommonBg from "@/components/public/commonBg";
import selectCity from "@/components/vehicle/selectCity";
import comDialog from '@/components/public/dialog';
import comInput from '@/components/public/comInput';
import paging from '@/components/public/paging';
import selectTag from '@/components/public/selectTag'
import * as requset from '../request'
import comSelect from "@/components/public/select";
export default {
  created () {
    this.serachFleet();
  },
  data() {
    return {
      showDialog:false,
      addDialog:false,
      formLabelWidth: '120px',
      isEdit:false,
      addfleetName:'',
      fleetNum:'',
      fid:'',
      name:'',
      total:32,
      fleetData: [],
      catData:[],
      options: [
        {
          value: '10',
          label: '全部'
        },
        {
          value: '1',
          label: '启用'
        },{
          value: '0',
          label: '关闭'
        }
      ],
      stateValue: '',
      form: {
          fFleetName: '',
          fAreaId: '',
          fCaptainName:'',
          fCaptainPhone:'',
      },
      dialogTitle:'',
      multipleSelection: [],
      nameAry:[
        {name:'车辆类型',dateAry:[{value:'1234566'},{value:'123457879999'}]},
        {name:'车辆规格',dateAry:[{value:'1234566'},{value:'12345'}]},
        {name:'常运输区域',dateAry:[{value:'1234566'},{value:'1234'}]},
        {name:'车辆规格',dateAry:[{value:'1234566'},{value:'12'}]}
      ]
    }
  },
  methods: {
    //确定方法
    saveConfig(){
      let data = {
        fFleetName: this.form.fFleetName,
        fAreaId: this.form.fAreaId,
        fCaptainName:this.form.fCaptainName,
        fCaptainPhone:this.form.fCaptainPhone,
      }
      let request = requset.CREATED_FLEET;
      if(this.isEdit){
          data.fOperator = '';
          data.fId = this.fid;
          request = requset.EDIT_FLEET;
      }
      this.$http.post(request,data).then( res => {
        if(res.data.success) {
          this.serachFleet();
          this.showDialog = false;
          this.$message({
            message: '操作成功',
            type: 'success'
          });
        }
      }).catch( error => {
          console.log(error)
      })
    },
    //获取输入框的值
    getValue(){
      let ref = this.$refs;
      this.form.fFleetName = ref.fFleetName.input;
      this.form.fCaptainName = ref.fCaptainName.input;
      this.form.fCaptainPhone = ref.fCaptainPhone.input;
    },
    //车队创建
    newfleet(){
      this.form = {
          fFleetName: '',
          fAreaId: '',
          fFleetCaptain:'',
          fCaptainPhone:'',
      }
      this.isEdit = false;
      this.showDialog = true;
      this.dialogTitle = '车队创建';
    },
    //编辑车队信息
    editFleet(row){
      this.isEdit = true;
      this.fid = row.fId;
      this.form.fFleetName = row.fFleetName;
      this.form.fCaptainName = row.fCaptainName;
      this.form.fCaptainPhone = row.fCaptainPhone;
      this.form.fAreaId = row.fAreaId;
      this.showDialog = true;
      this.dialogTitle = '编辑车队信息';
    },
    //添加操作
    addNewFleet(row){
      this.addDialog = true;
      this.addfleetName = row.fFleetName;
      this.fleetNum = row.fAmount;
      let data = {

      }
      this.$http.post(requset.SEARCH_LIST,data).then( res => {
        if(res.data.success) {
          console.log(res.data.data)
          this.catData = res.data.data;
        }
      }).catch( error => {
          console.log(error)
      })
    },
    //获取车队状态
    getSelect(value){
      let data = {
        fAreaId:'3303',
        fFleetState:value
      }
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
    deleteFleet(row){
      let data ={
        fFleet:row.fId
      }
      this.$http.post(requset.DELETE_FLEET,data).then( res => {
        if(res.data.success) {
          this.$message({
            message: '解散成功',
            type: 'success'
          });
        }
      }).catch( error => {
          console.log(error)
      })
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    getTitle(titleNumber){
         console.log(titleNumber)
    },
    getCurrentPage(titleNumber){
         console.log(titleNumber)
    },
    //查询车队
    serachFleet(data){
      this.$http.post(requset.GET_ALL_FLEET,data).then( res => {
        if(res.data.success) {
          this.fleetData = res.data.data;
          for(let [key,data] of this.fleetData.entries()){
              data.number = key + 1;
          }
        }
      }).catch( error => {
          console.log(error)
      })
    }
  },
  components: {
    tabCommonBg,
    selectCity,
    comDialog,
    comInput,
    paging,
    selectTag,
    comSelect
  }
};
</script>
