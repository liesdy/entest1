<template>
  <div class='word'>
    <el-row class="filter-line">
      <el-autocomplete
        size='small'
        v-model='filters.en.value'
        :fetch-suggestions='querySearchAsync'
        placeholder='英文'
        @select='handleFilterChange'
      ></el-autocomplete>
      <el-button type="primary" icon="el-icon-zoom-in" size="small" round @click='handleFilterChange'>筛选</el-button>
      <el-button type="success" icon="el-icon-plus" size="small" @click="openDialog(true, 'sentence')" round>新增</el-button>
    </el-row>
    <cm-table
      :pageDefaultSize='10'
      :baseData='baseData'
      @pageChange='pageChange'>
      <el-table-column
        prop="en"
        label="英文"
        width="140">
      </el-table-column>
      <el-table-column
        prop="cn"
        label="中文"
        width="140">
      </el-table-column>
      <el-table-column
        width="300"
        label="出处">
        <template slot-scope="scope" v-if='scope.row.article'>
          <p class="from" v-for='article in scope.row.article' :key='article.id'>
            <span class='c95 fz12' v-if='article.book'>{{ article.book }} - </span>
            <span class='c95 fz12' v-if='article.lesson'>Lesson{{ article.lesson }}</span><br>
            <span>{{ article.title }}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="viewCount"
        label="浏览人数"
        width="80">
      </el-table-column>
      <el-table-column
        v-if="user"
        prop="myViewCount"
        label="我的浏览"
        width="80">
      </el-table-column>
      <el-table-column
        prop="stared"
        width="80"
        label="收藏">
        <template slot-scope="scope">
          <!-- 收藏 -->
          <starIcon :baseData='scope.row' starType='sentence' @dialogHandlerSuccess='dialogHandlerSuccess'></starIcon>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="MORE">
        <template slot-scope="scope">
          <el-button @click="openDialog(false, 'sentence', scope.row)" type="primary" size="small" round>详情</el-button>
        </template>
      </el-table-column>
    </cm-table>
    <!-- <detailOfPhrases
      :add='isAdd'
      :show.sync='showDialog'
      :acceptedId='choicedId'>
    </detailOfPhrases> -->
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
  name: 'sentence',
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
        },
        level: {
          type: 'andEq',
          column: 'level',
          value: null
        }
      },
      detailType: 'sentence'
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

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .from {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
</style>
