<template>
  <div id='vehicleType'>
    <tab-common-bg>
        <div class='v-value' >
            <el-button type="primary" @click='newData'>添加</el-button>
            <table class='first-table'>
              <thead>
                  <tr class='table-title'>
                      <th rowspan="2">序号</th>
                      <th rowspan="2">车型名称</th>
                      <th colspan="5">统一车型分类</th>
                      <th rowspan="2">关联车型</th>
                      <th rowspan="2">驾照等级</th>
                      <th rowspan="2">操作</th>
                  </tr>
                  <tr class='table-title-two'>
                      <th>车型</th>
                      <th>类型</th>
                      <th>长 × 宽 × 高</th>
                      <th>载货质量</th>
                      <th>载货体积</th>
                  </tr>
              </thead>
              <tbody>
                  <tr class='table-list' v-for="(item,index) in dataTable" :key='index'>
                      <td >{{item.number}}</td>
                      <td >{{item.fcarName}}</td>
                      <td >{{item.fcarSpec}}</td>
                      <td >{{item.fcarType}}</td>
                      <td >{{item.size}}</td>
                      <td >{{item.fratedLoad}}</td>
                      <td >{{item.fratedVolume}}</td>
                      <td >
                        <tr v-for="(items,index) in dataTable[index].resCarSpecGradeNames" :key='index' class='list-data-ary'>
                          <td>{{items.tCarSpecRelationList.fcarSpecSection}}</td>
                        </tr>
                      </td>
                      <td >
                        <tr v-for="(items,index) in dataTable[index].resCarSpecGradeNames" :key='index' class='list-data-ary'>
                          <td>{{items.tLicenseGradeName.flicenseGradeName}}</td>
                        </tr>
                      </td>
                      <td>
                        <el-button type="primary" icon="edit" @click='editConfig(index)'></el-button>
                        <el-button type="primary" icon="delete" @click='delDate(index)'></el-button>
                      </td>
                  </tr>
              </tbody>
            </table>
        </div>
        <div class='v-dialog'>
          <com-dialog 
          :showDialog='showDialog'
          @saveConfig='saveConfig'
          @closeDialog='closeDialog'
          title='车辆类型配置'
          >
              <el-form :model="form">
                  <el-form-item label="车型名称" :label-width="formLabelWidth">
                    <com-input 
                      :inputValue='form.fcarName' 
                      :error='false' 
                      errorPropt='' 
                      @setValue='getValue' 
                      ref='fcarName'>
                    </com-input>
                  </el-form-item>
                  <el-form-item label="车辆规格" :label-width="formLabelWidth">
                    <com-input 
                      :inputValue='form.fcarSpec' 
                      :error='false' 
                      errorPropt='' 
                      @setValue='getValue' 
                      ref='fcarSpec'>
                    </com-input>
                  </el-form-item>
                  <el-form-item label="载货质量" :label-width="formLabelWidth">
                    <com-input 
                      :inputValue='form.fratedLoad' 
                      :error='false' 
                      errorPropt='' 
                      @setValue='getValue' 
                      ref='fratedLoad'>
                    </com-input>
                  </el-form-item>
                  <el-form-item label="载货体积" :label-width="formLabelWidth">
                    <com-input 
                      :inputValue='form.fratedVolume' 
                      :error='false' 
                      errorPropt='请输入正确的数字!' 
                      @setValue='getValue' 
                      ref='fratedVolume'>
                    </com-input>
                  </el-form-item>
                  <el-form-item label="长*宽*高" :label-width="formLabelWidth">
                    <div class='v-dialog-input'>
                      <com-input 
                        :inputValue='form.flength' 
                        :error='errorAry[0].error'
                        :errorPropt='errorAry[0].errorPropt'
                        @setValue='getValue' 
                        ref='flength'
                        defaultName='长'>
                      </com-input>
                      *
                      <com-input 
                        :inputValue='form.fwidth' 
                        :error='errorAry[1].error' 
                        :errorPropt='errorAry[1].errorPropt'
                        @setValue='getValue' 
                        ref='fwidth'
                        defaultName='宽'
                        >
                      </com-input>
                      *
                      <com-input 
                        :inputValue='form.fheight' 
                        :error='errorAry[2].error' 
                        :errorPropt='errorAry[2].errorPropt'
                        @setValue='getValue' 
                        ref='fheight'
                        defaultName='高'>
                      </com-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="车辆类型" :label-width="formLabelWidth">
                    <el-select v-model="form.fcarType" placeholder="请选择车辆类型">
                      <el-option label="高栏" value="高栏"></el-option>
                      <el-option label="中栏" value="中栏"></el-option>
                    </el-select>
                  </el-form-item>
                  <div class='add-new-car' 
                  v-for="(item, index) in resCarSpecGradeNames"
                  :key='index'>
                      <el-form-item label="关联车型" :label-width="formLabelWidth">
                        <el-select v-model="item.tCarSpecRelationList.fcarSpecSection" placeholder="请选关联车型">
                          <el-option label="3.8" value="3.8"></el-option>
                          <el-option label="4.5" value="4.5"></el-option>
                          <el-option label="5.6" value="5.6"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="驾照类型" :label-width="formLabelWidth">
                        <el-select v-model="item.tLicenseGradeName.flicenseGradeName" placeholder="请选择驾照类型">
                          <el-option label="A1" value="A1"></el-option>
                          <el-option label="A2" value="A2"></el-option>
                          <el-option label="A3" value="A3"></el-option>
                          <el-option label="B1" value="B1"></el-option>
                          <el-option label="B2" value="B2"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-button type="primary" icon="delete" v-if='index !=0 && index !=1' @click='delCarList(index)'></el-button>
                  </div>
                  <el-button type="primary" @click='addCarlist'>
                      <i class='el-icon-plus'></i>
                  </el-button>
              </el-form>
          </com-dialog>
        </div>
        <!-- <paging v-if='dataTable.length !== 0'
          :pageArry='dataTable.length > 10 && dataTable.length < 15 ? [10,15] : dataTable.length >= 15 ? [10,15,20] : [10]'
          @handleSizeChange='getTitle'
          @setCurrentPage='getCurrentPage'
          :total='dataTable.length'
          :currentPageSize='pageNumber'
          :currentPage='currentPage'
          >
        </paging> -->
    </tab-common-bg>
  </div>
