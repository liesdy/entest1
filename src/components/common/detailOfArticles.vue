<template>
  <el-form label-position="right" label-width="80px">
    <el-row class="edit-frame">
      <el-col :span='20'>
        <template v-if='isView'>
          <div class="just-show">
            <el-form-item label="标题:">
              <span>{{rootData.title}}</span>
            </el-form-item>
            <el-form-item label="来源:">
              <span>{{rootData.book.book_name}}</span><span v-if='rootData.lesson'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lesson{{rootData.lesson}}</span>
            </el-form-item>
            <el-form-item label="英文:">
              <!-- <template v-html="rootData.en"></template> -->
              <div v-html="rootData.en"></div>
              <!-- <span>{{rootData.en}}</span> -->
            </el-form-item>
            <el-form-item label="中文:">
              <!-- <span>{{rootData.detail.cn}}</span> -->
              <div v-html="rootData.detail.cn"></div>
            </el-form-item>
            <el-form-item label="详情:">
              <!-- <span>{{rootData.detail.contain}}</span> -->
              <div v-html="rootData.detail.contain"></div>
            </el-form-item>
            <el-form-item label="备注:" >
              <span>{{rootData.detail.remark}}</span>
            </el-form-item>
          </div>
        </template>
        <template v-else>
          <el-form-item label="标题">
            <el-input v-model='rootData2.title' @input="checkExist" class="w-input"></el-input>
            <template v-if='rootData2.en && isAdd'>
              <i v-if='canAdd' class="el-icon-error fz16 el-icon-success green-c"></i>
              <i v-else class="el-icon-error fz16 red-c">exist</i>
            </template>
          </el-form-item>
          <el-form-item label="来源:">
            <!-- <el-select v-model="rootData2.book" placeholder="请选择书籍" class="w-input">
              <el-option
                v-for="item in bookList"
                :key="item"
                :label="item.book_name"
                :value="item">
              </el-option>
            </el-select> -->
            <el-select
              v-if='rootData2.book'
              class="w-input"
              v-model="rootData2.book"
              value-key='book_name'
              filterable
              allow-create
              default-first-option
              placeholder="请选择书籍">
              <el-option
                v-for="item in bookList"
                :key="item.book_name"
                :label="item.book_name"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="英文">
            <!-- <el-input v-model='rootData2.en' class="w-input"></el-input> -->
            <editor v-model='rootData2.en'></editor>
          </el-form-item>
          <el-form-item label="中文">
            <!-- <el-input v-if='rootData2.detail' v-model='rootData2.detail.cn' class="w-input"></el-input> -->
            <editor v-if='rootData2.detail' v-model='rootData2.detail.cn'></editor>
          </el-form-item>
          <el-form-item label="详情:">
            <!-- <el-input v-if='rootData2.detail' v-model='rootData2.detail.contain' class="w-input" type="textarea"></el-input> -->
            <editor v-if='rootData2.detail' v-model='rootData2.detail.contain'></editor>
          </el-form-item>
          <el-form-item label="备注:" >
            <el-input v-if='rootData2.detail' v-model='rootData2.detail.remark' class="w-input"></el-input>
          </el-form-item>
        </template>
      </el-col>
      <el-col :span='4'>
        <!-- 确认修改 -->
        <el-button class='fade' @click="upDateBaseDetail" v-if='!isAdd && !isView' type="success" icon="el-icon-check" circle size='small'></el-button>
        <!-- 取消 -->
        <el-button class='fade' type="info" @click="cancel" v-if='!isAdd && !isView' icon="el-icon-close" circle size='small'></el-button>
        <el-button class='fade' type="primary" @click="edit" v-if='isView' icon="el-icon-edit" circle size='small'></el-button>
        <el-button class='fade' v-if='isView' @click="showHistory" type="warning" icon="el-icon-time" circle size='small'></el-button>
      </el-col>
    </el-row>
    <!-- 确认添加 -->
    <el-row type="flex" justify="center" v-if='isAdd'>
      <el-button @click="confirmAdd" type="primary" round>确认添加</el-button>
    </el-row>

    <template v-if='!isAdd'>
      <partWord
        class="mt10"
        :rootData='rootData'
        detailType='article'
        @emitLeap='emitLeap'
        @updated='updated'>
      </partWord>
      <partPhrase
        class="mt10"
        :rootData='rootData'
        detailType='article'
        @emitLeap='emitLeap'
        @updated='updated'>
      </partPhrase>
      <partSentence
        class="mt10"
        :rootData='rootData'
        detailType='article'
        @emitLeap='emitLeap'
        @updated='updated'>
      </partSentence>
    </template>

    <el-dialog
      :modal='false'
      title="detail base history"
      :visible.sync="showHistoryDialog"
      width="60%">
      <el-timeline>
        <el-timeline-item :timestamp="formatTime(new Date(item.time))" placement="top" v-for="item in historyList" :key="item.id">
          <el-card hadow="always">
            <p class="mb10 pb10">{{item.author.name}} <span v-if='item.add'>创建了{{item.en}}的基础信息</span><span v-else>将 {{item.title}} 的基础信息修改为</span>:</p>
            <el-form class="just-show">
              <el-form-item label="来源:">
                <span>{{item.book.book_name}}</span><span v-if='item.lesson'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lesson{{item.lesson}}</span>
              </el-form-item>
              <el-form-item label="英文:">
                <span>{{item.en}}</span>
              </el-form-item>
              <el-form-item label="中文:">
                <span>{{item.cn}}</span>
              </el-form-item>
              <el-form-item label="详情:">
                <span>{{item.contain}}</span>
              </el-form-item>
              <el-form-item label="备注:" >
                <span>{{item.remark}}</span>
              </el-form-item>
            </el-form>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </el-form>
</template>

<script>
import api from '../article/api.js'
import bookApi from '../book/api.js'
import indexMixin from '@/mixins/detail-mixin'
export default {
  name: 'detailOfArticles',
  mixins: [indexMixin],
  props: {
  },
  data () {
    return {
      api: api,
      bookList: [],
      rootData: {
        title: null,
        en: null,
        book: {
          id: null,
          book_name: null
        },
        lesson: null,
        detail: {
          cn: null,
          contain: null,
          link: null,
          picture: null,
          remark: null
        }
      }
    }
  },
  watch: {
  },
  methods: {
    getBookList () {
      let vm = this
      bookApi.listsimple().then(res => {
        vm.bookList = res.data
      })
    },
    upDateBaseDetail () {
      let postData = this.rootData2
      let vm = this
      api.update(postData).then(res => {
        if (res.data && res.data === 'success') {
          vm.$message('更新成功')
          vm.getBookList()
          vm.$nextTick(() => {
            vm.getDetail()
          })
          // this.isView = true
          // this.isAdd = false
        }
      })
    }
  },
  mounted () {
    this.getBookList()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .from {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
  .edit-frame .fade{
    display: none
  }
  .edit-frame:hover .fade {
    display: inline-block;
  }
  .just-show {
    .el-form-item {
      margin-bottom: 0;
      /deep/ .el-form-item__content,/deep/ .el-form-item__label {
        line-height: 36px;
        font-size: 14px;
      }
    }
  }
</style>
