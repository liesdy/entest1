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
      <!-- <el-select size='small' v-model="filters.level.value" placeholder="单词等级" @change="handleFilterChange" clearable>
        <el-option label="1" :value="1" />
        <el-option label="2" :value="2" />
        <el-option label="3" :value="3" />
        <el-option label="4" :value="4" />
      </el-select>
      <el-input size='small' v-model='filters.phrase.value' class='w-input' placeholder="短语"></el-input> -->
      <el-button type="primary" icon="el-icon-zoom-in" size="small" round @click='handleFilterChange'>筛选</el-button>
      <el-button type="success" icon="el-icon-plus" size="small" @click="openDialog(true, 'word')" round>新增</el-button>
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
        width="140">
      </el-table-column>
      <el-table-column
        prop="cn"
        label="中文"
        width="140">
        <template slot-scope="scope" v-if='scope.row.cn'>
          <p v-for='(item, index) in scope.row.cn' :key="index">
            {{ toPosName(item.pos) }} &nbsp; {{item.cn}}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        width="300"
        label="出处">
        <template slot-scope="scope" v-if='scope.row.article'>
          <p class="from" v-for='article in scope.row.article' :key='article.id'>
            <span class='c95 fz12' v-if='article.book'>{{ article.book.book_name }} - </span>
            <!-- <span class='c95 fz12' v-if='article.lesson'>Lesson{{ article.lesson }}</span><br> -->
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
          <starIcon :baseData='scope.row' starType='word' @dialogHandlerSuccess='dialogHandlerSuccess'></starIcon>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="MORE">
        <template slot-scope="scope">
          <el-button @click="openDialog(false, 'word', scope.row)" type="primary" size="small" round>详情</el-button>
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
        :row='choicedRow'
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
import { toPosName } from '@/utils/commonUtils'
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
        },
        level: {
          type: 'andEq',
          column: 'level',
          value: null
        },
        phrase: {
          type: 'andLike',
          column: 'phrase__en',
          value: null
        }
      },
      detailType: 'word',
      choicedRow: null
    }
  },
  watch: {
  },
  methods: {
    toPosName
    // showStarDialog (row) {
    //   this.choicedRow = row
    //   this.dialogWidth = '400px'
    //   this.detailType = 'star'
    //   this.showDialog = true
    // }
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
