<template>
    <div id="demo">
        <div class="input">
            <select-city></select-city>
        </div>
        <div class="table">
          <el-table
              :data="mainTableDate"
              height="580"
              >
              <el-table-column prop="number" label="序号" >
              </el-table-column>
              <el-table-column prop="valueAdded" label="货物类型" >
              </el-table-column>
              <el-table-column prop="reference" label="收费系数">
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
            <el-form label-position="right" label-width="120px" :model="changeData">
              <el-form-item label="货物类型">
                <span v-text="changeData.goodType"></span>
              </el-form-item>
              <el-form-item label="收费系数">
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
    }
    .table {

    }
    .alert{

      .common-dialog {
        .el-dialog--small {
          width: 400px;
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
