<template>
  <el-row class='list-box'>
    <el-table
      :data="baseData.tableData"
      @selection-change="handleSelectionChange"
      style="width: 100%">
      <slot></slot>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-size='pageDefaultSize'
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="baseData.page.total">
    </el-pagination>
  </el-row>
</template>

<script>
export default {
  name: 'cmTable',
  components: {
  },
  props: {
    baseData: {
      type: Object,
      default () {
        return {}
      }
    },
    pageDefaultSize: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      page: {
        size: 10,
        currentPage: 1
      }
    }
  },
  watch: {
    // baseData (val, oldVal) {
    //   if (val) {
    //     this.page.currentPage = val.currentPage
    //   }
    // }
  },
  methods: {
    // 监听表格中选中行的变更
    handleSelectionChange (val) {
      this.$emit('selectionChange', val)
    },
    // 监听分页每页数量变化
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      // console.log('this.page: ', this.page)
      this.page.size = val
      this.$emit('pageChange', this.page)
    },
    // 监听当前页变化
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // console.log('this.page: ', this.page)
      this.page.currentPage = val
      this.$emit('pageChange', this.page)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .from {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
</style>
