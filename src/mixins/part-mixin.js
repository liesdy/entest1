// import { formatTime } from '@/utils/commonUtils.js'
export default {
  name: 'part-mixin',
  components: {},
  props: {
    rootData: {
      type: Object,
      default () {
        return {}
      }
    },
    detailType: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      isEdit: false,
      showDialog: false,
      editingList: [],
      addList: [],
      deleteList: [],
      historyList: [],
      hasHistory: true,
      componentName: ''
    }
  },
  computed: {
  },
  methods: {
    // 通过点击目标的 id 和 类型 跳转至目标对应的详情
    emitLeap (id, targetDetailType) {
      this.$emit('emitLeap', [
        id,
        targetDetailType
      ])
    },
    // 编辑状态下删除之前已有的标签列表中的标签
    handleEditingListClose (item) {
      this.editingList.splice(this.editingList.indexOf(item), 1)
      this.deleteList.push(item)
    },
    // 编辑状态下删除此次添加的标签列表中的标签
    handleAddedListClose (item) {
      this.addList.splice(this.addList.indexOf(item), 1)
    },
    // 通过选择弹窗的添加按钮确认添加新选择的关联对象
    confirmAdd (val) {
      this.addList = val
      this.$nextTick(() => {
        this.showDialog = false
      })
    },
    // 关闭关联弹窗，取消关联
    cancelAdd () {
      this.showDialog = false
    },
    // submit () {
    //   let vm = this
    //   let postData = {
    //     id: this.rootData.id,
    //     addList: this.addList,
    //     deleteList: this.deleteList,
    //     detailType: this.detailType
    //   }
    //   this.api.updateWords(postData).then(res => {
    //     vm.isEdit = false
    //     vm.$emit('updated')
    //     this.addList = []
    //     this.editingList = []
    //     this.deleteList = []
    //   })
    // },
    // 提交详情页中每个关联部分的修改
    submit () {
      let vm = this
      let postData = {
        id: this.rootData.id,
        addList: this.addList,
        deleteList: this.deleteList,
        detailType: this.detailType
      }
      this.api.updateIncludeDetail(postData).then(res => {
        vm.isEdit = false
        vm.$emit('updated')
        this.addList = []
        this.editingList = []
        this.deleteList = []
      })
    },
    // 取消修改
    cancel () {
      this.addList = []
      this.editingList = []
      this.deleteList = []
      this.isEdit = false
    },
    // 查看历史
    showHistory () {
      let postData = {
        id: this.rootData.id,
        detailType: this.detailType
      }
      let vm = this
      console.log('this.detailType: ', this.detailType)
      this.api.relateHistory(postData).then(res => {
        vm.historyList = res.data
        vm.showDialog = true
        vm.componentName = 'historyList'
      })
    }
  },
  mounted () {
  }
}
