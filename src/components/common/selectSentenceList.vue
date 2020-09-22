<template>
  <el-row class='select-article-list'>
    <el-row class="filter-line">
      <el-autocomplete
        size='small'
         @select='handleFilterChange'
        v-model='filters.en.value'
        :fetch-suggestions='querySearchAsync'
        placeholder='请输入'
      ></el-autocomplete>
      <!-- <el-select size='small' placeholder='请选择课本' v-model='filters.book.value'></el-select> -->
      <!-- <el-autocomplete
        v-model='filters.book.value'
        :fetch-suggestions='querySearchAsync'
        placeholder='请输入课本'
      ></el-autocomplete> -->
      <!-- <el-autocomplete
        v-model='filters.lesson.value'
        :fetch-suggestions='querySearchAsync'
        placeholder='请选择第几课'
      ></el-autocomplete> -->
      <el-button type="primary" icon="el-icon-zoom-in" size="small" round  @select='handleFilterChange'>筛选</el-button>
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
          prop="en"
          min-width="180"
          label="英文">
        </el-table-column>
        <el-table-column
          prop="cn"
          label="中文"
          min-width="180">
        </el-table-column>
      </cm-table>
      <el-row class="mt10">
        <template v-if='adding'>
          <!-- <el-autocomplete
            size='small'
            v-model='addSentence'
            :fetch-suggestions='querySearchAsync'
            placeholder='请输入'
          ></el-autocomplete> -->
          <h4 class="mb10">添加新的例句</h4>
          <el-input @input="checkExist" size='small' class="w-input" v-model='addSentence' placeholder='请输入例句'></el-input>
          <template v-if='addSentence'>
            <!-- <i v-if='canAdd' class="el-icon-error fz16 el-icon-success green-c"></i> -->
            <i v-if='!canAdd' class="el-icon-error fz16 red-c">exist</i>
          </template>
          <el-input size='small' class="w200" v-model='addCn' placeholder='中文'></el-input>
          <el-button v-if='canAdd && addSentence' type="success" size="small" @click="confirmCreate" round>
            确认
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
          <!-- <el-button type="success" icon="el-icon-check" size="small" @click="confirmCreate" circle></el-button> -->
        </template>
        <el-button v-else type="success" icon="el-icon-plus" size="small" @click="openAddArea" round>添加未收录的例句</el-button>
      </el-row>
      <el-row class="mt10">
        <h4>新添加关联的例句：</h4>
      </el-row>
      <el-row>
        <el-row v-if='multipleSelection && multipleSelection.length'>
          <el-col :span='3' class="tr-s">
            <span class="mr10 pos">选择的例句:</span>
          </el-col>
          <el-col :span='21'>
            <el-tag
              size='small'
              class='mr10 mt5'
              v-for='(item, index) in multipleSelection'
              :key='item.id'
              closable
              @close="handleCloseSelection(index)">
              {{ item.en }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row class="mt10" v-if='createdList && createdList.length'>
          <el-col :span='3' class="tr-s">
            <span class="mr10 pos">新增的例句:</span>
          </el-col>
          <el-col :span='21'>
            <el-tag
              size='small'
              class='mr10 mt5'
              v-for='(item, index) in createdList'
              :key='item.id'
              closable
              @close="handleCloseCreated(index)">
              {{ item.en }}
            </el-tag>
          </el-col>
        </el-row>
      </el-row>
      <el-row justify="center" type='flex' v-if='multipleSelection.length || createdList.length'>
        <el-button type="danger" round size="small" @click='confirmAdd'>确认添加</el-button>
        <el-button type="info" round size="small" @click='cancel'>取消</el-button>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import selectMixin from '@/mixins/select-mixin'
import api from '@/components/sentence/api.js'
export default {
  name: 'selectSentenceList',
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
        en: {
          type: 'andLike',
          column: 'en',
          value: null
        }
      },
      addSentence: null,
      addCn: null
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
    // rest () {
    //   this.multipleSelection = []
    //   this.createdList = []
    // },
    confirmCreate () {
      let postData = {
        en: this.addSentence,
        cn: this.addCn,
        contain: null,
        remark: null,
        userId: this.$store.state.user.id
      }
      api.add(postData).then(res => {
        let newSentence = res.data
        this.createdList.push(newSentence)
      })
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
              item.value = item.en
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
</style>
