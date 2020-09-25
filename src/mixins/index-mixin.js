import { checkToken } from '@/utils/auth'
export default {
  name: 'index-mixin',
  components: {},
  data () {
    return {
      api: null,
      // tableData: null,
      baseData: {
        tableData: [],
        page: {
          total: null
        }
      },
      filters: {},
      showDialog: false,
      isAdd: false,
      choicedId: null,
      postFilter: [],
      detailType: null,
      titleOfType: {
        word: 'word detail',
        phrase: 'phrase detail',
        sentence: 'sentence detail',
        article: 'article detail',
        wordroot: 'wordroot detail',
        book: 'book detail'
      },
      componentNameOfType: {
        word: 'detailOfWords',
        phrase: 'detailOfPhrases',
        sentence: 'detailOfSentences',
        article: 'detailOfArticles',
        wordroot: 'detailOfWordroot',
        book: 'detailOfBook'
      },
      currentPage: 1,
      pageSize: 10,
      dialogWidth: '900px'
    }
  },
  computed: {
    dialogTitle () {
      return this.titleOfType[this.detailType]
    },
    componentName () {
      return this.componentNameOfType[this.detailType]
    },
    user () {
      if (this.$store.state.user) {
        return this.$store.state.user
      } else {
        return null
      }
    }
  },
  methods: {
    // 筛选栏变动时触发
    handleFilterChange (item) {
      this.postFilter = []
      let vm = this
      for (var query in vm.filters) {
        this.postFilter.push(vm.filters[query + ''])
      }
      this.findList()
    },
    pageChange (val) {
      this.pageSize = val.size
      this.currentPage = val.currentPage
      this.findList()
    },
    findList () {
      let vm = this
      let postData = {
        filter: vm.postFilter,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      vm.api.list(postData).then((result) => {
        if (result.data) {
          vm.baseData = result.data
          vm.showDialog = false
        }
      })
    },
    openDialog (add, detailType, row) {
      this.dialogWidth = '900px'
      this.detailType = detailType
      if (add) {
        if (checkToken('登录后可添加新的内容')) {
          this.isAdd = true
          this.choicedId = null
        } else {
          return false
        }
      } else {
        this.isAdd = false
        this.choicedId = row.id
      }
      this.showDialog = true
    },
    LeapTo (args) {
      this.choicedId = args[0]
      this.detailType = args[1]
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
    dialogHandlerSuccess () {
      this.findList()
    },
    levelColor (row) {
      switch (row.starData.hard_level) {
        case 1:
          return 'color-level1'
        case 2:
          return 'color-level2'
        case 3:
          return 'color-level3'
        case 4:
          return 'color-level4'
        case 5:
          return 'color-level5'
        default:
          break
      }
    }
  },
  mounted () {
    this.findList()
  }
}
