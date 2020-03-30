<template>
  <frameEdit
    :isEdit='isEdit'
    :history='hasHistory'
    @emitEdit='edit'
    @emitCancel='cancel'
    @emitSubmit='submit'
    @emitShowHistory='showHistory'>
    <el-form-item label="课文:">
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
          {{item.title}}
        </el-tag>
        <el-tag
          class='mr10'
          :key="item.id"
          v-for="item in addList"
          closable
          :disable-transitions="false"
          @close="handleAddedListClose(item)">
          {{item.title}}
        </el-tag>
        <el-button @click="openSelectDialog" size="small" type="danger" icon="el-icon-plus" circle></el-button>
      </template>
      <template v-else>
        <p v-for='item in rootData.article' :key='item.id'>
          <span>{{ item.book }} </span>
          <span v-if='item.lesson'>&nbsp;&nbsp; Lesson{{ item.lesson }} ——</span>
          <el-button type='text' @click='emitLeap(item.id, "article")'>&nbsp;{{ item.title }}</el-button>
        </p>
      </template>
    </el-form-item>
    <el-dialog
      :modal='false'
      title="Select Article"
      :visible.sync="showDialog"
      width="60%">
      <!-- <selectArticleList @confirmAdd='confirmAdd' v-if='showDialog'></selectArticleList> -->
      <component
        :is="componentName"
        v-if='showDialog'
        :historyList='historyList'
        dataName='article'
        dataType='title'
        @confirmAdd='confirmAdd'
        @cancelAdd='cancelAdd'>
      </component>
    </el-dialog>
  </frameEdit>
</template>

<script>
import api from '@/components/article/api.js'
import indexMixin from '@/mixins/part-mixin'
import { clone } from '@/utils/commonUtils'
export default {
  name: 'partArticle',
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
      this.editingList = clone(this.rootData.article)
      this.isEdit = true
    },
    openSelectDialog () {
      this.showDialog = true
      this.componentName = 'selectArticleList'
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
