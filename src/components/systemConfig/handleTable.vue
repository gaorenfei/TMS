<template>
  <div class="handleTable">
    <table>
      <thead>
        <tr>
          <th v-for="(item,index) of tableThList" :key="index">{{item}}</th>
        </tr>
      </thead>
      <tbody v-if="!handleTableData.length">
        <tr>
          <td :colspan="tableThList.length">
            <loading></loading>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="(item,num) of handleTableData" :key="num" @mouseover="ActiveClass($event)" @mouseout="loseActiveClass($event)">
          <td v-if="item.fprovinceNamespan > 0" :rowSpan="item.fprovinceNamespan" class="firstTd">{{item.fprovinceName}}</td>
          <td>{{item.fcityName}}</td>
          <td>
            <component
            v-bind:is="slotName"
            :item="item"
            :custom="custom"
            :key="num"
            :deleteUrl="deleteUrl"
            :serviceName="serviceName"
            :param1="param1"
            :param2="param2"
            :param3="param3"
            :param4="param4"
            @updateData="updateData"
            >
            </component>
          </td>
          <td v-if="tableThList.length>3">
            <el-button type="primary" icon="plus" size="small" @click="handleAdd(item,num)" v-waves> 添加</el-button>
            <el-dialog
              :title="title"
              :visible.sync="dialog.visible"
              size="tiny"
              :before-close="dialogClose"
              custom-class="partnerStyle"
              >
              <div class="partnerTag" v-loading="dialog.loading">
                <div class="partnerTag-b">
                  <span
                    v-for="(tag,tagIndex) in handleTagModels"
                    :key="tagIndex"
                    @click="handleChecked(tag)"
                    class="commonTag"
                    :class="[tag.checked?'afterTag':'beforeTag']"
                    ref="spanEle"
                    >
                    {{tag.fServiceName}}
                  </span>
                  <div class="customizeBtn">
                    <el-button @click="linkCustomize" v-if="exitBtn" v-waves>自定义{{custom}}</el-button>
                  </div>
                </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleConfirm()" v-waves>确 定</el-button>
              </span>
            </el-dialog>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import setRowSpan from "@/api/setRowSpan";
import slotBtn from "./slotBtn.vue";
import slotTag from "./slotTag.vue";
import waves from "@/directive/waves"; // 水波纹指令
import Loading from "@/components/public/loading";
export default {
  props: [
    "tableDataList",
    "tableThList",
    "slotName",
    "custom",
    "exitBtn",
    "deleteUrl",
    "addUrl",
    "addList",
    "serviceName",
    "param1",
    "param2",
    "param3",
    "param4"
  ],
  directives: {
    waves
  },
  data() {
    return {
      title: "添加" + this.custom,
      handleTableData: [],
      handleTagModels: [],
      dialog: {
        visible: false,
        loading: false
      },
      //插入数组
      addAry: [],
      //tag 的假数据
      fakeItem: [],
      num: 0
    };
  },
  mounted() {},
  methods: {
    //删除后更新数据
    updateData() {
      this.$emit("updateData");
    },
    //鼠标移过tr
    ActiveClass(e) {
      this.Trinterate(e.target, "#eef1f6");
    },
    //鼠标移出tr
    loseActiveClass(e) {
      this.Trinterate(e.target, "#fff");
    },
    //鼠标移动样式添加
    Trinterate(obj, color) {
      var parent = obj.parentNode;
      if (parent.nodeName == "TR") {
        parent.style.background = color;
        return;
      } else {
        this.Trinterate(parent, color);
      }
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    //添加按钮
    handleAdd(obj, num) {
      this.num = num;
      this.dialog.visible = true;
      this.dialog.loading = true;
      this.$http.post(this.addUrl).then(res => {
        res.data.data.forEach(item => {
          if (!this.param4) {
            this.handleTagModels.push({
              //fServiceName: item.fServiceName,
              fServiceName: item[this.param2],
              checked: false,
              fAreaId: obj.fid,
              //fAddserviceId: item.fid
              [this.param3]: item.fid
            });
          } else {
            this.handleTagModels.push({
              //fServiceName: item.fServiceName,
              fServiceName:
                item[this.param1][this.param2] + item[this.param1][this.param4],
              checked: false,
              fAreaId: obj.fid,
              //fAddserviceId: item.fid
              [this.param3]: item[this.param1].fid
            });
          }
        });
        this.dialog.loading = false;
      });
    },
    //关闭弹框
    dialogClose() {
      this.dialog.visible = false;
      this.handleTagModels = [];
      this.addAry = [];
    },
    handleClose(tag) {},
    handleChecked(tag) {
      tag.checked = !tag.checked;
      if (tag.checked) {
        var exit = this.addAry.some(item => {
          item[this.param1][this.param2] == tag.fServiceName;
        });
        if (!exit) {
          this.addAry.push({
            fAreaId: tag.fAreaId,
            [this.param3]: tag[this.param3],
            [this.param1]: {
              [this.param2]: tag.fServiceName
            }
          });
        }
      } else {
        var findIndex = this.addAry.findIndex((value, index, arr) => {
          return value[this.param1][this.param2] == tag.fServiceName;
        });
        this.addAry.splice(findIndex, 1);
      }
    },
    //取消
    handleCancel() {
      this.dialog.visible = false;
      this.handleTagModels = [];
      this.addAry = [];
    },
    //确定按钮
    handleConfirm() {
      this.dialog.visible = false;
      var sendAry = [];
      if (!this.param4) {
        this.addAry.forEach(item => {
          sendAry.push({
            fAreaId: item.fAreaId,
            [this.param3]: item[this.param3]
          });
        });
        sendAry = {
          list: [...sendAry]
        };
      } else {
        this.addAry.forEach(item => {
          sendAry.push({
            [this.param3]: item[this.param3]
          });
        });
        sendAry = {
          fAreaId: this.addAry[0].fAreaId,
          tCarTypes: [...sendAry]
        };
      }

      this.$http.post(this.addList, sendAry).then(res => {
        if (res.data.code == 100000) {
          if (this.addAry.length != 0) {
            this.$message({
              message: "服务添加成功!",
              type: "success"
            });
            this.$emit("updateData");
          }
        } else {
          this.$message({
            message: "添加失败!",
            type: "error"
          });
        }
        this.handleTagModels = [];
        this.addAry = [];
      });
    },
    linkCustomize() {
      this.$router.push("/home/vehicleType");
    }
  },
  computed: {},
  watch: {
    tableDataList(val) {
      this.handleTableData = val;
      setRowSpan(this.handleTableData, "fprovinceName");
    }
  },
  components: {
    slotBtn,
    slotTag,
    Loading
  }
};
</script>
<style>
.partnerStyle {
  width: 410px;
}
.partnerTag {
  width: 100%;
  box-shadow: -2px 5px 10px #ededed inset;
}
.partnerTag-b {
  padding: 5% 0;
  text-align: left;
  margin: 0 5%;
}
.commonTag {
  display: inline-block;
  line-height: 30px;
  padding: 0 2px;
  margin: 0 10px 10px 0;
  cursor: pointer;
  font-size: 13px;
}
.beforeTag {
  /* background-color: rgba(250,85,85,.1);
  border-color: rgba(250,85,85,.2);
  color: #fa5555; */
  border: 1px solid transparent;
}

.afterTag {
  background-color: rgba(250, 85, 85, 0.1);
  color: #fa5555;
  border-radius: 4px;
  border: 1px solid rgba(250, 85, 85, 0.2);
}
.customizeBtn {
  margin-top: 10px;
}
</style>
