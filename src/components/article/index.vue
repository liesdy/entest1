<template>
  <div class='word'>
    <el-row class="filter-line">
      <el-autocomplete
        size='small'
        v-model='filters.title.value'
        :fetch-suggestions='querySearchAsync'
        placeholder='英文'
        @select='handleFilterChange'
      ></el-autocomplete>
      <el-button type="primary" icon="el-icon-zoom-in" size="small" round @click='handleFilterChange'>筛选</el-button>
      <el-button type="success" icon="el-icon-plus" size="small" @click="openDialog(true, 'article')" round>新增</el-button>
    </el-row>
    <cm-table
      :baseData='baseData'
      @pageChange='pageChange'>
      <el-table-column
        prop="title"
        label="标题"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="book"
        label="课本"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="lesson"
        label="序号"
        min-width="140">
      </el-table-column>
      <el-table-column
        prop="stared"
        label="收藏">
        <template slot-scope="scope">
          <!-- 收藏 -->
          <starIcon :baseData='scope.row' starType='article' @dialogHandlerSuccess='dialogHandlerSuccess'></starIcon>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="MORE">
        <template slot-scope="scope">
          <el-button @click="openDialog(false, 'article', scope.row)" type="primary" size="small" round>详情</el-button>
        </template>
      </el-table-column>
    </cm-table>
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
        @emitLeap='LeapTo'>
      </component>
    </el-dialog>
  </div>
</template>

<script>
import indexMixin from '../../mixins/index-mixin'
import api from './api.js'
export default {
  name: 'article',
  mixins: [indexMixin],
  components: {
  },
  data () {
    return {
      api: api,
      filters: {
        title: {
          type: 'andLike',
          column: 'title',
          value: null
        }
        // level: {
        //   type: 'andEq',
        //   column: 'level',
        //   value: null
        // }
      },
      detailType: 'article',
      pageSize: 10
    }
  },
  watch: {
  },
  methods: {
    // 查询并过滤
    querySearchAsync (queryString, cb) {
      if (queryString && queryString.length > 1) {
        let postData = {
          title: queryString
        }
        this.api.search(postData).then((result) => {
          if (result.data && result.data.length) {
            let resList = result.data.map((item) => {
              item.value = item.title
              return item
            })
            cb(resList)
          }
        })
      }
    }
  },
  mounted () {
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .from {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
</style>
