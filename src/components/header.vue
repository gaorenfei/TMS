<template>
    <div id="navMenu">
        <div class='nav-top'>
            <img src='../../static/image/logo.png' class='home-logo'>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="addTab">
                <img :src="activeIndex == '0' ? '../../static/image/home_hover.png' : '../../static/image/home.png'" class='home-top-icon'>
                <el-menu-item index= "0" class='header-home'>首页</el-menu-item>
                <el-submenu
                v-for="(item, index) in menuAry"
                :index="item.number"
                :key="index">
                    <template slot="title">{{item.name}}</template>
                    <el-menu-item
                    :index="item.number + '-' + page.subNmber"
                    v-for="page in menuAry[index].subPage"
                    :key="page.value">
                        {{page.value}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
            <div class='nav-right-news'>
                <img src='../../static/image/header.png' class='header-head'>
            </div>
            <div class='nav-right-admin'>
                <span class='news-number'>13</span>
                <img src='../../static/image/horn.png' class='header-head-left' @click='goNewPage'>
            </div>
        </div>
        <el-tabs
        :class="[hasSidebar ? 'sidebar' : '']"
        v-model="editableTabsValue"
        type="card"
        @tab-remove="removeTab"
        @tab-click='checkTab'
        v-if='showTab'>
            <el-tab-pane
                v-for="(item, index) in tableAry"
                :key="index"
                :label="item.title"
                :name="item.name"
                :closable='item.close'
            >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
  created() {
    //判断路由是否需要测边栏
    if (this.$route.meta.hasSidebar || this.$route.meta.hh) {
      this.hasSidebar = true;
    }
    //缓存tag菜获取
    if (window.localStorage.getItem("page")) {
      this.tableAry = JSON.parse(window.localStorage.getItem("page"));
      this.editableTabsValue = window.localStorage.getItem("currentPage");
      if (this.editableTabsValue == "0") {
        this.$router.push({ path: "/home/tagHome" });
        this.showTab = false;
        this.activeIndex = "0";
        return;
      }
      if (this.editableTabsValue == "news") {
        this.$router.push({ path: "/home/messageCenter" });
        this.showTab = false;
        this.activeIndex = "";
        return;
      }
      this.router(this.editableTabsValue);
      this.activeIndex = "";
    }
    //清空缓存时调回首页
    if (window.localStorage.getItem("page") === null) {
      this.$router.push({ path: "/home/tagHome" });
    }
  },
  data() {
    return {
      hasSidebar: false,
      isCloseSidebar: true,
      showTab: false,
      activeIndex: "0",
      menuAry: [
        {
          number: "1",
          name: "一路好运运营管理",
          subPage: [
            { subNmber: "1", value: "运输管理", component: "TrafficManage" },
            { subNmber: "2", value: "评价管理", component: "ReviewManage" },
            {
              subNmber: "3",
              value: "一路好运配置",
              component: "GoodluckManage"
            }
          ]
        },
        {
          number: "2",
          name: "合作方运营管理",
          subPage: [
            {
              subNmber: "1",
              value: "车辆管理",
              component: "PartnerVehicleManage"
            },
            {
              subNmber: "2",
              value: "运输管理",
              component: "PartnerTrafficManage"
            }
          ]
        },
        {
          number: "3",
          name: "用户管理",
          subPage: [
            {
              subNmber: "1",
              value: "注册用户管理",
              component: "RegisteredUser"
            },
            {
              subNmber: "2",
              value: "身份认证审核",
              component: "IdentityCertifica"
            },
            {
              subNmber: "3",
              value: "司机认证审核",
              component: "DriverCertifica"
            },
            {
              subNmber: "4",
              value: "车辆认证审核",
              component: "VehicleCertifica"
            },
            {
              subNmber: "5",
              value: "车辆档案",
              component: "VehicleFiles"
            }
          ]
        },
        {
          number: "4",
          name: "车辆管理",
          subPage: [
            { subNmber: "1", value: "车队管理", component: "fleetManage" },
            { subNmber: "2", value: "车队详情", component: "fleetDetails" },
            { subNmber: "3", value: "签约车辆管理", component: "alreadySin" },
            { subNmber: "4", value: "未签约车辆管理", component: "nosignedSin" }
          ]
        },
        {
          number: "5",
          name: "运价管理",
          subPage: [
            { subNmber: "1", value: "一路好运", component: "FreightGoodluck" },
            { subNmber: "2", value: "合作方", component: "FreightPartner" }
          ]
        },
        {
          number: "6",
          name: "系统配置",
          subPage: [
            {
              subNmber: "1",
              value: "一路好运开放区域配置",
              component: "goodLuck"
            },
            {
              subNmber: "2",
              value: "合作方区域车型配置",
              component: "partner"
            },
            { subNmber: "3", value: "车辆品牌大全", component: "vehicleBrand" },
            {
              subNmber: "4",
              value: "附加服务类型配置",
              component: "addService"
            },
            {
              subNmber: "5",
              value: "货物服务类型配置",
              component: "goodsService"
            },
            {
              subNmber: "6",
              value: "增值服务类型配置",
              component: "incrementService"
            },
            { subNmber: "7", value: "车辆类型配置", component: "vehicleType" }
          ]
        }
      ],
      editableTabsValue: "0",
      tableAry: [] //tab页数组
    };
  },
  methods: {
    //添加tab页
    addTab(key) {
      //首页
      if (key == "0") {
        this.showTab = false;
        this.$router.push({ path: "/home/tagHome" });
        window.localStorage.setItem("currentPage", "0");
        return;
      }
      this.showTab = true;
      let index = key.indexOf("-");
      let number = key.slice(0, index) - 1;
      let subNumber = key.slice(index + 1, key.length) - 1;
      let tableName = this.menuAry[number].subPage[subNumber].value;
      let content = this.menuAry[number].subPage[subNumber].component;
      for (let i = 0; i < this.tableAry.length; i++) {
        if (this.tableAry[i].name === key) {
          this.editableTabsValue = key;
          this.$router.push({ name: content });
          window.localStorage.setItem("currentPage", key);
          return;
        }
      }
      this.tableAry.push({
        title: tableName,
        name: key,
        content: content,
        close: true
      });
      window.localStorage.setItem("page", JSON.stringify(this.tableAry));
      window.localStorage.setItem("currentPage", key);
      this.editableTabsValue = key;
      this.$router.push({ name: content });
    },
    //删除tab页
    removeTab(targetName) {
      let tabs = this.tableAry;
      let activeName = this.editableTabsValue;
      // if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
      this.editableTabsValue = activeName;
      this.tableAry = tabs.filter(tab => tab.name !== targetName);
      if (this.tableAry.length == 0) {
        this.activeIndex = "";
        setTimeout(() => {
          this.activeIndex = "0";
        }, 1);
        this.showTab = false;
        this.$router.push({ path: "/home/tagHome" });
        window.localStorage.removeItem("page");
        window.localStorage.setItem("currentPage", "0");
        return;
      }
      window.localStorage.setItem("page", JSON.stringify(this.tableAry));
      window.localStorage.setItem("currentPage", this.editableTabsValue);
      // }
      this.router(this.editableTabsValue);
    },
    //选中tab
    checkTab(tab) {
      this.router(tab.name);
      window.localStorage.setItem("currentPage", tab.name);
    },
    //路由跳转
    router(name) {
      this.showTab = true;
      for (let i = 0; i < this.tableAry.length; i++) {
        if (name == this.tableAry[i].name) {
          this.$router.push({ name: this.tableAry[i].content });
        }
      }
    },
    //跳转消息中心
    goNewPage() {
      this.$router.push({ path: "/home/messageCenter" });
      window.localStorage.setItem("currentPage", "news");
    }
  },
  watch: {
    //历史回退操作
    $route(to, from) {
      this.showTab = true;
      this.activeIndex = "";
      this.hasSidebar = false;
      if (to.meta.hasSidebar || to.meta.hh) {
        this.hasSidebar = true;
      }
      //首页
      if (to.path == "/home/tagHome") {
        this.showTab = false;
        this.activeIndex = "0";
        return;
      }
      //消息中心
      if (to.path == "/home/messageCenter") {
        this.showTab = false;
        this.activeIndex = "";
        return;
      }
      //后退历史记录匹配tab
      for (let i = 0; i < this.tableAry.length; i++) {
        if (to.name == this.tableAry[i].content) {
          this.editableTabsValue = this.tableAry[i].name;
          return;
        }
      }
      //tab页面全部关闭时,历史记录重置
      for (let i = 0; i < this.menuAry.length; i++) {
        for (let l = 0; l < this.menuAry[i].subPage.length; l++) {
          if (to.name == this.menuAry[i].subPage[l].component) {
            this.tableAry.push({
              title: this.menuAry[i].subPage[l].value,
              name:
                this.menuAry[i].number +
                "-" +
                this.menuAry[i].subPage[l].subNmber,
              content: to.name,
              close: true
            });
            this.editableTabsValue =
              this.menuAry[i].number +
              "-" +
              this.menuAry[i].subPage[l].subNmber;
            window.localStorage.setItem("page", JSON.stringify(this.tableAry));
            window.localStorage.setItem("currentPage", this.editableTabsValue);
            return;
          }
        }
      }
    }
  },
  components: {}
};
</script>
