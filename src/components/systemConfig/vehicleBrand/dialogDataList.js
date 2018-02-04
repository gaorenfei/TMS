export default [
  {
    type: "名称",
    value: "值",
    checked: true,
    fields: [
      {
        name: "品牌",
        validate: "最多20个字符",
        modelname: "fbrand",
        focus: false,
        changed: false
      },
      {
        name: "车型",
        validate: "最多20个字符",
        modelname: "fcarType",
        focus: false,
        changed: false
      },
      {
        name: "型号",
        validate: "最多20个字符",
        modelname: "fversion",
        focus: false,
        changed: false
      }
    ]
  },
  {
    type: "基础信息",
    value: "",
    checked: false,
    fields: [
      {
        name: "箱长级别",
        validate: "必须为数字值",
        modelname: "fboxlength",
        focus: false,
        changed: false
      },
      {
        name: "发动机",
        validate: "最多20个字符",
        modelname: "fengine",
        focus: false,
        changed: false
      },
      {
        name: "变速箱",
        validate: "最多20个字符",
        modelname: "fgearBox",
        focus: false,
        changed: false
      },
      {
        name: "车身长度",
        validate: "必须为数字值",
        modelname: "fbodylength",
        focus: false,
        changed: false
      },
      {
        name: "车身宽度",
        validate: "必须为数字值",
        modelname: "fbodywidth",
        focus: false,
        changed: false
      },
      {
        name: "车身高度",
        validate: "必须为数字值",
        modelname: "fbodyheight",
        focus: false,
        changed: false
      },
      {
        name: "整车重量",
        validate: "必须为数字值",
        modelname: "fweight",
        focus: false,
        changed: false
      },
      {
        name: "额定载重",
        validate: "必须为数字值",
        modelname: "frateLoad",
        focus: false,
        changed: false
      },
      {
        name: "总重量",
        validate: "必须为数字值",
        modelname: "ftotalMass",
        focus: false,
        changed: false
      },
      {
        name: "吨位级别",
        validate: "必须为数字值",
        modelname: "ftonnageLevel",
        focus: false,
        changed: false
      },
      {
        name: "燃料种类",
        validate: "最多20个字符",
        modelname: "ffuelType",
        focus: false,
        changed: false
      }
    ]
  },
  {
    type: "货箱参数",
    value: "",
    checked: false,
    fields: [
      {
        name: "货箱形式",
        validate: "最多20个字符",
        modelname: "fcontainerForm",
        focus: false,
        changed: false
      },
      {
        name: "货箱长度",
        validate: "必须为数字值",
        modelname: "fcontainerlength",
        focus: false,
        changed: false
      },
      {
        name: "货箱宽度",
        validate: "必须为数字值",
        modelname: "fcontainerwidth",
        focus: false,
        changed: false
      },
      {
        name: "货箱高度",
        validate: "必须为数字值",
        modelname: "fcontainerheight",
        focus: false,
        changed: false
      }
    ]
  },
  {
    type: "驾驶室参数",
    value: "",
    checked: false,
    fields: [
      {
        name: "准乘人数",
        validate: "必须为数字值",
        modelname: "fpermitPassenger",
        focus: false,
        changed: false
      }
    ]
  },
  {
    type: "轮胎",
    value: "",
    checked: false,
    fields: [
      {
        name: "轮胎规格",
        validate: "最多20个字符",
        modelname: "ftyreSpec",
        focus: false,
        changed: false
      },
      {
        name: "轮胎数",
        validate: "必须为数字值",
        modelname: "ftyreNumber",
        focus: false,
        changed: false
      }
    ]
  },
  {
    type: "油箱",
    value: "",
    checked: false,
    fields: [
      {
        name: "油箱容量",
        validate: "必须为数字值",
        modelname: "ffuelCapacity",
        focus: false,
        changed: false
      }
    ]
  }
];
