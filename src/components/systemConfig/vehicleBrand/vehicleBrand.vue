<template>
  <tab-common-bg>
    <div id="vehicleBrand">
      <div class="letterSearch" ref="letterSearch" :class="[hasScroll?'afterScroll':'beforeScroll']">
        <ul class="letter-ul">
          <li v-for="(item,index) of letterAry" :key="index" class="fl letter-li">
            <a href="javascript:;" class="letter-a"
              :class="[item.include?'letter-gray':'letter-lightgray',item.checked?'letter-red':'']"
              @mouseover="handleLetterOver($event,item)"
              @mouseout="handleLetterOut($event,item)"
              @click="handleLetterClick(item)"
              >
              {{item.name}}
            </a>
          </li>
        </ul>
      </div>
      <div>
        <el-button type="primary" v-waves  class="vehicle-btn" @click="handleAdd">添加品牌车型</el-button>
      </div>
      <div class="handleTable vehicle-table"
        ref="vehicleTable" v-loading="loading">
        <table>
          <tr>
            <th class="vehicle-fir">品牌</th>
            <th>车型</th>
          </tr>
          <tbody v-if="!tableDataList.length">
            <tr>
              <td :colspan="2">
                <loading></loading>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(item,index) of tableDataList" :key="index">
            <td class="vehicle-fir field">{{item.tBrandName.fbrandName}}</td>
            <td>
              <ul>
                <li v-for="(model,key) of item.resCarBrandAtts" :key="key" class="fl vehicle-li" :class="[model.delete?'vehicle-li-delete':'',model.delete?'vehicle-li-active':'']">
                  <div @click="handleTagClick(model)" class="modelTag">{{model.fcarType}}</div>
                  <div v-show="model.over" :class="[model.over?'vehicle-btn-over':'']">
                    <el-button type="text" icon="edit" @click="handleEdit(item,model)"></el-button>
                    <el-button type="text" icon="delete" @click="handleDelete($event,index,key,model)"></el-button>
                  </div>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <el-dialog
        title="添加品牌车型"
        :visible.sync="dialog.visible"
        size="tiny"
        :before-close="handleClose"
        custom-class="vehicleStyle"
        >
        <div class="dialog-table">
          <div class="dialog-table-box">
            <el-form  :model="form" :rules="rules" ref="form">
              <table>
                <tbody v-for="(item,index) of dialog.dataList" :key="index">
                  <tr>
                    <th class="dialog-th">{{item.type}}</th>
                    <th>
                      {{item.value}}
                      <span class="arrow-btn" @click="handleSpread(index)">
                        <i class="el-icon-arrow-down arrow-down-trans" v-if="!item.value" :class="[item.checked?'arrow-up':'']" ></i>
                      </span>
                    </th>
                  </tr>
                  <tr v-for="(field,key) of item.fields" :key="key" v-show="item.checked">
                    <td>{{field.name}}</td>
                    <td>
                      <el-form-item class="fl" :prop="field.modelname">
                        <el-input
                          v-model="form[field.modelname]"
                          @focus="(e) => {handleFocus(e,index,key,field.modelname)}"
                          @blur="(e) => {handleBlur(e,index,key,field.modelname)}"
                          v-on:input.native="handleChange($event,index,key)"
                          :placeholder="field.validate"
                          >
                        </el-input>
                      </el-form-item>
                      <div class="el-icon-edit-class"
                          :class='[field.focus?"edit-blue":"edit-gray",field.changed?"edit-red":""]'
                      >
                        <i class="el-icon-edit" @click="handleIconClick($event,index,key)"></i>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleCancel">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')" :loading="btnLoading" ref="sendBtn">{{dialogType=="add"?"立即创建":"确认修改"}}</el-button>
        </span>
      </el-dialog>
    </div>
  </tab-common-bg>
</template>

