<template>
  <el-form label-position="right" label-width="80px" :model="rootData2" :rules="rules" ref="ruleForm">
    <el-row class="edit-frame">

      <!-- 基础信息左侧 -->
      <el-col :span='20'>
        <template v-if='isView'>
          <div class="just-show">
            <el-form-item label="英文:">
              <span>{{rootData.en}}</span> <starIcon :baseData='rootData' :inDetail='true'  starType='word' @dialogHandlerSuccess='dialogHandlerSuccess'></starIcon>
            </el-form-item>
            <el-form-item label="释义:">
              <p v-for='(item, index) in rootData.cn' :key="index">
                {{ toName(item.pos) }}  {{item.cn}}
              </p>
            </el-form-item>
            <el-form-item label="发音:">
              <span>{{rootData.detail.pronounce}}</span>
            </el-form-item>
            <el-form-item label="详情:">
              <!-- <span >{{rootData.detail.contain}}</span> -->
              <span v-html="rootData.detail.contain"></span>
            </el-form-item>
            <el-form-item label="备注:" >
              <span>{{rootData.detail.remark}}</span>
            </el-form-item>
          </div>
        </template>
        <template v-else>
          <el-form-item label="英文:">
            <el-input v-model='rootData2.en' @input="checkExist" class="w-input"></el-input>
            <template v-if='rootData2.en && isAdd'>
              <i v-if='canAdd' class="el-icon-error fz16 el-icon-success green-c"></i>
              <i v-else class="el-icon-error fz16 red-c">exist</i>
            </template>
          </el-form-item>
          <el-form-item label="发音:">
            <el-input v-if='rootData2.detail' v-model='rootData2.detail.pronounce' class="w-input"></el-input>
          </el-form-item>
          <el-form-item label="中文:">
            <el-row
              v-for='(cnitem, index) in rootData2.cn'
              :key='index'
              class="edit-frame2 mb">
              <el-col :span="10">
                <el-form-item
                  :prop="'cn.' + index + '.pos'"
                  :rules="{
                    required: true, message: '词性不能为空', trigger: 'change'
                  }"
                  label-width='0'>
                  <el-select v-model="cnitem.pos" placeholder="请选择词性" class="w-input" required>
                    <el-option
                      v-for="item in posList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item
                  :prop="'cn.' + index + '.cn'"
                  :rules="{
                    required: true, message: '中文释义不能为空', trigger: 'blur'
                  }"
                  label-width='0'>
                  <el-input v-model='cnitem.cn' class="w-input" placeholder="请填写中文释义" required></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button v-if='index == rootData2.cn.length - 1' type="primary" @click="addcn" icon="el-icon-plus" circle size='small'></el-button>
                <el-button class='fade2' type="danger" @click="deletecn(index)" icon="el-icon-delete" circle size='small'></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="详情:">
            <!-- <el-input v-if='rootData2.detail' v-model='rootData2.detail.contain' type="textarea"></el-input> -->
            <editor v-if='rootData2.detail' v-model='rootData2.detail.contain'></editor>
          </el-form-item>
          <el-form-item label="备注:" >
            <el-input v-if='rootData2.detail' v-model='rootData2.detail.remark' class="w-input"></el-input>
          </el-form-item>
        </template>
      </el-col>

      <!-- 基础信息右侧 -->
      <el-col :span='4'>
        <!-- <el-row class="mb10">
          <span>收藏状态</span> <starIcon :baseData='rootData'></starIcon>
        </el-row> -->
        <el-row>
          <!-- 确认修改 -->
          <el-button class='fade' @click="upDateBaseDetail('ruleForm')" v-if='!isAdd && !isView' type="success" icon="el-icon-check" circle size='small'></el-button>
          <!-- 取消 -->
          <el-button class='fade' type="info" @click="cancel" v-if='!isAdd && !isView' icon="el-icon-close" circle size='small'></el-button>
          <!-- 编辑 -->
          <el-button class='fade' type="primary" @click="edit" v-if='isView' icon="el-icon-edit" circle size='small'></el-button>
          <!-- 查看历史 -->
          <el-button class='fade' v-if='isView' @click="showHistory" type="warning" icon="el-icon-time" circle size='small'></el-button>
        </el-row>
      </el-col>

    </el-row>
    <!-- 确认添加 -->
    <el-row type="flex" justify="center" v-if='isAdd'>
      <el-button @click="confirmAdd('ruleForm')" type="primary" round>确认添加</el-button>
    </el-row>

    <template v-if='!isAdd'>
      <partWordRoot
        class="mt10"
        :rootData='rootData'
        detailType='word'
        @emitLeap='emitLeap'
        @updated='updated'>
      </partWordRoot>
      <partPhrase
        class="mt10"
        :rootData='rootData'
        detailType='word'
        @emitLeap='emitLeap'
        @updated='updated'>
      </partPhrase>
      <partSentence
        class="mt10"
        :rootData='rootData'
        detailType='word'
        @emitLeap='emitLeap'
        @updated='updated'>
      </partSentence>
      <partArticle
        :rootData='rootData'
        detailType='word'
        @emitLeap='emitLeap'
        @updated='updated'>
      </partArticle>
    </template>

    <el-dialog
      :modal='false'
      title="detail base history"
      :visible.sync="showHistoryDialog"
      width="60%">
      <el-timeline>
        <el-timeline-item :timestamp="formatTime(new Date(item.time))" placement="top" v-for="item in historyList" :key="item.id">
          <el-card hadow="always">
            <p class="mb10 pb10">{{item.author.name}} <span v-if='item.add'>创建了{{item.en}}的基础信息</span><span v-else>将 {{item.en}} 的基础信息修改为</span>:</p>
            <el-form class="just-show">
              <el-form-item label="英文:">
                <span>{{item.en}}</span>
              </el-form-item>
              <el-form-item label="释义:">
                <span v-for='(cnitem, index) in rootData.cn' :key="index">
                  {{ toName(cnitem.pos) }}  {{cnitem.cn}}
                </span>
                <!-- <span>{{item.cn}}</span> -->
              </el-form-item>
              <el-form-item label="发音:">
                <span>{{item.pronounce}}</span>
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
import api from '../word/api.js'
import indexMixin from '@/mixins/detail-mixin'
// import { formatTime } from '@/utils/commonUtils.js'
export default {
  name: 'detailOfWords',
  mixins: [indexMixin],
  components: {
  },
  props: {
  },
  data () {
    return {
      api: api,
      // isView: false,
      rootData: {
        en: null,
        cn: [
          {
            pos: null,
            cn: null
          }
        ],
        pos: null,
        related_word: null,
        detail: {
          pronounce: null,
          link: null,
          picture: null,
          contain: null,
          remark: null
        }
      },
      posList: [
        {
          value: 1,
          label: 'n. 名词'
        },
        {
          value: 2,
          label: 'vi. 不及物动词'
        },
        {
          value: 3,
          label: 'vt. 及物动词'
        },
        {
          value: 4,
          label: 'pron. 代词'
        },
        {
          value: 5,
          label: 'adj. 形容词'
        },
        {
          value: 6,
          label: 'adv. 副词'
        },
        {
          value: 7,
          label: 'art. 冠词'
        },
        {
          value: 8,
          label: 'prep. 介词'
        },
        {
          value: 9,
          label: 'conj. 连词'
        },
        {
          value: 10,
          label: 'interj. 感叹词'
        }
      ]
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getDetail () {
      let postData = {
        id: this.detailId
      }
      let vm = this
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      api.get(postData).then((result) => {
        vm.rootData = result.data
        if (!vm.rootData.detail) {
          vm.rootData.detail = {
            cn: null,
            contain: null,
            link: null,
            picture: null,
            remark: null
          }
        }
        if (!vm.rootData.cn || vm.rootData.cn.length < 1) {
          vm.rootData.cn = [
            {
              pos: null,
              cn: null
            }
          ]
        }
        loading.close()
        vm.isAdd = false
        vm.isView = true
      })
    },
    addcn () {
      this.rootData2.cn.push({
        pos: null,
        cn: null
      })
    },
    deletecn (index) {
      if (this.rootData2.cn && this.rootData2.cn.length > 1) {
        this.rootData2.cn.splice(index, 1)
      } else {
        this.$message('不...不能再删了...')
      }
    },
    toName (index) {
      let posList = [
        'n.',
        'vi.',
        'vt.',
        'pron.',
        'adj.',
        'adv.',
        'art.',
        'prep.',
        'conj.',
        'interj.'
      ]
      return posList[index - 1]
    }
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
