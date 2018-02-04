<template>
  <div id="goodsCharge">
     
	<div class="goodsCharge-show">
		<div class="input">
			<select-city></select-city>
		</div>
		<div class="table">
		<el-table
			:data="chargeRatio"
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
						<el-button size="small" type='primary' @click='changeDate(scope.row)'>编辑</el-button>
					</template>
			</el-table-column>
		</el-table>
		</div>
		<div class="alert">
			<!--增值服务修改选择单-->
			<com-dialog
			:showDialog="addShow"
			@saveConfig="saveConfig"
			@closeDialog="addShow=false"
			title="收费系数"
			>
	
			<div class="form">
				<el-form label-position="right" label-width="120px" width="400" :model="changeData">
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
      addShow: false,
      //主要展示渲染数据
      chargeRatio: [
        {
          number: "序号",
          goodType: "abc",
          ratio: "增值服务"
        }
      ],
      // 缓冲的数据
      changeData: {
        number: 123,
        goodType: "货物类型数据",
        ratio: "收费比例"
      },
      //page数据
      page: {
        total: 100
      }
    };
  },
  methods: {
    changeDate(row) {
      this.addShow = true;
      // console.log(row)
    },
    saveConfig() {
      this.addShow = false;
    },
    getTitle() {},
    getCurrentPage() {}
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
//总模块--路由经进来的模块
#goodsCharge {
  // 页面展示模块--嵌套在背景里面
  .goodsCharge-show {
    padding: 30px;
    position: relative;

    .input {
      padding-bottom: 80px;
    }

    .table {
    }
    .common {
      .page {
        position: absolute;
        top: 65px;
        right: 34px;
      }
    }

    .alert {
      .common-dialog {
        .el-dialog--small {
          width: 400px;
        }
      }
      .form {
        .width {
          width: 120px;
        }
      }
    }
  }
}
</style>
