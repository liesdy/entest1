<template>
  <frameEdit
    :isEdit='isEdit'
    :history='hasHistory'
    @emitEdit='edit'
    @emitCancel='cancel'
    @emitSubmit='submit'
    @emitShowHistory='showHistory'>
    <el-form-item label="例句:">
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
        <p v-for='item in rootData.sentence' :key='item.id'>
          <span>{{ item.book }} </span>
          <el-button type='text' @click='emitLeap(item.id, "sentence")'>&nbsp;{{ item.en }}  {{ item.cn }}</el-button>
        </p>
      </template>
    </el-form-item>
    <el-dialog
      :modal='true'
      append-to-body
      title="Select Sentence"
      :visible.sync="showDialog"
      width="60%">
      <!-- <selectArticleList @confirmAdd='confirmAdd' v-if='showDialog'></selectArticleList> -->
      <component
        :is="componentName"
        v-if='showDialog'
        :historyList='historyList'
        dataName='sentence'
        dataType='en'
        @confirmAdd='confirmAdd'
        @cancelAdd='cancelAdd'>
      </component>
    </el-dialog>
  </frameEdit>
</template>

<script>
import api from '@/components/sentence/api.js'
import indexMixin from '@/mixins/part-mixin'
import { clone } from '@/utils/commonUtils'
export default {
  name: 'partSentence',
  mixins: [indexMixin],
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
      api: api
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    edit () {
      this.editingList = clone(this.rootData.sentence)
      this.isEdit = true
    },
    openSelectDialog () {
      this.showDialog = true
      this.componentName = 'selectSentenceList'
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
