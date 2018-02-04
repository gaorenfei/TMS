<template>
    <div id="driverCharge">
        <div class="input">
            <select-city></select-city>
            <div class="addMore">
              <p>
                接单后免责时间 <span v-text="disclaimerTime"></span>
                <el-button type="primary" class="disclaimerButton" @click="disclaimerButton">编辑</el-button>
                <el-button class="addbutton" type="primary" @click="buttonEvent('false')">新增</el-button>
              </p>
            </div>
        </div>
        <div class="table">
          <el-table
              :data="mainTableDate"
              height="580"
              >
              <el-table-column prop="number" label="序号" >
              </el-table-column>
              <el-table-column prop="valueAdded" label="距离用车时间时长(小时)" >
              </el-table-column>
              <el-table-column prop="valueAdded" label="取消需交违约金" >
              </el-table-column>
              <el-table-column prop="valueAdded" label="需扣除信用分" >
              </el-table-column>
              <el-table-column label="操作" width="260">
                  <template slot-scope="scope" >
                    <el-button size="small" type='primary' @click='buttonEvent(scope.row)'>编辑</el-button>
                    <el-button size="small" type='primary' @click='buttonEvent(scope.row)'>删除</el-button>
                  </template>
              </el-table-column>
          </el-table>
        </div>
        <div class="alert">
          <div class="date">
            <com-dialog
            :showDialog="alertShow"
            @saveConfig="saveConfig"
            @closeDialog="alertShow=false"
            title="超时收费标准"
            >
        
            <div class="form">
              <el-form label-position="right" label-width="140px" :model="changeData">
                <el-form-item label="距离用车时长">
                  <el-input class='width' v-model="changeData.ratio"></el-input>
                  <span class="unit">/小时</span>
                </el-form-item>
                <el-form-item label="取消违约金">
                  <el-input class='width' v-model="changeData.ratio"></el-input>
                </el-form-item>
                <el-form-item label="扣除信用分">
                  <el-input class='width' v-model="changeData.ratio"></el-input>
                </el-form-item>                
              </el-form>
            </div>

            </com-dialog>    
          </div>
          <div class="disclaimer">
            <com-dialog
            :showDialog="disclaimerShow"
            @saveConfig="saveConfig"
            @closeDialog="disclaimerShow=false"
            title="免责时长编辑"
            >
        
            <div class="form">
              <el-form label-position="right" label-width="140px" :model="changeData">
                <el-form-item label="免责时长编辑">
                   <el-input class='width' v-model="changeData.ratio"></el-input>
                   <span class="unit">/小时</span>
                </el-form-item>
              </el-form>
            </div>

            </com-dialog>                
          </div>
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
      disclaimerShow:false,
      //主要数据
      disclaimerTime:'5分钟',
    
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
    //免责时间按钮
    disclaimerButton () {
      this.disclaimerShow=true
    },
        //按钮事件
		buttonEvent(row){
			this.alertShow=true
			// console.log(row)
        },
        // 弹窗保存时间
		saveConfig() {
      this.alertShow=false
      
      this.disclaimerShow=false
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
#driverCharge {
    padding: 30px;
    position: relative;

    .input{
        padding-bottom: 30px;

        .addMore {
          position: relative;
          margin-top: 20px;
          margin-bottom: 39px;
          .addbutton {
            position: absolute;
            right: 50px;
          }
          .disclaimerButton {
            margin-left: 10px;
          }
        }
    }
    .table {

    }
    .alert{

      .common-dialog {
        .el-dialog--small {
          width: 400px;
        }
      }

      .date {

      }
      .disclaimer {

      }
      .form {

        .width {
          width: 200px;
        }
        .unit {
          position: absolute;
          right: 20px;
          top: 0;
          transform: translate(0,0)
        }
      }
    }
    .common {
      .page {
        position: absolute;
        top: 110px;
        right: 34px;
      }
    }
}
</style>
