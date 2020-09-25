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
          <template slot-scope="scope">
          <span v-for="item in scope.row.cn" :key="item.id">{{ toPosName(item.pos) }} &nbsp; {{ item.cn }} </span>
        </template>
        </el-table-column>
      </cm-table>

      <el-row class="mt10">
        <template v-if='adding'>
          <!-- <el-autocomplete
            size='small'
            v-model='addWord'
            :fetch-suggestions='querySearchAsync'
            placeholder='请输入'
          ></el-autocomplete> -->
          <h4 class="mb10 ml10">添加新的单词</h4>
          <el-input @input="checkExist" size='small' class="w200" v-model='addWord' placeholder='请输入英文' ref='addnew'></el-input>
          <template v-if='addWord'>
            <!-- <i v-if='canAdd' class="el-icon-error fz16 el-icon-success green-c"></i> -->
            <i v-if='!canAdd' class="el-icon-error fz16 red-c">exist</i>
          </template>
          <el-select v-model="addPos" placeholder="请选择词性" class="w200" size='small' required>
            <el-option
              v-for="item in posList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input size='small' class="w200" v-model='addCn' placeholder='中文'></el-input>
          <el-button v-if='canAdd && addWord && addPos' type="success" size="small" @click="confirmCreate" round>
            确认
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
          <!-- <el-button type="success" icon="el-icon-check" size="small" @click="confirmCreate" circle></el-button> -->
        </template>
        <el-button v-else type="success" icon="el-icon-plus" size="small" @click="openAddArea" round>添加未收录的单词</el-button>
      </el-row>

      <el-row class="mt20 ml10 mb5">
        <h4>本次添加关联的单词：</h4>
      </el-row>
      <el-row>
        <el-row v-if='multipleSelection && multipleSelection.length'>
          <el-col :span='3' class="tr-s">
            <span class="mr10 pos">选择的单词:</span>
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
              <template v-if="item.cn">
                {{ showList(item.cn) }}
              </template>
            </el-tag>
          </el-col>
        </el-row>
        <el-row class="mt10" v-if='createdList && createdList.length'>
          <el-col :span='3' class="tr-s">
            <span class="mr10 pos">新增的单词:</span>
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
              <template v-if="item.cn">
                {{ showList(item.cn) }}
              </template>
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
import api from '@/components/word/api.js'
export default {
  name: 'selectWordList',
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
      addWord: null,
      addPos: 1,
      addCn: null,
      posList: [
        {
          value: 1,
          label: 'n. 名词'
        },
        {
          value: 2,
          label: 'vi. 不及物动词'
        },
        {
          value: 3,
          label: 'vt. 及物动词'
        },
        {
          value: 4,
          label: 'pron. 代词'
        },
        {
          value: 5,
          label: 'adj. 形容词'
        },
        {
          value: 6,
          label: 'adv. 副词'
        },
        {
          value: 7,
          label: 'art. 冠词'
        },
        {
          value: 8,
          label: 'prep. 介词'
        },
        {
          value: 9,
          label: 'conj. 连词'
        },
        {
          value: 10,
          label: 'interj. 感叹词'
        }
      ]
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
      let postData = {
        en: this.addWord,
        cn: [
          {
            pos: this.addPos,
            cn: this.addCn || ''
          }
        ],
        pos: null,
        related_word: null,
        detail: {
          pronounce: null,
          link: null,
          picture: null,
          contain: null,
          remark: null
        }
        // en: this.addWord,
        // cn: null,
        // contain: null,
        // remark: null,
        // userId: this.$store.state.user.id
      }
      api.add(postData).then(res => {
        let newWord = res.data
        this.createdList.push(newWord)
        this.addWord = null
        this.addPos = 1
        this.addCn = null
        this.$refs.addnew.focus()
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
    },
    showList (arr) {
      let list = []
      arr.forEach(item => {
        list.push('  ' + this.toPosName(item.pos) + item.cn)
      })
      return list.join(' , ')
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
