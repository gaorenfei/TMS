<template>
  <div id="AdditionalCharge">
    <div class="AdditionalCharge">
      <div class="input">
        <!-- 输入 -->
    	  <select-city></select-city>
      </div>
      <div class="table">
        <!-- 展示页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 提/卸货点 -->
          <el-tab-pane 
            label="提/卸货点" 
            name="first"
            
          >
            <el-table
              :data="loadedData"
              height="580"
              >
              <el-table-column prop="name" label="状态" >
              </el-table-column>
              <el-table-column prop="chargeStandard" label="收费标准(/个)" >
              </el-table-column>
              <el-table-column prop="startNumber" label="起收点">
              </el-table-column>
              <el-table-column label="操作" width="260">
                  <template slot-scope="scope" >
                    <el-button size="small" type='primary' @click='editDate(scope.row)'>编辑</el-button>
                  </template>
              </el-table-column>
            </el-table>          
          
          </el-tab-pane>
          <el-tab-pane label="超时" name="second">
            <!-- 超时 -->
            <el-table
              :data="loadedData"
              height="580"
              >
              <el-table-column prop="name" label="状态" >
              </el-table-column>
              <el-table-column prop="chargeStandard" label="收费标准(/个)" >
              </el-table-column>
              <el-table-column prop="startNumber" label="起收点">
              </el-table-column>
              <el-table-column label="操作" width="260">
                  <template slot-scope="scope" >
                    <el-button size="small" type='primary' @click='editDate(scope.row)'>编辑</el-button>
                  </template>
              </el-table-column>
            </el-table>                
          </el-tab-pane>
          <el-tab-pane label="过夜" name="third">
            <el-table
              :data="loadedData"
              height="580"
              >
              <el-table-column prop="name" label="状态" >
              </el-table-column>
              <el-table-column prop="chargeStandard" label="收费标准(/个)" >
              </el-table-column>
              <el-table-column prop="startNumber" label="起收点">
              </el-table-column>
              <el-table-column label="操作" width="260">
                  <template slot-scope="scope" >
                    <el-button size="small" type='primary' @click='editDate(scope.row)'>编辑</el-button>
                  </template>
              </el-table-column>
            </el-table>            

          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="alert">
        <!-- 弹框 -->
        <div class="place">
          <com-dialog
          :showDialog="placeshow"
          @saveConfig="saveConfig"
          @closeDialog="placeshow=false"
          title="增值服务"
          >
            <div class="form">
              <el-form label-position="right" label-width="120px" width="400" :model="changeData">
                <el-form-item label="收费标准">
                
                <el-input class='width' v-model="changeData.chargeStandard"></el-input>
                <span class='unit'>/个</span>
                </el-form-item>
                <el-form-item label="起收点">
                    <!-- 输入框形式 -->
                <!-- <el-input class='width' v-model="changeData.startNumber"></el-input> -->
                  <el-select class="width" v-model="changeData.startNumber" placeholder="请选择">
                    <el-option
                      v-for="item in startNumber"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <span class='unit'>个</span>
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
  </div>
</template>

<script>
import selectCity from "@/components/public/selectCity";
import comDialog from "@/components/public/dialog";
import paging from "@/components/public/paging";

export default {
  data() {
    return {
  // 插件数据
      activeName: 'first',

  // 设计数据
      //提卸货点数据
      loadedData :[
        {
            name:'提货',  
            chargeStandard:'50',  //收费标尊
            startNumber:'2'       //起收点
        }
      ],
      placeshow:false, //弹窗
        //二级数据的特殊接口形式
      startNumber:[
      
      
      
      ],
      //超时数据

      //弹窗缓冲数据
      changeData:{
        chargeStandard:'50', 
        startNumber:'2'        
      },
      //page数据
      page: {
        total: 100
      }
    };
  },
  methods: {
    //插件定义
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //page插件
    getTitle() {},
    getCurrentPage(){},
    //place 装卸地点
    saveConfig(input){ //弹窗确认讯息
      this.placeshow=false
      // console.log( )
    
    },
    editDate(row){       //弹窗按钮触发事件
      this.placeshow=true
      // this.changeData.chargeStandard = row.chargeStandard
    },
    editValueAdde() {}
  },
  mounted() {},
  components: {
    selectCity,
    comDialog,
    paging
  }
};
</script>
<style lang='scss'>
#AdditionalCharge{
  .width {
    width: 200px;
  }
  .AdditionalCharge {
    padding: 30px;
    position: relative;

    .input{
      padding-bottom: 40px;
    }
    .table {
      min-height: 580px;
    }
    .alert{
      .common-dialog {
        .el-dialog--small {
          width: 400px;
        }
      }

      // 实际样式
      .place　{

        .form{
          .unit {
            position: absolute;
            right: 5px;
            top: 0%;
            transform: translate(0,-50%)
          }
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
}
</style>

