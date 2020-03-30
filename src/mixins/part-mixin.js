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
    emitLeap (id, targetDetailType) {
      this.$emit('emitLeap', [
        id,
        targetDetailType
      ])
    },
    handleEditingListClose (item) {
      this.editingList.splice(this.editingList.indexOf(item), 1)
      this.deleteList.push(item)
    },
    handleAddedListClose (item) {
      this.addList.splice(this.addList.indexOf(item), 1)
    },
    confirmAdd (val) {
      this.addList = val
      this.$nextTick(() => {
        this.showDialog = false
      })
    },
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
    cancel () {
      this.addList = []
      this.editingList = []
      this.deleteList = []
      this.isEdit = false
    },
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
