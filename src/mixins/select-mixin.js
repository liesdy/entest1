export default {
  name: 'index-mixin',
  components: {},
  data () {
    return {
      api: null,
      multipleSelection: [],
      createdList: [],
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
      detailType: 'word',
      titleOfType: {
        word: 'word detail',
        phrase: 'phrase detail',
        sententce: 'sententce detail',
        article: 'article detail'
      },
      componentNameOfType: {
        word: 'detailOfWords',
        phrase: 'detailOfPhrases',
        sententce: 'detailOfSentences',
        article: 'detailOfArticles'
      },
      adding: false,
      currentPage: 1,
      pageSize: 20,
      canAdd: false
    }
  },
  computed: {
    dialogTitle () {
      return this.titleOfType[this.detailType]
    },
    componentName () {
      return this.componentNameOfType[this.detailType]
    },
    addedDataList () {
      return this.multipleSelection.concat(this.createdList)
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    openAddArea () {
      this.adding = true
    },
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
    LeapTo (args) {
      this.choicedId = args[0]
      this.detailType = args[1]
    },
    handleCloseSelection (index) {
      this.multipleSelection.splice(index, 1)
    },
    handleCloseCreated (index) {
      this.createdList.splice(index, 1)
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
    checkExist (value) {
      let postData = {
        testData: value
      }
      this.api.checkExist(postData).then(res => {
        if (res.data === 'exist') {
          this.canAdd = false
        } else if (res.data === 'none') {
          this.canAdd = true
        }
      })
    },
    cancel () {
      this.$emit('cancelAdd')
    },
    confirmAdd () {
      this.$emit('confirmAdd', this.addedDataList)
    }
  },
  mounted () {
    this.findList()
  }
}
