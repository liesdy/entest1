import { formatTime, clone } from '@/utils/commonUtils.js'
export default {
  name: 'detail-mixin',
  components: {},
  props: {
    add: {
      type: Boolean,
      default: false
    },
    acceptedId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      api: null,
      isView: false,
      detailId: null,
      visible: false,
      isAdd: false,
      historyList: [],
      showHistoryDialog: false,
      canAdd: false,
      rootData2: {}
    }
  },
  computed: {
  },
  methods: {
    formatTime: formatTime,
    clone: clone,
    confirmAdd () {
      if (this.canAdd && (this.rootData2.en || this.rootData2.title)) {
        this.api.add(this.rootData2).then(res => {
          if (res.data && res.data.id) {
            this.detailId = res.data.id
            this.getDetail()
          }
        })
      }
    },
    emitLeap (args) {
      this.$emit('emitLeap', args)
    },
    getDetail () {
      let postData = {
        id: this.detailId
      }
      let vm = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.api.get(postData).then((result) => {
        vm.rootData = result.data
        loading.close()
        vm.isAdd = false
        vm.isView = true
      })
    },
    upDateBaseDetail () {
      let postData = this.rootData2
      this.api.update(postData).then(res => {
        if (res.data && res.data === 'success') {
          this.$message('更新成功')
          this.getDetail()
          // this.isView = true
          // this.isAdd = false
        }
      })
    },
    updated () {
      this.getDetail()
      console.log('updated: ')
    },
    edit () {
      this.rootData2 = this.clone(this.rootData)
      this.$nextTick(() => {
        this.isView = false
        this.isAdd = false
      })
    },
    cancel () {
      this.isView = true
      this.isAdd = false
    },
    showHistory () {
      let postData = {
        id: this.detailId
      }
      let vm = this
      this.api.getHistory(postData).then(res => {
        vm.historyList = res.data
        vm.showHistoryDialog = true
        console.log('res.data:', res.data)
      })
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
    }
  },
  mounted () {
    this.isAdd = this.add
    if (this.add) {
      this.rootData2 = this.clone(this.rootData)
      this.$nextTick(() => {
        this.isView = false
        this.isAdd = true
      })
    } else {
      this.isView = true
    }
    if (this.acceptedId) {
      this.detailId = this.acceptedId
      this.getDetail()
    }
  }
}
