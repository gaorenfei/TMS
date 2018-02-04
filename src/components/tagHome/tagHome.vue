<template>
    <div id="tagHome">
        <div class='home-top'>
          <transition name="slide-fade1" >
            <top
            imgPath='../../static/image/car.png'
            className='top-left'
            fontValue='平台注册车辆'
            en='REGLSTER A CAR'
            :number='carNum'
            >
            </top>
          </transition>
            <transition name="slide-fade2">
            <top
            imgPath='../../static/image/owner.png'
            className='top-middle-left'
            fontValue='注册货主'
            en='REGISTERED OWNER'
            :number='ownerNum'
            >
            </top>
          </transition>
          <transition name="slide-fade3">
            <top
            imgPath='../../static/image/Partners.png'
            className='top-middle-right'
            fontValue='合作方'
            en='PARTNER'
            :number='partnerNum'
            >
            </top>
          </transition>
          <transition name="slide-fade4">
            <top
            imgPath='../../static/image/Order.png'
            className='top-right'
            fontValue='一路好运订单总量'
            en='ORDER TOTAL'
            :number='orderNum'
            >
            </top>
          </transition>
        </div>
        <div class='home-middle'>
            <transition name="slide-fade1">
              <chart
              idName='middle-left'
              title='一路好运运费统计图'>
              </chart>
            </transition>
            <transition name="slide-fade2">
              <chart
              idName='middle-middle'
              title='一路好运订单统计图'>
              </chart>
            </transition>
            <transition name="slide-fade3">
              <chart
              idName='middle-right'
              title='一路好运货主统计图'>
              </chart>
            </transition>
        </div>
        <div class='home-button'>
          <transition name="slide-fade4">
          <div class='button-left' v-show='showLeftChart'>
              <div class='button-left-left'>
                 <div class='button-left-title'>
                    <span>平台区域开放分布</span>
                    <div class='button-left-area'>
                      <i class='opne-icon'></i>
                      <span>已开放</span>
                      <i class='close-icon'></i>
                      <span>未开放</span>
                    </div>
                 </div>
                 <div id="homeMap" style="width:100%; height:320px"></div>
              </div>
              <div class='button-left-right'>
                <pogres
                name='待派车运单'
                number='123456'
                company='/单'
                :speed='80'>
                </pogres>
                <pogres
                name='待调度用车申请'
                number='2365'
                company='/辆'
                :speed='50'>
                </pogres>
                <pogres
                name='待派单司机'
                number='365'
                company='/人'
                :speed='20'>
                </pogres>
            </div>
          </div>
          </transition>
          <transition name="slide-fade4">
          <div class='button-right'v-show='showRightChart'>
              <img src='../../../static/image/new.png' class='button-right-img'>
              <span class='new-trends'>最新动态</span>
              <div class='button-news'>
                <div class='button-news-line' v-for="(news, index) in newsAry" :key='index'>
                  <i class='red-icon'></i><span class='news-value'>{{news.value}}</span><span class='news-time'>{{news.time}}</span>
                </div>
              </div>
          </div>
          </transition>
        </div>
        <div class='common-bottom'>
          联系我们 | 2009-2017 Alisdaun.com 东经科技股份有限公司 版权所有ICP证: 浙B2-20508010
        </div>
    </div>
</template>

