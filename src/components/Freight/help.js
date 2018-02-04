//注册模块名称 一路好运司机模块
drivertariff
//后台数据: 1路好运司机运费管理
deiverFreight=[
    {
        number:'序号',       //序号
        carSize:'车辆规格',      //车辆规格
        initialMile:'起步里程（元）',  //起步里程（元）
        startPrice:'起步价（元）',   //起步价（元）
        exceedPrice:'超出里程收费',   //超出里程收费（/公里）
        agencyPrice:'平台抽成'
    }
]

/**
 * consignor 一路好运货主模块
 * */
consignorService = [
    {
        number:'序号',
        valueAdded:'增值服务',
        reference:'参考区间',
    },
]
//数据格式已经设计完毕单数据刷星还没有处理



/**
 * GoodsChargeCoefficient
 * */
GoodsChargeCoefficient 
// 主要数据
chargeRatio = [
    {
        number:'序号',
        goodType:'abc',
        ratio:'收费比例',
    }
]
/**
 * AdditionalCharge
 * 附加服务配置
 * */
AdditionalCharge
//提/卸货点展示页数据
loadedData = [
    {
        name:'状态',  //名称
        chargeStandard:'50', //收费标准
        startNumber:'2'      //起收点
    }
]