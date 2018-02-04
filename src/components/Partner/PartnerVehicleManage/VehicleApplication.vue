<template>
  <div id="consignor">
      
         <div class="consignor-show">
           <div class="consignor-input">
            <!-- Element组件Select 选择器 -->
            <div class="block">
              <span class="text"> 状态: </span>  
              <el-select v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </div>
            <!-- Element组件DatePicker 日期选择器 -->
            <div class="block">
                <span class="text">时间</span>
                <el-date-picker
                v-model="value7"
                type="daterange"
                align="right"
                placeholder="选择日期范围"
                :picker-options="pickerOptions2">
                </el-date-picker>
           </div>
           <el-button type="primary" class="text"> 查 询 </el-button>
           </div>

           <!-- 新增车队弹出表单 -->
            <div>
                
                <div class='consignor-input'>
                <el-button type="primary" @click="adddialogFormVisible = true">新增用车计划申请</el-button>
                </div>
                
                <el-dialog title="新增用车计划" :visible.sync="adddialogFormVisible">
                <el-form :model="addform">
                    <!-- 此处应为循环遍历 -->
                    <el-form-item label="2.5m (俩)" :label-width="addformLabelWidth">
                    <el-input v-model="addform.name" auto-complete="off" style="width:300px"></el-input>
                    </el-form-item>
                     <el-form-item label="4.2m (俩)" :label-width="addformLabelWidth">
                    <el-input v-model="addform.name" auto-complete="off" style="width:300px"></el-input>
                    </el-form-item>
                     <el-form-item label="6.8m (俩)" :label-width="addformLabelWidth">
                    <el-input v-model="addform.name" auto-complete="off" style="width:300px"></el-input>
                    </el-form-item>
                </el-form>
                

                <div slot="footer" class="dialog-footer">
                    <el-button @click="adddialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="adddialogFormVisible = false">确 定</el-button>
                </div>
                </el-dialog>
            </div>

             <!-- 修改车队弹出表单 -->
            <div>
                
                <el-dialog title="修改用车计划" :visible.sync="editdialogFormVisible">
                <el-form :model="editform">
                    <!-- 此处应为循环遍历 -->
                    <el-form-item label="2.5m (俩)" :label-width="editformLabelWidth">
                    <el-input v-model="editform.name" auto-complete="off" style="width:300px"></el-input>
                    </el-form-item>
                     <el-form-item label="4.2m (俩)" :label-width="editformLabelWidth">
                    <el-input v-model="editform.name" auto-complete="off" style="width:300px"></el-input>
                    </el-form-item>
                     <el-form-item label="6.8m (俩)" :label-width="editformLabelWidth">
                    <el-input v-model="editform.name" auto-complete="off" style="width:300px"></el-input>
                    </el-form-item>
                </el-form>
                

                <div slot="footer" class="dialog-footer">
                    <el-button @click="editdialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editdialogFormVisible = false">确 定</el-button>
                </div>
                </el-dialog>
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
                    prop="applicationnum"
                    label="用车计划申请编号"
                    width="150">
                    </el-table-column>
                    <el-table-column
                    prop="createtime"
                    label="创建时间"
                    width="160">
                    </el-table-column>
                    <el-table-column
                    prop="usetime"
                    label="用车时间"
                    width="110">
                    </el-table-column>
                    <el-table-column
                    prop="plannum"
                    label="计划用车数"
                    width="110">
                    </el-table-column>
                    <el-table-column
                    prop="freenumber"
                    label="常驻可用车辆数"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="requirednum"
                    label="还需调入车辆数"
                    width="140">
                    </el-table-column>
                    <el-table-column
                    prop="ableout"
                    label="可调出车辆数"
                    width="130">
                    </el-table-column>
                    <el-table-column
                    prop="status"
                    label="状态"
                    width="80">
                    </el-table-column>
                    <el-table-column
                    prop="handletime"
                    label="处理时间"
                    width="160">
                    </el-table-column>
                    <el-table-column
                    prop="operator"
                    label="操作人"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                        <template scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small"  @click="editdialogFormVisible = true">编辑</el-button>
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
          label: "全部"
        },
        {
          value: "1",
          label: "启用"
        },
        {
          value: "0",
          label: "关闭"
        }
      ],
      value: "",
      //日期区间
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value6: "",
      value7: "",
      //表格假数据
      tableData: [
        {
          serialnum: 1,
          applicationnum: "A20170919001",
          createtime: "2017/09/18 12:32",
          usetime: "2017/9/19",
          plannum: 20,
          freenumber: 18,
          requirednum: 4,
          ableout: 2,
          status: "待调配",
          handletime: "2017/09/24 12:30",
          operator: "詹姆斯-哈登"
        },
        {
          serialnum: 1,
          applicationnum: "A20170919001",
          createtime: "2017/09/18 12:32",
          usetime: "2017/9/19",
          plannum: 20,
          freenumber: 18,
          requirednum: 4,
          ableout: 2,
          status: "待调配",
          handletime: "2017/09/24 12:30",
          operator: "詹姆斯-哈登"
        },
        {
          serialnum: 1,
          applicationnum: "A20170919001",
          createtime: "2017/09/18 12:32",
          usetime: "2017/9/19",
          plannum: 20,
          freenumber: 18,
          requirednum: 4,
          ableout: 2,
          status: "待调配",
          handletime: "2017/09/24 12:30",
          operator: "詹姆斯-哈登"
        },
        {
          serialnum: 1,
          applicationnum: "A20170919001",
          createtime: "2017/09/18 12:32",
          usetime: "2017/9/19",
          plannum: 20,
          freenumber: 18,
          requirednum: 4,
          ableout: 2,
          status: "待调配",
          handletime: "2017/09/24 12:30",
          operator: "詹姆斯-哈登"
        },
        {
          serialnum: 1,
          applicationnum: "A20170919001",
          createtime: "2017/09/18 12:32",
          usetime: "2017/9/19",
          plannum: 20,
          freenumber: 18,
          requirednum: 4,
          ableout: 2,
          status: "待调配",
          handletime: "2017/09/24 12:30",
          operator: "詹姆斯-哈登"
        },
        {
          serialnum: 1,
          applicationnum: "A20170919001",
          createtime: "2017/09/18 12:32",
          usetime: "2017/9/19",
          plannum: 20,
          freenumber: 18,
          requirednum: 4,
          ableout: 2,
          status: "待调配",
          handletime: "2017/09/24 12:30",
          operator: "詹姆斯-哈登"
        },
        {
          serialnum: 1,
          applicationnum: "A20170919001",
          createtime: "2017/09/18 12:32",
          usetime: "2017/9/19",
          plannum: 20,
          freenumber: 18,
          requirednum: 4,
          ableout: 2,
          status: "待调配",
          handletime: "2017/09/24 12:30",
          operator: "詹姆斯-哈登"
        },
        {
          serialnum: 1,
          applicationnum: "A20170919001",
          createtime: "2017/09/18 12:32",
          usetime: "2017/9/19",
          plannum: 20,
          freenumber: 18,
          requirednum: 4,
          ableout: 2,
          status: "待调配",
          handletime: "2017/09/24 12:30",
          operator: "詹姆斯-哈登"
        }
      ],
      // 新增表单数据
      adddialogFormVisible: false,
      addform: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      addformLabelWidth: "200px",
      //修改表单数据
      editdialogFormVisible: false,
      editform: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      editformLabelWidth: "200px"
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
      console.log("submit!");
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
  .consignor-input {
    // margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
  }
}
</style>