<script>
import AMap from "AMap";
import G2 from "@antv/g2";
import top from "@/components/tagHome/tagHomeTop";
import chart from "@/components/tagHome/chart";
import pogres from "@/components/tagHome/progress";
import * as request from "./request";
export default {
  activated() {},
  data() {
    return {
      carNum: 0,
      ownerNum: 0,
      partnerNum: 0,
      orderNum: 0,
      showLeftChart: false,
      showRightChart: false,
      newsAry: [
        { value: "有新的一路好运订单需要处理!", time: "10月1号 14:10" },
        { value: "有新的一路好运订单需要处理!", time: "10月1号 14:10" },
        { value: "车牌号A2589上报异常!", time: "10月1号 14:10" },
        { value: "订单编号5455455有异常!", time: "10月1号 14:10" },
        { value: "有新的一路好运订单需要处理!", time: "10月1号 14:10" },
        { value: "车牌号A2888上报异常!", time: "10月1号 14:10" },
        { value: "订单编号5455455有异常!", time: "10月1号 14:10" },
        { value: "订单编号5459898有异常!", time: "10月1号 14:10" }
      ]
    };
  },
  mounted() {
    //首页动画，依次显示
    setTimeout(() => {
      this.showLeftChart = true;
      this.addNumber(6870, "carNum");
      this.addNumber(2562, "ownerNum");
      this.addNumber(400, "partnerNum");
      this.addNumber(686560, "orderNum");
    }, 500);
    setTimeout(() => {
      this.showRightChart = true;
    }, 1500);
    setTimeout(() => {
      this.createMap();
    }, 500);
    setTimeout(() => {
      this.leftChart();
      this.middleChart();
      this.rightChart();
    }, 1200);
  },
  methods: {
    //左侧折线图
    leftChart() {
      const data = [
        { year: "1991", value: 15468 },
        { year: "1992", value: 16100 },
        { year: "1993", value: 15900 },
        { year: "1994", value: 17409 },
        { year: "1995", value: 17000 },
        { year: "1996", value: 31056 },
        { year: "1997", value: 31982 },
        { year: "1998", value: 32040 },
        { year: "1999", value: 33233 }
      ];
      const chart = new G2.Chart({
        container: "middle-left",
        forceFit: true,
        height: 450
      });
      const defs = {
        // 'year':{
        //   alias: '年份', // 别名
        // },
        // 'value': {
        //   alias: '路程'
        // }
      };
      chart.scale({
        value: {
          min: 10000
        },
        year: {
          range: [0, 1]
        }
      });
      chart.source(data, defs);
      chart.axis("value", {
        label: {
          formatter: val => {
            return (val / 10000).toFixed(1) + "k";
          }
        }
      });
      chart.tooltip({
        crosshairs: {
          type: "line"
        },
        showTitle: false
      });
      chart.axis("year", {
        tickLine: null,
        line: {
          lineWidth: 1, // 设置线的宽度
          stroke: "#ddd", // 设置线的颜色
          lineDash: [3, 3] // 设置虚线样式
        }
      });
      // chart.area().position('year*value').color('#ebf2ff').tooltip('year*value');
      chart
        .area()
        .position("year*value")
        .tooltip("year*value");
      chart
        .line()
        .position("year*value")
        .size(2)
        .style({
          stroke: "#3f7bff",
          lineWidth: 3
        });
      chart.render();
    },
    //中间折线图
    middleChart() {
      const data = [
        { year: "1", value: 900 },
        { year: "2", value: 800 },
        { year: "5", value: 1560 },
        { year: "7", value: 1000 },
        { year: "9", value: 1900 },
        { year: "11", value: 1350 }
      ];
      const chart = new G2.Chart({
        container: "middle-middle",
        forceFit: true,
        height: "450"
      });
      chart.source(data);
      chart.scale("value", {
        tickInterval: 500,
        min: 0,
        max: 2000
      });
      chart.scale("year", {
        range: [0, 1]
      });
      chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      chart.axis("year", {
        tickLine: null,
        line: {
          lineWidth: 1, // 设置线的宽度
          stroke: "#ddd", // 设置线的颜色
          lineDash: [3, 3] // 设置虚线样式
        }
      });
      // chart.area().position('year*value').color('#fdeef0');
      chart
        .area()
        .position("year*value")
        .color("#eb6b81");
      chart
        .line()
        .position("year*value")
        .size(4)
        .shape("circle")
        .style({
          stroke: "#eb6b81",
          lineWidth: 3
        });
      chart.render();
    },
    //右侧折线图
    rightChart() {
      const data = [
        { month: "1", 新增货主: 70, 新增车主: 39 },
        { month: "3", 新增货主: 69, 新增车主: 42 },
        { month: "5", 新增货主: 95, 新增车主: 57 },
        { month: "7", 新增货主: 145, 新增车主: 85 },
        { month: "9", 新增货主: 183, 新增车主: 103 },
        { month: "11", 新增货主: 139, 新增车主: 66 }
      ];
      const ds = new DataSet();
      const dv = ds.createView().source(data);
      dv.transform({
        type: "fold",
        fields: ["新增货主", "新增车主"], // 展开字段集
        key: "city", // key字段
        value: "temperature" // value字段
      });
      const chart = new G2.Chart({
        container: "middle-right",
        forceFit: true,
        height: "450"
      });
      chart.source(dv, {
        month: {
          range: [0, 1]
        }
      });
      chart.tooltip({
        crosshairs: {
          type: "line"
        }
      });
      chart.axis("month", {
        tickLine: null,
        line: {
          lineWidth: 1, // 设置线的宽度
          stroke: "#ddd", // 设置线的颜色
          lineDash: [3, 3] // 设置虚线样式
        }
      });
      chart.scale("temperature", {
        tickInterval: 50,
        min: 0,
        max: 200
      });
      chart
        .area()
        .position("month*temperature")
        .color("city", ["#7f54c3", "#00e2a0"]);
      chart
        .line()
        .position("month*temperature")
        .color("city", ["#7f54c3", "#00e2a0"])
        .size(3)
        .shape("circle");
      chart.render();
    },
    //左下角地图创建
    createMap() {
      //创建地图
      var map = new AMap.Map("homeMap", {
        resizeEnable: true,
        center: [106.344448, 34.350737],
        zoom: 3
      });
      map.setLimitBounds(map.getBounds());
    },
    //数字加成动画
    addNumber(number, str) {
      let init = number;
      this[str] = 0;
      let animation = setInterval(() => {
        this[str] = this[str] + Math.ceil(init / 30);
        if (this[str] >= init) {
          this[str] = number;
          clearInterval(animation);
        }
      }, 1);
    }
  },
  computed: {},
  components: {
    top,
    chart,
    pogres
  }
};
</script>
