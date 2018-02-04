<template>
  <div>
    <tab-common-bg
    :menuList='menuList'
    :nestingMenu='nestingMenu'>
        <div>
          <el-table :data="tableData" border style="width: 50%">
            <el-table-column prop="date" label="日期"  width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180" :filters="[{ text: '高飞', value: '高飞' }, { text: '小军', value: '小军' }]" :filter-method="filterTag" filter-placement="bottom-end">
            </el-table-column>
            <el-table-column prop="address" label="地址" width="398":formatter="formatter">
            </el-table-column>
            <el-table-column prop="tag" label="标签" width="200" :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]" :filter-method="filterTags" filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <paging 
          :pageArry='[50,80,100]'
          @handleSizeChange='getTitle'
          @setCurrentPage='getCurrentPage'
          :total='total'
          :currentPageSize='80'
          :currentPage='2'
          >
          </paging>
        </div>
    </tab-common-bg>
  </div>
</template>

<script>
import AMap from 'AMap'
import paging from '@/components/public/paging'
import tabCommonBg from '@/components/public/commonBg'
import sidebar from "@/components/public/sidebar";
export default {
  data () {
    return {
      total:325,
      menuList:[
          {name:'导航一', number:'2', icon:'el-icon-menu', routerPath:'test3'}
      ],
      nestingMenu:[
          {name:'导航一', number:'1', icon:'el-icon-message', children:[
            {name:'子导航一', number:'1-1', routerPath:'test'},
          ]}
      ],
      tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '小军',
          address: '上海市普陀区金沙江路 1517 弄',
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '高飞',
          address: '上海市普陀区金沙江路 1519 弄',
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          tag: '公司'
      }]
    }
  },
  methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.name === value;
      },
      filterTags(value, row) {
        return row.tag === value;
      },
      getTitle(titleNumber){
         console.log(titleNumber)
      },
      getCurrentPage(titleNumber){
         console.log(titleNumber)
      }
  },
  components: {
    paging,
    tabCommonBg,
    sidebar
  }
}
</script>