<template>
  <el-row class='select-article-list'>
    <el-row class="filter-line">
      <el-autocomplete
        size='small'
        v-model='filters.title.value'
        :fetch-suggestions='querySearchAsync'
        placeholder='课文标题'
        @select='handleFilterChange'
      ></el-autocomplete>
      <el-button type="primary" icon="el-icon-zoom-in" size="small" round @click="handleFilterChange">筛选</el-button>
      <!-- <el-select size='small' placeholder='请选择课本' v-model='filters.book.value'></el-select> -->
    </el-row>
    <el-row class='list-box'>
      <cm-table
        :pageDefaultSize='10'
        :baseData='baseData'
        @selectionChange="handleSelectionChange"
        @pageChange='pageChange'>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="title"
          min-width="180"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="book"
          label="课本"
          min-width="180">
          <template slot-scope="scope">
            <span v-if='scope.row.book'>{{ scope.row.book.book_name }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="lesson"
          label="序号"
          min-width="80">
          <template slot-scope="scope">
            <span v-if='scope.row.lesson'>Lesson {{ scope.row.lesson }}</span>
          </template>
        </el-table-column> -->
      </cm-table>
      <el-row class="mt10">
        <template v-if='adding'>
          <!-- <el-autocomplete
            size='small'
            @input="checkExist"
            v-model='addTitle'
            :fetch-suggestions='querySearchAsync'
            placeholder='请输入标题'
          ></el-autocomplete> -->
          <h4 class="mb10 ml10">添加新的课文</h4>
          <el-input @input="checkExist" size='small' class="w-input ml10" v-model='addTitle' placeholder='请输入标题' ref='addnew'></el-input>
          <template v-if='addTitle'>
            <!-- <i v-if='canAdd' class="el-icon-error fz16 el-icon-success green-c"></i> -->
            <i v-if='!canAdd' class="el-icon-error fz16 red-c">exist</i>
          </template>
          <el-button v-if='canAdd && addTitle' type="success" size="small" @click="confirmCreate" round>
            确认
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </template>
        <el-button v-else type="success" icon="el-icon-plus" size="small" @click="openAddArea" round>添加未收录的文章</el-button>
      </el-row>
      <el-row class="mt20 ml10 mb5">
        <h4>本次添加关联的课文：</h4>
      </el-row>
      <el-row>
        <el-row v-if='multipleSelection && multipleSelection.length'>
          <el-col :span='3' class="tr-s">
            <span class="mr10 pos">选择的课文:</span>
          </el-col>
          <el-col :span='21'>
            <el-tag
              size='small'
              class='mr10 mt5'
              v-for='(item, index) in multipleSelection'
              :key='item.id'
              closable
              @close="handleCloseSelection(index)">
              {{ item.title }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row class="mt10" v-if='createdList && createdList.length'>
          <el-col :span='3' class="tr-s">
            <span class="mr10 pos">新增的课文:</span>
          </el-col>
          <el-col :span='21'>
            <el-tag
              size='small'
              class='mr10 mt5'
              v-for='(item, index) in createdList'
              :key='item.id'
              closable
              @close="handleCloseCreated(index)">
              {{ item.title }}
            </el-tag>
          </el-col>
        </el-row>
      </el-row>
      <el-row justify="center" type='flex' v-if='multipleSelection.length || createdList.length' class="mt10">
        <el-button type="danger" round size="small" @click='confirmAdd'>确认添加</el-button>
        <el-button type="info" round size="small" @click='cancel'>取消</el-button>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import selectMixin from '@/mixins/select-mixin'
import api from '@/components/article/api.js'
export default {
  name: 'selectArticleList',
  mixins: [selectMixin],
  props: {
    // isOpen: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      api: api,
      filters: {
        title: {
          type: 'andLike',
          column: 'title',
          value: null
        },
        book: {
          type: 'andEq',
          column: 'book',
          value: null
        }
      },
      addTitle: null
    }
  },
  computed: {
  },
  watch: {
    // isOpen (val, oldVal) {
    //   if (oldVal && val !== oldVal) {
    //     this.rest()
    //   }
    // }
  },
  methods: {
    confirmCreate () {
      if (this.addTitle && this.canAdd) {
        let postData = {
          title: this.addTitle,
          en: null,
          book: {
            id: null,
            book_name: null
          },
          lesson: null,
          detail: {
            cn: null,
            contain: null,
            link: null,
            picture: null,
            remark: null
          },
          userId: this.$store.state.user.id
        }
        api.add(postData).then(res => {
          let newWord = res.data
          this.createdList.push(newWord)
          this.addTitle = null
          this.$refs.addnew.focus()
        })
      }
    },
    // 查询并过滤
    querySearchAsync (queryString, cb) {
      if (queryString && queryString.length > 1) {
        let postData = {
          keyData: queryString
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
  .edit-frame .fade{
    display: none
  }
  .pos {
    position: relative;
    top: 8px;
  }
  .edit-frame:hover .fade {
    display: inline-block;
  }
  .list-box {
    padding-bottom: 20px;
  }
</style>
