<template>
  <el-row class='edit-frame'>
    <el-col :span='20'>
      <slot></slot>
    </el-col>
    <el-col :span='4'>
      <!-- isEdit: {{ isEdit }} -->
      <el-button class='fade' v-if='isEdit' @click="submit" size="small" type="success" icon="el-icon-check" circle></el-button>
      <el-button class='fade' v-if='isEdit' @click="cancel" size="small" type="info" icon="el-icon-close" circle></el-button>
      <el-button class='fade' v-if='!isEdit && user' @click="edit" size="small" type="primary" icon="el-icon-edit" circle></el-button>
      <el-button class='fade' v-if='!isEdit && history' @click="showHistory" size="small" type="warning" icon="el-icon-time" circle></el-button>
    </el-col>
  </el-row>
</template>

<script>
/**
 * 详情页每个部分的框架，包括左边的显示和右边的 提交 取消 编辑 查看历史 这几个按钮
 */
export default {
  name: 'frameEdit',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    history: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addData: []
    }
  },
  computed: {
    user () {
      if (this.$store.state.user) {
        return this.$store.state.user
      } else {
        return null
      }
    }
  },
  watch: {
  },
  methods: {
    submit () {
      this.$emit('emitSubmit')
    },
    cancel () {
      this.$emit('emitCancel')
    },
    edit () {
      this.$emit('emitEdit')
    },
    showHistory () {
      this.$emit('emitShowHistory')
    }
  },
  mounted () {
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .edit-frame .fade{
    display: none
  }
  .edit-frame:hover .fade {
    display: inline-block;
  }
</style>
