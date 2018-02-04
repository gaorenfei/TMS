<template>
  <div id='contractFleet'>
      <tab-common-bg>
          <div class='contractFleet-value'>
            <select-city></select-city>
            <div class='contractFleet-input'>
                <span>车牌号:</span>
                <com-input
                    :inputValue='name' 
                    @setValue='getValue' >
                </com-input>
            </div>
            <el-button type="primary" icon="search">搜索</el-button>
            <div class='fleet-select'>
                <select-tag 
                    :nameAry='nameAry'
                    :valueAry='valueAry'>
                </select-tag>
            </div>
            <div class='fleet-table'>
                <template>
                  <el-table
                    :data="sinAry"
                    height="450"
                   >
                    <el-table-column prop="date" label="序号" >
                    </el-table-column>
                    <el-table-column prop="name" label="签约状态" >
                    </el-table-column>
                    <el-table-column prop="name" label="车辆类型" >
                    </el-table-column>
                    <el-table-column prop="date" label="车牌号" >
                    </el-table-column>
                    <el-table-column prop="address" label="行驶证号">
                    </el-table-column>
                    <el-table-column prop="name" label="牌照类型">
                    </el-table-column>
                    <el-table-column prop="address" label="车辆规格">
                    </el-table-column>
                     <el-table-column prop="date" label="品牌型号" >
                    </el-table-column>
                    <el-table-column prop="name" label="车主"  >
                    </el-table-column>
                    <el-table-column  prop="address" label="车主联系方式">
                    </el-table-column>
                    <el-table-column  prop="address" label="所属车队">
                    </el-table-column>
                    <el-table-column  prop="address" label="服务工厂">
                    </el-table-column>
                    <el-table-column  prop="address" label="车辆服务状态">
                    </el-table-column>
                    <el-table-column  prop="address" label="司机姓名">
                    </el-table-column>
                    <el-table-column  prop="address" label="司机联系方式">
                    </el-table-column>
                    <el-table-column  prop="address" label="司机住址">
                    </el-table-column>
                    <el-table-column  prop="address" label="常运输区域">
                    </el-table-column>
                    <el-table-column  prop="address" label="启用状态">
                    </el-table-column>
                    <el-table-column  prop="address" label="操作时间">
                    </el-table-column>
                    <el-table-column  prop="address" label="操作人">
                    </el-table-column>
                    <el-table-column label="操作" width="450">
                        <template slot-scope="scope" >
                          <el-button size="small" type="primary">停用</el-button>
                          <el-button size="small" type="primary">解除签约</el-button>
                          <el-button size="small" type="primary">更换司机</el-button>
                          <el-button size="small" type="primary">暂停服务</el-button>
                          <el-button size="small" type="primary" @click='fleetDetail=true'>详情编辑</el-button>
                        </template>
                    </el-table-column>
                  </el-table>
                </template>
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
          </div>
          <div class='fleet-dialog'>
            <com-dialog
                :showDialog='fleetDetail'
                @saveConfig='saveConfig'
                @closeDialog='fleetDetail = false'
                title='车辆档案'>
                    <div class='table-value'>
                        <div class='table-top'>
                            <div class='table-title'>
                                <span>车牌号:</span><span class='table-text-left'>浙C15650</span>
                                <span>车辆类型:</span><span class='table-text-left'>浙C156500</span>
                            </div>
                            <div class='table-title'>
                                <span>车辆规格:</span><span class='table-text-left'>浙C15650122</span>
                                <span>牌照类型:</span><span class='table-text-left'>浙C156503333</span>
                            </div>
                            <div>
                                <span>车辆品牌 型号:</span><span class='table-text-left'>浙C156503333</span>
                            </div>
                        </div>
                        <div class='table-body'>
                            <el-form :model="form">
                                <el-form-item label="外廓尺寸:" :label-width="formLabelWidth">
                                    <div class='table-input'>
                                    <com-input 
                                        :inputValue='form.s' 
                                        :error='errorAry[0].error' 
                                        :errorPropt='errorAry[0].errorPropt'
                                        @setValue='getValue' 
                                        ref='s'
                                        defaultName='长'>
                                    </com-input>
                                    X
                                    <com-input 
                                        :inputValue='form.w' 
                                        :error='errorAry[1].error' 
                                        :errorPropt='errorAry[1].errorPropt'
                                        @setValue='getValue' 
                                        ref='w'
                                        defaultName='宽'
                                        >
                                    </com-input>
                                    X
                                    <com-input 
                                        :inputValue='form.h' 
                                        :error='errorAry[2].error' 
                                        :errorPropt='errorAry[2].errorPropt'
                                        @setValue='getValue' 
                                        ref='h'
                                        defaultName='高'>
                                    </com-input>
                                    </div>
                                </el-form-item>
                                <div class='table-two'>
                                    <el-form-item label="最大运输体积:" :label-width="formLabelWidth">
                                        <com-input 
                                        :inputValue='form.carType' 
                                        :error='false' 
                                        errorPropt='' 
                                        @setValue='getValue' 
                                        ref='carType'>
                                        </com-input>
                                    </el-form-item>
                                    <el-form-item label="最大运输重量:" :label-width="formLabelWidth">
                                        <com-input 
                                        :inputValue='form.carType' 
                                        :error='false' 
                                        errorPropt='' 
                                        @setValue='getValue' 
                                        ref='carType'>
                                        </com-input>
                                    </el-form-item>
                                </div>
                                <div class='table-three'>
                                    <el-form-item label="所属车队:" :label-width="formLabelWidth">
                                        <el-select v-model="form.type" placeholder="请选择车辆类型">
                                        <el-option label="高栏" value="高栏"></el-option>
                                        <el-option label="中栏" value="中栏"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="所属工厂:" :label-width="formLabelWidth">
                                        <el-select v-model="form.type" placeholder="请选择车辆类型">
                                        <el-option label="高栏" value="高栏"></el-option>
                                        <el-option label="中栏" value="中栏"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div class='table-four'>
                                    <span>司机:</span><span>刘明明</span>
                                    <span>司机联系方式:</span><span>187564546464</span>
                                </div>
                                <div class='table-five'>
                                    <el-form-item label="司机地址:" :label-width="formLabelWidth">
                                        <com-input 
                                        :inputValue='form.carType' 
                                        :error='false' 
                                        errorPropt='' 
                                        @setValue='getValue' 
                                        ref='carType'>
                                        </com-input>
                                    </el-form-item>
                                </div>
                                <div class='table-six'>
                                    <span>车主:</span><span>刘明明</span>
                                    <span>车主联系方式:</span><span>187564546464</span>
                                </div>
                                <div class='table-two'>
                                    <el-form-item label="年龄:" :label-width="formLabelWidth">
                                        <com-input 
                                        :inputValue='form.carType' 
                                        :error='false' 
                                        errorPropt='' 
                                        @setValue='getValue' 
                                        ref='carType'>
                                        </com-input>
                                    </el-form-item>
                                    <el-form-item label="车辆颜色:" :label-width="formLabelWidth">
                                        <com-input 
                                        :inputValue='form.carType' 
                                        :error='false' 
                                        errorPropt='' 
                                        @setValue='getValue' 
                                        ref='carType'>
                                        </com-input>
                                    </el-form-item>
                                </div>
                                <div class='table-three'>
                                    <el-form-item label="车辆保险:" :label-width="formLabelWidth">
                                        <el-select v-model="form.type" placeholder="请选择车辆类型">
                                        <el-option label="高栏" value="高栏"></el-option>
                                        <el-option label="中栏" value="中栏"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="常运输区域:" :label-width="formLabelWidth">
                                        <el-select v-model="form.type" placeholder="请选择车辆类型">
                                        <el-option label="高栏" value="高栏"></el-option>
                                        <el-option label="中栏" value="中栏"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-form>
                        </div>
                    </div>
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
export default {
  props:['nameAry', 'valueAry', 'sinAry'],
  data() {
    return {
        fleetDetail:false,
        name:'',
        formLabelWidth: '120px',
        total:25,
        options: [{
            value: '选项1',
            label: '黄金糕'
            }, {
            value: '选项2',
            label: '双皮奶'
            }, {
            value: '选项3',
            label: '蚵仔煎'
            }, {
            value: '选项4',
            label: '龙须面'
            }, {
            value: '选项5',
            label: '北京烤鸭'
            }],
            value: '',
            form: {
            name: '',
            carType: '',
            type:'',
            quality:'',
            volume:'',
            s:'',
            w:'',
            h:'',
        },
        dialogTitle:'',
        multipleSelection: [],
        errorAry:[
        {
          error:false,
          errorPropt:'请输入正确的数字',
        },
        {
          error:false,
          errorPropt:'请输入正确的数字',
        },
        {
          error:false,
          errorPropt:'请输入正确的数字',
        }
      ]
    }
  },
  methods: {
    saveConfig(){

    },
    getValue(){

    },
    newfleet(){
      this.showDialog = true;
      this.dialogTitle = '车队创建';
    },
    editFleet(){
      this.showDialog = true;
      this.dialogTitle = '编辑车队信息';
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
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    getTitle(titleNumber){
         console.log(titleNumber)
    },
    getCurrentPage(titleNumber){
         console.log(titleNumber)
    }
  },
  components: {
    tabCommonBg,
    selectCity,
    comDialog,
    comInput,
    paging,
    selectTag
  }
};
</script>