</template>

<script>
import paging from '@/components/public/paging'
import tabCommonBg from '@/components/public/commonBg'
import comDialog from '@/components/public/dialog'
import comInput from '@/components/public/comInput'
import {checkDecimal, simpleClone, deepClone} from '@/common/common.js'
import * as requset from '../interface'
export default {
  created () {
    this.searchFleet();
  },
  data () {
    return {
      showDialog:false,
      formLabelWidth: '120px',
      pageNumber:10,
      currentPage:1,
      selectIndex:'',
      form: {
          fcarName: '',
          fcarSpec: '',
          fcarType:'',
          fratedLoad:'',
          fratedVolume:'',
          flength:'',
          fwidth:'',
          fheight:'',
          resCarSpecGradeNames:[]
      },
      resCarSpecGradeNames:[],
      total:325,
      dataTable:[],
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
    //获取分页总数
    getTitle(num){
      this.pageNumber = num;
    },
    //获取当前页面
    getCurrentPage(titleNumber){
      console.log(titleNumber)
    },
    //确定
    saveConfig(){
      let data = {}
      let requsets
      console.log(this.selectIndex)
      //是否编辑
      if(this.selectIndex === ''){
        requsets = requset.ADD_FLEET_CONFIG;
        data ={
          tCarType:this.form,
          reqCarSpecGradeNames:this.resCarSpecGradeNames
        }
      }else{
        requsets = requset.UPDATA_FLEET_CONFIG;
        data ={
          tCarType:this.form,
          reqCarSpecGradeNames:this.resCarSpecGradeNames
        }
      }
      console.log(data);
      this.$http.post(requsets, data).then( res => {
          if(res.data.success) {
            this.searchFleet();
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.showDialog = false;
          }
        }).catch( error => {
            console.log(error)
        })
    },
    //编辑
    editConfig(index){
      this.selectIndex = index;
      this.form = this.dataTable[index];
      let ary = this.dataTable[index].resCarSpecGradeNames;
      this.resCarSpecGradeNames = [];
      for(let obj of ary){
        this.resCarSpecGradeNames.push(simpleClone(obj));
      }
      console.log(this.resCarSpecGradeNames)
      let size = this.form.size.split('x');
      let [s, w, h] = [size[0],size[1],size[2]];
      this.form.flength = s;
      this.form.fwidth = w;
      this.form.fheight = h;
      this.showDialog = true;
    },
    //删除表单
    delDate(index){
      let data ={
        tCarType:{
          fid:this.dataTable[index].fid
        }
      }
      this.$http.post(requset.DELETE_FLEET_CONFIG, data).then( res => {
          if(res.data.success) {
            this.searchFleet();
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          }
      }).catch( error => {
            console.log(error)
      })
    },
    //添加
    newData(){
      this.form = {
          fcarName: '',
          fcarSpec: '',
          fcarType:'',
          fratedLoad:'',
          fratedVolume:'',
          flength:'',
          fwidth:'',
          fheight:'',
          resCarSpecGradeNames:[]
      }
      for(let obj of this.errorAry){
          obj.error = false;
      }
      let tCarSpecRelationList={
        fcarSpecSection:''
      }
      let tLicenseGradeName ={
        flicenseGradeName:''
      }
      this.resCarSpecGradeNames=[
      {'tCarSpecRelationList':simpleClone(tCarSpecRelationList), 'tLicenseGradeName':simpleClone(tLicenseGradeName)},
      {'tCarSpecRelationList':simpleClone(tCarSpecRelationList), 'tLicenseGradeName':simpleClone(tLicenseGradeName)}];
      this.showDialog = true;
      this.selectIndex = '';
    },
    //关闭dialog
    closeDialog(){
      this.showDialog = false;
    },
    //获取输入框表单的值
    getValue(){
      let ref = this.$refs;
      this.form = {
          fcarName: ref.fcarName.input,
          fcarSpec: ref.fcarSpec.input,
          fcarType: this.form.fcarType,
          fratedLoad:ref.fratedLoad.input,
          fratedVolume:ref.fratedVolume.input,
          flength:ref.flength.input,
          fwidth:ref.fwidth.input,
          fheight:ref.fheight.input,
          size:`${ref.flength.input} x ${ref.fwidth.input} x ${ref.fheight.input}`
      }
      // this.errorAry[0].error = checkDecimal(ref.s.input, 10, true);
      // this.errorAry[1].error = checkDecimal(ref.w.input, 10, true);
      // this.errorAry[2].error = checkDecimal(ref.h.input, 10, true);
    },
    //添加车型，驾照类型列表
    addCarlist(){
      if(this.resCarSpecGradeNames.length > 5){
        return
      }
      let tCarSpecRelationList={
        fcarSpecSection:''
      }
      let tLicenseGradeName ={
        flicenseGradeName:''
      }
      this.resCarSpecGradeNames.push(
      {'tCarSpecRelationList':simpleClone(tCarSpecRelationList), 
      'tLicenseGradeName':simpleClone(tLicenseGradeName)})
    },
    //删除车型，驾照类型列表
    delCarList(index){
      this.resCarSpecGradeNames.splice(index, 1);
    },
    //查询列表
    searchFleet(){
      this.$http.post(requset.SEARCH_FLEET_CONFIG).then( res => {
        if(res.data.success) {
          this.dataTable = [];
          for(let [key,data] of res.data.data.entries()){
            data.tCarType.resCarSpecGradeNames = data.resCarSpecGradeNames;
            data.tCarType.number = key + 1;
            data.tCarType.size = `${data.tCarType.flength} x ${data.tCarType.fwidth} x ${data.tCarType.fheight}`
            this.dataTable.push(data.tCarType);
          }
        }
      }).catch( error => {
          console.log(error)
      })
    }
  },
  components: {
    tabCommonBg,
    paging,
    comDialog,
    comInput
  }
}
</script>
