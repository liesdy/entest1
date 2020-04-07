<template>
  <div class='word'>
    <el-row class="filter-line">
      <el-autocomplete
        v-model='filters.en.value'
        :fetch-suggestions='querySearchAsync'
        placeholder='英文'
        @select='handleFilterChange'
      ></el-autocomplete>
      <el-select v-model="filters.level.value" placeholder="单词等级" @change="handleFilterChange" clearable>
        <el-option label="1" :value="1" />
        <el-option label="2" :value="2" />
        <el-option label="3" :value="3" />
        <el-option label="4" :value="4" />
      </el-select>
      <el-input v-model='filters.phrase.value' class='w-input' placeholder="短语"></el-input>
      <el-button type="primary" icon="el-icon-zoom-in" size="small" round @click='handleFilterChange'>筛选</el-button>
      <el-button type="success" icon="el-icon-plus" size="small" @click="openDialog(true, 'word')" round>新增</el-button>
    </el-row>
    <!-- <el-row class='list-box'>
      <el-table
        :data="tableData"
        style="width: 100%"> -->
    <cm-table
      :pageDefaultSize='20'
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
            {{ toName(item.pos) }} &nbsp; {{item.cn}}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        prop="pos"
        width="80"
        label="词性">
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
        prop="level"
        label="Level">
      </el-table-column>
      <el-table-column
        prop="stared"
        label="收藏">
        <template slot-scope="scope">
          <i v-if='scope.row.stared' class="el-icon-star-on"></i>
          <i v-else class="el-icon-star-off"></i>
        </template>
      </el-table-column>
      <el-table-column
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
      width="900px">
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
      detailType: 'word'
    }
  },
  watch: {
  },
  methods: {
    toName (index) {
      let posList = [
        'n.',
        'vi.',
        'vt.',
        'pron.',
        'adj.',
        'adv.',
        'art.',
        'prep.',
        'conj.',
        'interj.'
      ]
      return posList[index - 1]
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
