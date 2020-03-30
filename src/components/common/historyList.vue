<template>
  <el-row class='history-list'>
    <el-timeline>
      <el-timeline-item :timestamp="formatTime(item.time)" placement="top" v-for="item in historyList" :key="item.id">
        <el-card hadow="always">
          <p>{{item.author.name}}:</p>
          <p v-if='item.dataListAdd && item.dataListAdd.length'>
            添加了
            <!-- <span v-for='(dataItem, index) in item.dataListAdd' :key='index'>{{dataItem.wordroot.en}}&nbsp;&nbsp;&nbsp;</span> -->
            <span v-for='(dataItem, index) in item.dataListAdd' :key='index'>{{dataItem[dataName + ''][dataType + '']}}&nbsp;&nbsp;&nbsp;</span>
          </p>
          <p v-if='item.dataListDelete && item.dataListDelete.length'>
            删除了
            <span v-for='(dataItem, index) in item.dataListDelete' :key='index'>{{dataItem[dataName + ''][dataType + '']}}&nbsp;&nbsp;&nbsp;</span>
          </p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-row>
</template>

<script>
// import selectMixin from '@/mixins/select-mixin'
// import api from '@/components/article/api.js'
import { formatTime } from '@/utils/commonUtils.js'
export default {
  name: 'historyList',
  // mixins: [selectMixin],
  props: {
    historyList: {
      type: Array,
      default () {
        return []
      }
    },
    dataName: {
      type: String,
      default: null
    },
    dataType: {
      type: String,
      default: 'en'
    }
    // isOpen: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data () {
    return {
      // api: api,
      // multipleSelection: [],
      // createdList: [],
      // filters: {
      //   title: {
      //     type: 'andEq',
      //     column: 'title',
      //     value: null
      //   },
      //   book: {
      //     type: 'andEq',
      //     column: 'book',
      //     value: null
      //   }
      // },
      // adding: false,
      // addTitle: null
    }
  },
  computed: {
    // addedArticleList () {
    //   return this.multipleSelection.concat(this.createdList)
    // }
  },
  watch: {
    // isOpen (val, oldVal) {
    //   if (oldVal && val !== oldVal) {
    //     this.rest()
    //   }
    // }
  },
  methods: {
    formatTime: formatTime
    // rest () {
    //   this.multipleSelection = []
    //   this.createdList = []
    // },
    // handleSelectionChange (val) {
    //   this.multipleSelection = val
    // },
    // openAddArea () {
    //   this.adding = true
    // },
    // confirmCreate () {
    //   let postData = {
    //     title: this.addTitle,
    //     userId: this.$store.state.user.id
    //   }
    //   api.add(postData).then(res => {
    //     let newWord = res.data
    //     this.createdList.push(newWord)
    //   })
    // },
    // // 查询并过滤
    // querySearchAsync (queryString, cb) {
    //   if (queryString && queryString.length > 1) {
    //     let postData = {
    //       title: queryString
    //     }
    //     this.api.search(postData).then((result) => {
    //       if (result.data && result.data.length) {
    //         let resList = result.data.map((item) => {
    //           item.value = item.title
    //           return item
    //         })
    //         cb(resList)
    //       }
    //     })
    //   }
    // },
    // confirmAdd () {
    //   this.$emit('confirmAdd', this.addedArticleList)
    // }
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
