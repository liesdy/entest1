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
        article: 'article detail'
      },
      componentNameOfType: {
        word: 'detailOfWords',
        phrase: 'detailOfPhrases',
        sentence: 'detailOfSentences',
        article: 'detailOfArticles'
      },
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    dialogTitle () {
      return this.titleOfType[this.detailType]
    },
    componentName () {
      return this.componentNameOfType[this.detailType]
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
        }
      })
    },
    openDialog (add, detailType, row) {
      this.detailType = detailType
      if (add) {
        this.isAdd = true
        this.choicedId = null
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
          en: queryString
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
    this.findList()
  }
}
