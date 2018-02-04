<template>
  <div>
      <fleet 
      :nameAry='nameAry'
      :sinAry='sinAry'>
      </fleet>
  </div>
</template>

<script>
import fleet from './contractFleet'
export default {
  data() {
    return {
      nameAry:[
        {name:'车辆类型', dateAry:[{value:'1234566'},{value:'12345787'}]},
        {name:'车辆规格', dateAry:[{value:'1234566'}]},
        {name:'牌照类型', dateAry:[{value:'1234566'}]},
        {name:'启用状态', dateAry:[{value:'1234566'}]},
        {name:'车辆服务状态', dateAry:[{value:'1234566'}]}
      ],
      sinAry: [{
          date: '1',
          name: '漆学龙',
          address: '浙C37001'
        }, {
          date: '1',
          name: '飞飞',
          address: '浙C37001'
        }, {
          date: '1',
          name: '王小虎',
          address: '浙C37001'
        }, {
          date: '1',
          name: '圣诞节',
          address: '浙C37001'
        }
      ]
    }
  },
  methods: {
    
  },
  components: {
    fleet
  }
};
</script>