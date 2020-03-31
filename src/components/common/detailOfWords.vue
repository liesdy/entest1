<template>
  <el-form label-position="right" label-width="80px">
    <el-row class="edit-frame">
      <el-col :span='20'>
        <template v-if='isView'>
          <div class="just-show">
            <el-form-item label="英文:">
              <span>{{rootData.en}}</span>
            </el-form-item>
            <el-form-item label="中文:">
              <span>{{rootData.cn}}</span>
            </el-form-item>
            <el-form-item label="词性:">
              <span>{{rootData.pos}}</span>
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
          <el-form-item label="中文:">
            <el-input v-model='rootData2.cn' class="w-input"></el-input>
          </el-form-item>
          <el-form-item label="词性:">
            <el-select v-model="rootData2.pos" placeholder="请选择" class="w-input">
              <el-option
                v-for="item in posList"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发音:">
            <el-input v-if='rootData2.detail' v-model='rootData2.detail.pronounce' class="w-input"></el-input>
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
              <el-form-item label="中文:">
                <span>{{item.cn}}</span>
              </el-form-item>
              <el-form-item label="词性:">
                <span>{{item.pos}}</span>
              </el-form-item>
              <el-form-item label="发音:">
                <span>{{item.pronounce}}</span>
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
        cn: null,
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
        'n. 名词',
        'vi. 不及物动词',
        'vt. 及物动词',
        'pron. 代词',
        'adj. 形容词',
        'adv. 副词',
        'art. 冠词',
        'prep. 介词',
        'conj. 连词',
        'interj. 感叹词'
      ]
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
