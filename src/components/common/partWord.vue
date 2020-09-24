<template>
  <frameEdit
    :isEdit='isEdit'
    :history='hasHistory'
    @emitEdit='edit'
    @emitCancel='cancel'
    @emitSubmit='submit'
    @emitShowHistory='showHistory'>
    <el-form-item label="单词:">
      <template v-if='isEdit'>
        <!-- <el-tag
          class='mr10'
          :key="item.id"
          v-for="item in editingList"
          closable
          :disable-transitions="false"
          @close="handleClose(item)">
          {{item.title}}
        </el-tag> -->
        <el-tag
          class='mr10'
          :key="item.id"
          v-for="item in editingList"
          closable
          :disable-transitions="false"
          @close="handleEditingListClose(item)">
          {{item.en}} {{ item.cn ? (item.cn[0] ? item.cn[0]['cn'] : null) : null}}
        </el-tag>
        <el-tag
          class='mr10'
          :key="item.id"
          v-for="item in addList"
          closable
          :disable-transitions="false"
          @close="handleAddedListClose(item)">
          {{item.en}} {{ item.cn ? (item.cn[0] ? item.cn[0]['cn'] : null) : null}}
        </el-tag>
        <el-button @click="openSelectDialog" size="small" type="danger" icon="el-icon-plus" circle></el-button>
      </template>
      <template v-else>
        <p v-for='item in rootData.words' :key='item.id'>
          <el-button type='text' @click='emitLeap(item.id, "word")'>&nbsp;{{ item.en }} {{ item.cn ? (item.cn[0] ? item.cn[0]['cn'] : null) : null}}</el-button>
        </p>
      </template>
    </el-form-item>
    <el-dialog
      :close-on-click-modal='false'
      :modal='true'
      append-to-body
      title="Select Word"
      :visible.sync="showDialog"
      width="60%">
      <!-- <selectArticleList @confirmAdd='confirmAdd' v-if='showDialog'></selectArticleList> -->
      <component
        :is="componentName"
        v-if='showDialog'
        :historyList='historyList'
        dataName='word'
        dataType='en'
        @confirmAdd='confirmAdd'
        @cancelAdd='cancelAdd'>
      </component>
    </el-dialog>
  </frameEdit>
</template>

<script>
import api from '@/components/word/api.js'
import indexMixin from '@/mixins/part-mixin'
import { clone } from '@/utils/commonUtils'
export default {
  name: 'partWord',
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
      this.editingList = clone(this.rootData.words)
      this.isEdit = true
    },
    openSelectDialog () {
      this.showDialog = true
      this.componentName = 'selectWordList'
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
