<template>
  <el-form label-position="right" label-width="80px" :model="rootData2" :rules="rules" ref="ruleForm">
    <el-row class="edit-frame" type="flex" align="middle">
      <el-col :span='20'>
        <template v-if='isView'>
          <div class="just-show">
            <el-form-item label="书名:">
              <span>{{rootData.book_name}}</span> <starIcon :baseData='rootData' :inDetail='true'  starType='book' @dialogHandlerSuccess='dialogHandlerSuccess'></starIcon>
            </el-form-item>
            <el-form-item label="详情:">
              <span v-html="rootData.contain"></span>
            </el-form-item>
            <el-form-item label="备注:" >
              <span>{{rootData.remark}}</span>
            </el-form-item>
          </div>
        </template>
        <template v-else>
          <el-form-item label="书名:" prop="book_name">
            <el-input v-model='rootData2.book_name' @input="checkExist" class="w-input"></el-input>
            <template v-if='rootData2.book_name && isAdd'>
              <i v-if='canAdd' class="el-icon-error fz16 el-icon-success green-c"></i>
              <i v-else class="el-icon-error fz16 red-c">exist</i>
            </template>
          </el-form-item>
           <el-form-item label="详情:">
            <editor  v-model='rootData2.contain'></editor>
          </el-form-item>
          <el-form-item label="备注:" >
            <el-input v-model='rootData2.remark' class="w-input"></el-input>
          </el-form-item>
        </template>
      </el-col>
      <el-col :span='4'>
        <!-- 确认修改 -->
        <el-button class='fade' @click="upDateBaseDetail('ruleForm')" v-if='!isAdd && !isView' type="success" icon="el-icon-check" circle size='small'></el-button>
        <!-- 取消 -->
        <el-button class='fade' type="info" @click="cancel" v-if='!isAdd && !isView' icon="el-icon-close" circle size='small'></el-button>
        <el-button class='fade' type="primary" @click="edit" v-if='isView && user' icon="el-icon-edit" circle size='small'></el-button>
        <el-button class='fade' v-if='isView' @click="showHistory" type="warning" icon="el-icon-time" circle size='small'></el-button>
      </el-col>
    </el-row>
    <el-row v-if='!isAdd'>
      <Comment v-if='rootData && rootData.id' targetType='book' :targetId='rootData.id'></Comment>
    </el-row>
    <!-- 确认添加 -->
    <el-row type="flex" justify="center" v-if='isAdd'>
      <el-button @click="confirmAdd('ruleForm')" type="primary" round>确认添加</el-button>
    </el-row>

    <el-dialog
      :modal='true'
      append-to-body
      title="detail base history"
      :visible.sync="showHistoryDialog"
      width="60%">
      <el-timeline>
        <el-timeline-item :timestamp="formatTime(new Date(item.time))" placement="top" v-for="item in historyList" :key="item.id">
          <el-card hadow="always">
            <p class="mb10 pb10">{{item.author.name}} <span v-if='item.add'>创建了{{item.en}}的基础信息</span><span v-else>将 {{item.en}} 的基础信息修改为</span>:</p>
            <el-form class="just-show">
              <el-form-item label="书名:">
                <span>{{item.book_name}}</span>
              </el-form-item>
              <el-form-item label="详情:">
                <span v-html="item.contain"></span>
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
import api from '../book/api.js'
import detailMixin from '@/mixins/detail-mixin'
// import { formatTime } from '@/utils/commonUtils.js'
export default {
  name: 'detailOfBook',
  mixins: [detailMixin],
  components: {
  },
  props: {
  },
  data () {
    return {
      api: api,
      // isView: false,
      rootData: {
        book_name: null,
        contain: null,
        remark: null
      },
      rules: {
        book_name: [
          { required: true, message: '请输入书名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  mounted () {
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
  .edit-frame {
    border-radius: 5px;
    transition: all 0.4s;
  }
  .edit-frame .fade{
    /* display: none */
    transition: all 0.4s;
    opacity: 0;
  }
  .edit-frame:hover {
    /* transition: all 0.8s; */
    background: rgba(240, 240, 240, 0.4)
  }
  .edit-frame:hover .fade {
    /* transition: all 0.8s; */
    opacity: 1;
    /* display: inline-block; */
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
  .edit-frame2 .fade2{
    display: none
  }
  .edit-frame2:hover .fade2 {
    display: inline-block;
  }
  .mb {
    margin-bottom: 20px;
  }
</style>
