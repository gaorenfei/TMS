<template>
  <div id="consignor">
     
	<div class="consignor-show">
		<div class="input">
			<select-city></select-city>
		</div>
	<div class="table">
		<el-table
		:data="consignorService"
		height="580"
		>
			<el-table-column prop="number" label="序号" >
			</el-table-column>
			<el-table-column prop="valueAdded" label="增值服务" >
			</el-table-column>
			<el-table-column prop="reference" label="参考区间">
			</el-table-column>
			<el-table-column label="操作" width="260">
				<template slot-scope="scope" >
					<el-button size="small" type='primary' @click='editValue(scope.row)'>编辑</el-button>
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
			title="增值服务"
			>
				<div class="form">
					<el-form label-position="right" label-width="120px" width="400" :model="changeData">
					<el-form-item label="增值服务">
					<span v-text="changeData.valueAdded"></span>
					</el-form-item>
					<el-form-item label="活动区域">
					<el-input class='width' v-model="changeData.reference1"></el-input>
					<span>&nbsp; ~ &nbsp;</span>
					<el-input class='width' v-model="changeData.reference2"></el-input>
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
import tabCommonBg from "@/components/public/commonBg";
import selectCity from "@/components/public/selectCity";
import comDialog from "@/components/public/dialog";
import paging from "@/components/public/paging";

export default {
  // 数据
  data() {
    return {
			//增值服务弹窗出现条件
			addShow:false,
			//主要展示渲染数据
			consignorService:[
				{
					number:123,
					valueAdded:'增值服务名称',
					reference:'参考区间',
				}
			],
			// 缓冲的数据
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
		editValue(row){
			this.addShow=true
			// console.log(row)
		},
		saveConfig() {
			this.addShow=false
		},
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
//总模块--路由经进来的模块
#consignor {
	// 页面展示模块--嵌套在背景里面
	.consignor-show {
		padding: 30px;
		position: relative;

			.input{
				padding-bottom: 80px;
			}

			.table{

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
					.el-dialog--small{
						width: 400px;
					}
				}
				.form {
					.width {
						width: 100px;
					}
				}
			}	
	}
}
</style>
