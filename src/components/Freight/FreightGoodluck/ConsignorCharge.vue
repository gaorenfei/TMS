<template>
    <div id="demo">
        <div class="input">
            <select-city></select-city>
            <div class="carSelect">
              <span>车辆规格：</span>
              <el-select class="width" v-model="carSize" placeholder="请选择">
                <el-option
                v-for="item in carNumber"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
              </el-select>
            </div>
        </div>
        <div class="table">
          <el-table
              :data="mainTableDate"
              height="580"
              >
              <el-table-column prop="number" label="序号" >
              </el-table-column>
              <el-table-column width="120px" prop="valueAdded" label="车辆规格" >
              </el-table-column>
              <el-table-column width="120px" prop="reference" label="接单后免责取消时长">
              </el-table-column>
              <el-table-column width="120px" prop="reference" label="未到提货点扣费规则">
              </el-table-column>
              <el-table-column width="120px" prop="reference" label="未到提货点扣费上限">
              </el-table-column>
              <el-table-column width="120px" prop="reference" label="到达提货点扣费规则">
              </el-table-column>
              <el-table-column width="120px" prop="reference" label="到达提货点扣费上限">
              </el-table-column>
              <el-table-column label="操作" width="260">
                  <template slot-scope="scope" >
                    <el-button size="small" type='primary' @click='buttonEvent(scope.row)'>编辑</el-button>
                  </template>
              </el-table-column>
          </el-table>
        </div>
        <div class="alert">
          <com-dialog
          :showDialog="alertShow"
          @saveConfig="saveConfig"
          @closeDialog="alertShow=false"
          title="收费系数"
          >
      
          <div class="form">
            <el-form label-position="right" label-width="180px" :model="changeData">
              <el-form-item label="车辆规格">
                <span v-text="changeData.ratio"> </span>
              </el-form-item>
               <el-form-item label="接单后免责时长">
                <el-input class='width' v-model="changeData.ratio"></el-input>
                <span class="unit">/小时</span>
              </el-form-item>
               <el-form-item label="未到提货点扣费规则">
                <el-input class='width' v-model="changeData.ratio"></el-input>
                <span class="unit">&nbsp; % </span>
              </el-form-item>
               <el-form-item label="未到提货点扣费上限">
                <el-input class='width' v-model="changeData.ratio"></el-input>
              </el-form-item>
               <el-form-item label="到达提货点扣费规则">
                <el-input class='width' v-model="changeData.ratio"></el-input>
                <span class="unit">&nbsp; % </span>
              </el-form-item>
               <el-form-item label="到达提货点扣费上限">
                <el-input class='width' v-model="changeData.ratio"></el-input>
              </el-form-item>
            </el-form>
          </div>

          </com-dialog>            
        </div>
        <div class="common">
          <div class="page">
            <paging  
              :pageArry='[4]'
              @handleSizeChange='getTitle'
              @setCurrentPage='getCurrentPage'
              :total='page.total'
              :currentPageSize='80'
              :currentPage='2'
              >
            </paging>
          </div>
        </div>
    </div>
</template>
<script>
import * as requset from "../interface";
import selectCity from "@/components/public/selectCity";
import comDialog from "@/components/public/dialog";
import paging from "@/components/public/paging";


export default {
  // 数据
  data() {
    return {
            //input数据
            carSize:1,
            carNumber:[
                { value: '1', label: '1'  },
                { value: '2', label: '2'  },
                { value: '3', label: '3'  },
                { value: '4', label: '4'  },
                { value: '5', label: '5'  },
            ],
            //弹窗出现条件
            alertShow:false,
            //主要数据
            mainTableDate:[
                {
                    number:123,
                    valueAdded:'增值服务名称',
                    reference:'参考区间',
                }
            ],
            // 缓冲的数据 -- 弹框
            changeData:
                {
                    number:123,
                    valueAdded:'增值服务名称',
                    reference1:'参考区间',
                    reference2:'参考区间',
                    ratio:'参考区间',
                }
            ,
            //page数据
            page:{
                total:100,
            }

		};
	},
	methods:{
        //按钮事件
		buttonEvent(row){
			this.alertShow=true
			// console.log(row)
        },
        // 弹窗保存时间
		saveConfig() {
			this.alertShow=false
        },
        //page事件
		getTitle(){

        },
		getCurrentPage(){

		}

	},

  //组件注册
  components: {
		selectCity,
		comDialog,
		paging
  }
};
</script>
<style lang="scss">
#demo {
    padding: 30px;
    position: relative;

    .input{
        padding-bottom: 80px;
        .carSelect {
          display: inline-block;
          margin-right: 70px;
        }
    }
    .table {

    }
    .alert{

      .common-dialog {
        .el-dialog--small {
          width: 460px;
        }
      }


      .form {

        .width {
          width: 200px;
        }
      }
    }
    .common {
      .page {
        position: absolute;
        top: 65px;
        right: 34px;
      }
    }
}
</style>
