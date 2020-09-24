<template>
  <el-row class='select-article-list'>
    <el-row class="filter-line">
      <el-autocomplete
        @select='handleFilterChange'
        class="w-input"
        size='small'
        v-model='filters.en.value'
        :fetch-suggestions='querySearchAsync'
        placeholder='英文'
      ></el-autocomplete>
      <el-input size='small' class="w-input" placeholder='中文' v-model='filters.cn.value'></el-input>
      <el-button type="primary" icon="el-icon-zoom-in" size="small" round  @click="handleFilterChange">筛选</el-button>
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
          label="词根">
        </el-table-column>
        <el-table-column
          prop="cn"
          label="含义"
          min-width="180">
        </el-table-column>
      </cm-table>
      <el-row class="mt10">
        <template v-if='adding'>
          <!-- <el-autocomplete
            size='small'
            v-model='addWordRoot'
            :fetch-suggestions='querySearchAsync'
            placeholder='请输入'
          ></el-autocomplete> -->
          <h4 class="mb10 ml10">添加新的词根</h4>
          <el-input @input="checkExist" size='small' class="w-input ml10" v-model='addWordRoot' placeholder='请输入词根' ref='addnew'></el-input>
          <template v-if='addWordRoot'>
            <!-- <i v-if='canAdd' class="el-icon-error fz16 el-icon-success green-c"></i> -->
            <i v-if='!canAdd' class="el-icon-error fz16 red-c">exist</i>
          </template>
          <el-input size='small' class="w200" v-model='addCn' placeholder='中文'></el-input>
          <el-button v-if='canAdd && addWordRoot' type="success" size="small" @click="confirmCreate" round>
            确认
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
          <!-- <el-button type="success" icon="el-icon-check" size="small" @click="confirmCreate" circle></el-button> -->
        </template>
        <el-button v-else type="success" icon="el-icon-plus" size="small" @click="openAddArea" round>添加未收录的词根</el-button>
      </el-row>
      <el-row class="mt20 ml10 mb5">
        <h4>本次添加关联的词根：</h4>
      </el-row>
      <el-row>
        <el-row v-if='multipleSelection && multipleSelection.length'>
          <el-col :span='3' class="tr-s">
            <span class="mr10 pos">选择的词根:</span>
          </el-col>
          <el-col :span='21'>
            <el-tag
              size='small'
              class='mr10 mt5'
              v-for='(item, index) in multipleSelection'
              :key='item.id'
              closable
              @close="handleCloseSelection(index)">
              {{ item.en }} {{ item.cn }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row class="mt10" v-if='createdList && createdList.length'>
          <el-col :span='3' class="tr-s">
            <span class="mr10 pos">新增的词根:</span>
          </el-col>
          <el-col :span='21'>
            <el-tag
              size='small'
              class='mr10 mt5'
              v-for='(item, index) in createdList'
              :key='item.id'
              closable
              @close="handleCloseCreated(index)">
              {{ item.en }} {{ item.cn }}
            </el-tag>
          </el-col>
        </el-row>
      </el-row>
      <el-row justify="center" type='flex' v-if='multipleSelection.length || createdList.length' class="mt10">
        <!-- {{addedArticleList}} -->
        <el-button type="danger" round size="small" @click='confirmAdd'>确认添加</el-button>
        <el-button type="info" round size="small" @click='cancel'>取消</el-button>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import selectMixin from '@/mixins/select-mixin'
import api from '@/components/wordRoot/api.js'
export default {
  name: 'selectWordRootList',
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
        },
        cn: {
          type: 'andLike',
          column: 'cn',
          value: null
        }
      },
      addWordRoot: null,
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
    confirmCreate () {
      let postData = {
        en: this.addWordRoot,
        cn: this.addCn,
        contain: null,
        remark: null,
        userId: this.$store.state.user.id
      }
      api.add(postData).then(res => {
        let newData = res.data
        this.createdList.push(newData)
        this.addWordRoot = null
        this.addCn = null
        this.$refs.addnew.focus()
        // console.log('res: ', res)
      })
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
