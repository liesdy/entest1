<template>
  <div class="comment">
    <!-- <h3>留言</h3>
    <el-row>
    </el-row> -->
    <el-form ref="form" label-width="80px">
      <template v-if="!fold">
        <el-form-item label="留言:">
          <template v-if="commentList && commentList.length">
            <div v-for='item in commentList' :key='item.id' class="comment-item">
              <el-row class='title-line'>
                <el-col :span='16' class="name">{{ item.auther.name }}:</el-col>
                <el-col :span='8' class="tr-s">{{ formatTime(new Date(item.time)) }}</el-col>
              </el-row>
              <el-row class='content-line'>
                {{ item.contain }}
              </el-row>
            </div>
          </template>
          <template v-else>
            <el-row type='flex' justify="center" class="tip">
              暂无留言
            </el-row>
          </template>
        </el-form-item>
        <el-form-item label="发表:">
          <el-input
            ref='testarea'
            type="textarea"
            :rows="3"
            :placeholder="user ? '请输入内容' : '登录后可提交留言'"
            :disabled="!user"
            v-model="content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addComment" :disabled="!user">留言</el-button>
        </el-form-item>
      </template>
      <el-row class="show-control">
        <el-form-item>
          <p v-if='fold' @click="fold = false">展开留言</p>
          <p v-else @click="fold = true">收起留言</p>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { formatTime } from '@/utils/commonUtils.js'
import api from '@/common-api/commentBase.js'
export default {
  name: 'Comment',
  props: {
    targetType: String,
    targetId: [String, Number]
  },
  data () {
    return {
      content: '',
      commentList: [],
      fold: true // 默认折叠
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
    formatTime,
    addComment () {
      api.addComment({
        type: this.targetType,
        targetId: this.targetId,
        authorId: this.user.id,
        contain: this.content
      }).then(res => {
        this.getCommentList()
        this.$message('提交成功')
        console.log('res: ', res)
      })
    },
    getCommentList () {
      api.getCommentList({
        type: this.targetType,
        targetId: this.targetId
      }).then(res => {
        console.log('res: ', res)
        this.commentList = res.data
      })
    }
  },
  mounted () {
    this.getCommentList()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  .comment {
    border-top: 1px solid #efefef;
    border-width: thin;
    margin-top: 20px;
    padding-top: 20px;
    padding-right: 80px;
  }
  .tip {
    padding-top: 20px 0;
    line-height: 40px;
    color: #cccccc;
  }
  .comment-item {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .comment-item + .comment-item {
    /* border-top: 1px solid #efefef;
    border-width: thin */
  }
  .title-line {
    font-size: 12px;
    color: #cccccc;
    line-height: 30px;
    height: 30px;
    padding-left: 5px;
  }
  .title-line .name {
    color: #0077ff;
  }
  .content-line {
    padding-left: 20px;
    font-size: 14px;
    background: rgba(230, 230, 230, 0.4);
    border-radius: 10px
  }
  .show-control {
    text-align: center;
    color: #0077ff;
  }
  .show-control >>> .el-form-item__content {
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
  }
  .show-control >>> .el-form-item__content:hover{
    background: rgba(240, 240, 240, 0.5);
  }
</style>
