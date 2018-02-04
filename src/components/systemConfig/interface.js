//系统配置模块

/* 一路好运区域配置  孙子文*/

export const PAGEFINDCITY = "/areaopen/getbyconditions/page.do"; //分页请求列表
export const ADDCITY = "/areaopen/open.do"; //添加区域
export const FIND_ALLCITY_BYPROVINCE = "/arealinkage/findallcitybyprovince.do"; //根据省份筛选
export const GET_ALL_OPEN_PROVINCE = "/areaopen/getallopenprovince.do"; //返回对应省份的所有城市
export const AREA_OPEN_CLOSE = "/areaopen/close.do"; //删除区域

/* 合作方开放区域车型配置   陈勇*/
export const AREA_OPEN_CAR_SELECT = "/areaOpenCar/select.do";//请求区域对应的服务
export const AREA_OPEN_CAR_DELETE = "/areaOpenCar/delete.do";//删除区域对应的服务
export const CAR_TYPE_LIST_SELECT = "/carTypeList/select.do";//所有附加服务
export const AREA_OPEN_CAR_ADD = "/areaOpenCar/add.do"; //添加货物服务

/* 附加服务类型配置  石乾*/
export const QUERYADD = "/extralService/queryAdd.do"; //请求区域对应的服务
export const DELETE_AREA_ADD = "/extralService/deleteAreaAdd.do"; //删除区域对应的服务
export const QUERY_ALL_ADD = "/extralService/queryAllAdd.do"; //所有附加服务
export const ADD_LIST_ADD = "/extralService/addListAdd.do"; //添加附加服务

/* 货物服务类型配置  石乾*/
export const QUERYGOOD = "/extralService/queryGood.do"; //请求区域对应的服务
export const DELETE_GOODS = "/extralService/deleteGoods.do"; //删除区域对应的服务
export const QUERY_ALL_GOOD = "/extralService/queryAllGood.do"; //所有货物服务
export const ADD_LIST_GOOD = "/extralService/addListGood.do"; //添加货物服务

/* 增值服务类型配置  石乾*/
export const QUERYINC = "/extralService/queryInc.do"; //请求区域对应的服务
export const DELETE_AREA_INCREMENT = "/extralService/deleteAreaIncrement.do"; //删除区域对应的服务
export const QUERY_ALL_INC = "/extralService/queryAllInc.do"; //所有增值服务
export const ADD_LIST_INC = "/extralService/addListInc.do"; //添加增值服务

/* 车辆品牌大全  陈勇*/
export const CAR_BRAND_ATT_SELECT = "/carBrandAtt/select.do"; //显示所有车辆品牌
export const CAR_BRAND_ATT_EDIT = "/carBrandAtt/edit.do"; //获取已添加的品牌属性
export const CAR_BRAND_ATT_ADD = "/carBrandAtt/add.do"; //增加品牌车型
export const CAR_BRAND_ATT_UPDATE = "/carBrandAtt/update.do"; //更新品牌车型
export const CAR_BRAND_ATT_DELETE = "/carBrandAtt/delete.do"; //删除品牌车型

//车辆类型配置
export const SEARCH_FLEET_CONFIG = "/carTypeList/select.do"; //查询车辆类型配置
export const EDIT_FLEET_CONFIG = "/carTypeList/edit.do"; //编辑车辆类型配置
export const ADD_FLEET_CONFIG = "/carTypeList/add.do"; //增加车辆类型配置
export const UPDATA_FLEET_CONFIG = "/carTypeList/update.do"; //更新车辆类型配置
export const DELETE_FLEET_CONFIG = "/carTypeList/delete.do"; //删除车辆类型配置
