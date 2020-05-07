<template>
  <div class='word'>
    <el-row class="filter-line">
      <el-autocomplete
        v-model='filters.en.value'
        :fetch-suggestions='querySearchAsync'
        placeholder='英文'
        @select='handleFilterChange'
      ></el-autocomplete>
      <el-button type="primary" icon="el-icon-zoom-in" size="small" round @click='handleFilterChange'>筛选</el-button>
      <el-button type="success" icon="el-icon-plus" size="small" @click="openDialog(true, 'wordroot')" round>新增</el-button>
    </el-row>
    <!-- <el-row class='list-box'>
      <el-table
        :data="tableData"
        style="width: 100%"> -->
    <cm-table
      :pageDefaultSize='10'
      :baseData='baseData'
      @pageChange='pageChange'>
      <el-table-column
        prop="en"
        label="英文"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="cn"
        label="中文"
        min-width="140">
      </el-table-column>
      <el-table-column
        width="140"
        label="MORE">
        <template slot-scope="scope">
          <el-button @click="openDialog(false, 'wordroot', scope.row)" type="primary" size="small" round>详情</el-button>
        </template>
      </el-table-column>
    </cm-table>
      <!-- </el-table>
    </el-row> -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showDialog"
      :before-close='findList'
      :width="dialogWidth">
      <component
        v-if='showDialog'
        :add='isAdd'
        :acceptedId='choicedId'
        :is="componentName"
        @emitLeap='LeapTo'
        >
      </component>
    </el-dialog>
  </div>
</template>

<script>
import indexMixin from '../../mixins/index-mixin'
import api from './api.js'
export default {
  name: 'word',
  mixins: [indexMixin],
  components: {
  },
  data () {
    return {
      api: api,
      filters: {
        en: {
          type: 'andLike',
          column: 'en',
          value: null
        }
      },
      detailType: 'wordroot'
    }
  },
  watch: {
  },
  methods: {
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
