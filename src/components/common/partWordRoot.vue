<template>
  <frameEdit
    :isEdit='isEdit'
    :history='hasHistory'
    @emitEdit='edit'
    @emitCancel='cancel'
    @emitSubmit='submit'
    @emitShowHistory='showHistory'>
    <el-form-item label="词根:">
      <template v-if='isEdit'>
        <el-tag
          class='mr10'
          :key="item.id"
          v-for="item in editingList"
          closable
          :disable-transitions="false"
          @close="handleEditingListClose(item)">
          {{item.en}} {{item.cn}}
        </el-tag>
        <el-tag
          class='mr10'
          :key="item.id"
          v-for="item in addList"
          closable
          :disable-transitions="false"
          @close="handleAddedListClose(item)">
          {{item.en}} {{item.cn}}
        </el-tag>
        <el-button @click="openSelectDialog" size="small" type="danger" icon="el-icon-plus" circle></el-button>
      </template>
      <template v-else>
        <p v-for='item in rootData.wordsroot' :key='item.id'>
          <el-button type='text' @click='emitLeap(item.id, "wordroot")'>&nbsp;{{ item.en }} {{ item.cn }}</el-button>
        </p>
      </template>
    </el-form-item>
    <el-dialog
      :modal='true'
      append-to-body
      title="Select WordRoot"
      :visible.sync="showDialog"
      width="60%">
      <component
        :is="componentName"
        v-if='showDialog'
        :historyList='historyList'
        dataName='wordroot'
        @confirmAdd='confirmAdd'
        @cancelAdd='cancelAdd'>
      </component>
    </el-dialog>
  </frameEdit>
</template>

<script>
import api from '@/components/wordRoot/api.js'
import indexMixin from '@/mixins/part-mixin'
import { clone } from '@/utils/commonUtils'
export default {
  name: 'partWordRoot',
  mixins: [indexMixin],
  props: {
  },
  data () {
    return {
      api: api
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    edit () {
      this.editingList = clone(this.rootData.wordsroot)
      this.isEdit = true
    },
    openSelectDialog () {
      this.showDialog = true
      this.componentName = 'selectWordRootList'
    }
  },
  mounted () {
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .from {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
</style>