<script>
//https://www.cnblogs.com/libin-1/p/6517168.html
import tabCommonBg from "@/components/public/commonBg";
import waves from "@/directive/waves"; // 水波纹指令
import letterAry from "./letterAry";
import dialogDataList from "./dialogDataList";
import makePy from "@/api/strChineseFirstPY";
import debounce from "@/api/debounce";
import Loading from "@/components/public/loading";
import * as Interface from "../interface";
export default {
  name: "vehicleBrand",
  directives: {
    waves
  },
  data() {
    var required = (rule, value, callback) => {
      if (!value) {
        callback(new Error("* 不能为空"));
      }
    };
    var number = (rule, value, callback) => {
      if (!Number(value)) {
        callback(new Error("* 请输入数字值"));
      }
    };
    return {
      loading: false,
      btnLoading: false,
      dialog: {
        visible: false, //弹框是否显示
        dataList: dialogDataList //弹框列表
      },
      dialogType: "", //弹框的类型,"add"表示添加品牌类型，"edit"表示点击编辑按钮编辑
      letterAry, //26字母导航列表
      hasScroll: false, //在做26字母导航，是否滚动
      tableDataList: [], //表格列表
      form: {
        fbrand: "", //品牌
        fcarType: "", //车型
        fversion: "", //型号
        fboxlength: "", //箱长级别
        fengine: "", //发动机
        fgearBox: "", //变速箱
        fbodylength: "", //车身长度
        fbodywidth: "", //车身宽度
        fbodyheight: "", //车身高度
        fweight: "", //整车重量
        frateLoad: "", //额定载重
        ftotalMass: "", //总重量
        ftonnageLevel: "", //吨位级别
        ffuelType: "", //燃料种类
        fcontainerForm: "", //货箱形式
        fcontainerlength: "", //货箱长度
        fcontainerwidth: "", //货箱宽度
        fcontainerheight: "", //货箱高度
        fpermitPassenger: "", //准乘人数
        ftyreSpec: "", //轮胎规格
        ftyreNumber: "", //轮胎数
        ffuelCapacity: "" //油箱容量
      },
      rules: {
        fbrand: [
          { validator: required, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ], //品牌
        fcarType: [
          { validator: required, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ], //车型
        fversion: [
          { validator: required, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ], //型号
        fboxlength: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //箱长级别
        fengine: [
          { validator: required, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ], //发动机
        fgearBox: [
          { validator: required, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ], //变速箱
        fbodylength: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //车身长度
        fbodywidth: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //车身宽度
        fbodyheight: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //车身高度
        fweight: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //整车重量
        frateLoad: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //额定载重
        ftotalMass: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //总重量
        ftonnageLevel: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //吨位级别
        ffuelType: [
          { validator: required, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ], //燃料种类
        fcontainerForm: [
          { validator: required, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ], //货箱形式
        fcontainerlength: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //货箱长度
        fcontainerwidth: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //货箱宽度
        fcontainerheight: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //货箱高度
        fpermitPassenger: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //准乘人数
        ftyreSpec: [
          { validator: required, trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ], //轮胎规格
        ftyreNumber: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ], //轮胎数
        ffuelCapacity: [
          { validator: required, trigger: "blur" },
          { validator: number, trigger: "change" }
        ] //油箱容量
      },
      formShadow: {}, //备用 form，后期取值用的
      tdFirstPyList: [], //表格品牌字段对应含有的所有首字母列表
      map: {}, //筛选 字母:元素与顶部的距离
      mapShadow: new Map()
    };
  },
  mounted() {
    // $("#handleTable .el-form-item__error").css({
    //   float: "right",
    //   fontSize: "12px",
    //   color: "#c00",
    //   position: "static",
    //   padding: 0,
    //   lineHeight: "40px"
    // });

    //请求所有的品牌列表
    this.requestData();
    //滚轮
    window.onscroll = _ => {
      var topScroll =
        document.body.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset; //滚动的距离,距离顶部的距离

      //debounce 防抖
      debounce(this.scrollStyle(topScroll), 2000);

      if (topScroll > 138) {
        //当滚动距离大于153px时执行下面的东西
        this.hasScroll = true;
      } else {
        //当滚动距离小于153的时候执行下面的内容，也就是让导航栏恢复原状
        this.hasScroll = false;
      }
    };
  },
  methods: {
    //请求数据
    requestData() {
      //Interface.VEHICLEBRANDLIST
      this.$http.post(Interface.CAR_BRAND_ATT_SELECT).then(res => {
        this.tableDataList = res.data.data;
        this.loading = false;
        $(this.$refs.vehicleTable).css({
          height: "auto",
          borderRight: 0
        });
        this.$nextTick(() => {
          //表格品牌字段对应的所有拼音首字母，未经筛选
          this.tdFirstPyList = this.tableDataList.map(
            item => makePy(item.tBrandName.fbrandName)[0]
          );

          //遍历26字母数组查看在tdFirstPyList数组里面包不包含，改变样式,不包含的变成灰色
          this.letterAry.forEach(item => {
            item.include = this.tdFirstPyList.includes(item.name);
          });
          //取到所有品牌元素
          var fields = document.getElementsByClassName("field");
          //过滤掉重复字母，取第一个相同字母的位置，在 map 里面 push 入对应的字母与位置
          for (let i = 0; i < this.tdFirstPyList.length; i++) {
            const letter = this.tdFirstPyList[i];
            if (!this.map[letter]) {
              var offset = $(fields[i]).offset().top;
              this.map[letter] = offset;
            }
          }
          //第一个含有的字母默认变成红色
          for (var letter of this.letterAry) {
            if (letter.name == Object.keys(this.map)[0]) {
              letter.checked = true;
              break;
            }
          }
        });
      });
    },
    //字母划过
    handleLetterOver(e, item) {
      e.target.style.color = "#c00";
    },
    //字母离开
    handleLetterOut(e, item) {
      e.target.style.color = "#333";
    },
    //字母点击
    handleLetterClick(item) {
      if (item.include) {
        this.letterAry.forEach(item => {
          item.checked = false;
        });
        item.checked = true;
        window.scroll(0, this.map[item.name]);
      } else {
        item.checked = false;
        item.include = false;
      }
    },
    //添加品牌车型
    handleAdd() {
      this.dialogType = "add";
      if (!this.loading) {
        this.dialog.visible = true;
      }
      this.removeLoadingIco();
      this.changeSpread();

      // for (var item in this.form) {
      //   this.form[item] = "";
      // }
    },
    //关闭弹框
    handleClose() {
      this.dialog.visible = false;
      this.outTarget();
      this.$refs["form"].resetFields();
    },
    //展开
    handleSpread(index) {
      this.dialog.dataList[index].checked = !this.dialog.dataList[index]
        .checked;
      this.removeLoadingIco();
    },
    //在 Input 获得焦点
    handleFocus(e, index, key, modelname) {
      this.dialog.dataList[index].fields[key].changed = false;
      this.dialog.dataList[index].fields[key].focus = true;
      var validataMsg = $(e.target.parentNode)
        .siblings(".el-form-item__error")
        .text();
      if (validataMsg == "* 不能为空") {
        $(e.target.parentNode)
          .siblings(".el-form-item__error")
          .css("visibility", "hidden");
      } else {
        this.removeLoadingIco();
      }
    },
    //在 Input 失去焦点
    handleBlur(e, index, key, modelname) {
      $(e.target.parentNode)
        .siblings(".el-form-item__error")
        .css("visibility", "visible");
      setTimeout(_ => {
        this.dialog.dataList[index].fields[key].focus = false;
        var validataMsg = $(e.target.parentNode)
          .siblings(".el-form-item__error")
          .text();
        if (this.dialogType == "edit") {
          if (!this.form[modelname]) {
            $(document.querySelector(".el-input__icon")).remove();
            this.dialog.dataList[index].fields[key].changed = false;
            this.form[modelname] = this.formShadow[modelname];
          } else {
            if (!validataMsg) {
              this.removeLoadingIco();
              if (this.form[modelname] != this.formShadow[modelname]) {
                this.dialog.dataList[index].fields[key].changed = true;
              } else {
                this.dialog.dataList[index].fields[key].changed = false;
              }
            } else {
              this.dialog.dataList[index].fields[key].changed = true;
            }
          }
        } else {
          if (validataMsg) {
            this.dialog.dataList[index].fields[key].changed = true;
          } else {
            this.removeLoadingIco();
          }
        }
      }, 50);
    },
    handleChange(e, index, key) {
      if (this.dialogType == "edit") {
        this.dialog.dataList[index].fields[key].changed = true;
      }
      var validataMsg = $(e.target.parentNode)
        .siblings(".el-form-item__error")
        .text();
      if (validataMsg) {
        e.target.parentNode.style.width = "250px";
        //this.changeErrStyle(e.target);
        this.removeLoadingIco();
      }
    },
    //编辑
    handleEdit(item, model) {
      this.dialogType = "edit";
      this.dialog.visible = true;
      this.changeSpread();
      this.removeLoadingIco();
      var sendObj = {
        fid: model.fid
      };
      this.$http.post(Interface.CAR_BRAND_ATT_EDIT, sendObj).then(res => {
        this.form = { ...res.data.data };
        this.form.fbrand = item.tBrandName.fbrandName;
        this.form.fid = model.fid;
        this.formShadow = { ...res.data.data };
        this.formShadow.fbrand = item.tBrandName.fbrandName;
      });
    },
    //删除品牌车型
    handleDelete(e, index, key, model) {
      //this.tableDataList[index].models[key + 1].delete = false;
      var msg = "确认要删除" + model.fcarType + "车型吗?";
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(_ => {
          model.delete = true;
          setTimeout(_ => {
            var sendObj = {
              fid: model.fid
            };
            this.$http
              .post(Interface.CAR_BRAND_ATT_DELETE, sendObj)
              .then(res => {
                if (res.data.code == 100000) {
                  this.tableDataList[index].resCarBrandAtts.splice(key, 1);
                }
              });
          }, 800);
        })
        .catch(_ => {
          model.delete = false;
        });
    },
    //取消
    handleCancel() {
      this.dialog.visible = false;
      this.outTarget();
      this.$refs["form"].resetFields();
    },
    //确定提交按钮
    submitForm(formName) {
      this.btnLoading = true;
      if (this.dialogType == "add") {
        this.$http
          .post(Interface.CAR_BRAND_ATT_ADD, this.form)
          .then(res => {
            this.btnLoading = false;
            if (res.data.code == 100000) {
              this.$message({
                message: "品牌" + this.form.fbrand + "添加成功!",
                type: "success"
              });
              this.dialog.visible = false;
              this.requestData();
            }
            this.$refs["form"].resetFields();
          })
          .catch(_ => {
            this.btnLoading = false;
            this.$message({
              message: "请求失败!",
              type: "error"
            });
          });
      } else {
        this.removeLoadingIco();
        this.$http
          .post(Interface.CAR_BRAND_ATT_UPDATE, this.form)
          .then(res => {
            this.btnLoading = false;
            if (res.data.code == 100000) {
              this.$message({
                message: "修改成功!",
                type: "success"
              });
              this.dialog.visible = false;
              this.requestData();
            }
            this.$refs["form"].resetFields();
          })
          .catch(_ => {
            this.$message({
              message: "修改失败!",
              type: "error"
            });
          });
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          this.btnLoading = false;
          this.removeLoadingIco();
          this.$message({
            showClose: true,
            message: "请先填写完数据!",
            type: "error"
          });
          return false;
        }
      });
      this.outTarget();
    },
    //后端返回的数据校验结果
    // returnValidate() {
    //   Object.keys(this.form).forEach(property => {
    //     if (res.data.data[property]) {
    //       this.form[property] = res.data.data[property];
    //     } else {
    //       this.form[property] = "";
    //     }
    //   });
    // },
    //点击 icon
    handleIconClick(e, index, key) {
      var target = this.searchInput(e.target.parentNode.parentNode);
      target.focus();
      this.dialog.dataList[index].fields[key].focus = true;
    },
    searchInput(e) {
      if (e.children[0].nodeName == "INPUT") {
        return e.children[0];
      } else {
        return this.searchInput(e.children[0]);
      }
    },
    //滚轮滚动变化
    scrollStyle(topScroll) {
      var arr = [];
      var suffix = 0;
      Object.keys(this.map).forEach(key => {
        const value = this.map[key];
        var compareVal = topScroll - value;
        arr.push(Math.abs(compareVal));
        this.mapShadow.set(key, Math.abs(compareVal));
      });
      var min = Math.min(...arr);
      for (let [key, value] of this.mapShadow) {
        if (value == min) {
          suffix = key;
        }
      }
      this.letterAry.forEach(item => {
        if (item.name == suffix) {
          this.letterAry.forEach(item => {
            item.checked = false;
          });
          item.checked = true;
        }
      });
    },
    outTarget() {
      for (let item of this.dialog.dataList) {
        for (let field of item.fields) {
          if (field.changed) {
            field.changed = false;
          }
        }
      }
    },
    outError() {
      var errEles = document.querySelectorAll(".el-form-item__error");
      Array.from(errEles).forEach(item => {
        item.style.visibility = "hidden";
      });
    },
    //点击车型
    handleTagClick(model) {
      model.over = !model.over;
    },
    //去除Input框element-ui校验的时候带的 loading 元素
    removeLoadingIco() {
      $(".el-input__icon").each(function(index, element) {
        element.remove();
      });
    },
    changeSpread() {
      this.dialog.dataList.forEach((item, index) => {
        if (index) {
          item.checked = false;
        }
      });
    }
  },
  components: {
    tabCommonBg,
    Loading
  }
};
</script>
<style lang="scss" scoped>

</style>

