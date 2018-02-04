<template>
  <div id='fleetDetails'>
      <tab-common-bg>
          <div class='fleetDetails-value'>
            <select-city></select-city>
            <div class='fleet-type'>
                <span>车队名称:</span>
                <el-select  v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class='fleet-text'>
                <span>车队队长:</span><span>刘嘉玲</span>
                <span>车队队长联系方式:</span><span>18765825125</span>
            </div>
            <div class='fleet-btn'>
                <el-button type="primary">添加车辆</el-button>
                <el-button type="primary">信息编辑</el-button>
            </div>
            <div class='fleet-table'>
                <template>
                  <el-table
                    :data="tableData3"
                    height="490"
                   >
                    <el-table-column prop="date" label="序号" >
                    </el-table-column>
                    <el-table-column prop="name" label="车辆类型" >
                    </el-table-column>
                    <el-table-column prop="address" label="车辆规格">
                    </el-table-column>
                    <el-table-column prop="date" label="车牌号" >
                    </el-table-column>
                    <el-table-column prop="name" label="最大运输体积">
                    </el-table-column>
                    <el-table-column prop="address" label="最大运输重量">
                    </el-table-column>
                     <el-table-column prop="date" label="车队服务状态" >
                    </el-table-column>
                    <el-table-column prop="name" label="车主"  >
                    </el-table-column>
                    <el-table-column  prop="address" label="车主联系方式">
                    </el-table-column>
                    <el-table-column  prop="address" label="常运输区域">
                    </el-table-column>
                    <el-table-column label="操作" width="260">
                        <template slot-scope="scope" >
                          <el-button size="small" type="danger">移出车队</el-button>
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
      </tab-common-bg>
  </div>
</template>

<script>
import tabCommonBg from "@/components/public/commonBg";
import selectCity from "@/components/vehicle/selectCity";
import comDialog from '@/components/public/dialog';
import comInput from '@/components/public/comInput';
import paging from '@/components/public/paging';
export default {
  data() {
    return {
      showDialog:false,
      addDialog:false,
      name:'',
      formLabelWidth: '120px',
      total:25,
      tableData3: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市"
        }
      ],
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
      tableData3: [{
          date: '1',
          name: '漆学龙',
          address: '浙C37001'
        }, {
          date: '1',
          name: '王小虎',
          address: '浙C37001'
        }, {
          date: '1',
          name: '王小虎',
          address: '浙C37001'
        }, {
          date: '1',
          name: '王小虎',
          address: '浙C37001'
        }],
        multipleSelection: []
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
    paging
  }
};
</script>