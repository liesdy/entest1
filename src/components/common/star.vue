<template>
  <el-row class='star'>
    <!-- <h3>加入收藏</h3> -->
    <el-row class="ml10">
      <template v-if="baseData.starData">
        <el-row class="fz16" type='flex'>
          <el-col>
            <b class="blue-c mr10">{{ starType !== "article" ? baseData.en : baseData.title }}</b>
          </el-col>
        </el-row>
        <el-row class="mt10 pt10 pb15">
          <!-- <el-col class="tr-s"> -->
          <el-col>
            <el-switch
              active-color="#13ce66"
              v-model="stared">
            </el-switch>
            <!-- <span class="fz12 c95">{{ stared ? 'Σ(⊙▽⊙"a' : '╮（﹀＿﹀）╭'}}</span> -->
            <span class="fz12 c95">{{ stared ? '已收藏' : '未收藏'}}</span>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-row class="fz16">
          你将把 <b class="blue-c">{{ starType !== "article" ? baseData.en : baseData.title }}</b> 加入收藏
        </el-row>
      </template>
      <el-form :inline="true" v-if='stared'>
        <el-form-item label='收藏等级判定为:' class="mb5">
          <!-- <el-select>
            <el-option label='人畜不分' value="1"></el-option>
            <el-option label='雌雄难辨' value="2"></el-option>
            <el-option label='似是而非' value="3"></el-option>
            <el-option label='相见恨晚' value="4"></el-option>
            <el-option label='心有灵犀' value="5"></el-option>
          </el-select> -->
          <el-rate
            class='pt10'
            :texts='showedText'
            :colors='showedColor'
            v-model="hardLevel"
            show-text>
          </el-rate>
        </el-form-item>
        <p class="fz12 c95 mb10 mt10">修改收藏状态后请点击 确认 按钮进行提交</p>
      </el-form>
    </el-row>
    <el-row type="flex" justify="center" class="pb10 pt20">
      <el-button type="primary" size="small" round @click="submit">确 认</el-button>
      <el-button type="info" size="small" round @click="cancel">取 消</el-button>
    </el-row>
  </el-row>
</template>

<script>
import api from '@/common-api/starBase.js'
export default {
  name: 'star',
  props: {
    starType: {
      type: String,
      default: null
    },
    baseData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      stared: false,
      hardLevel: null,
      showedText: ['人畜不分', '雌雄难辨', '似是而非', '相见恨晚', '心有灵犀'],
      showedColor: { 1: '#f74747', 2: '#FF9900', 3: '#ddd700', 4: '#00df2e', 5: '#00d2ff' }
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    submit () {
      let postData = {
        id: this.baseData.id,
        isStar: this.stared,
        starType: this.starType,
        hardLevel: this.hardLevel
      }
      if (this.baseData.starData) {
        api.starEdit(postData).then(res => {
          if (res.data === 'success') {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$emit('dialogHandlerSuccess')
          }
        })
      } else {
        api.star(postData).then(res => {
          if (res.data === 'success') {
            this.$message({
              message: '添加收藏成功',
              type: 'success'
            })
            this.$emit('dialogHandlerSuccess')
          }
        })
      }
    },
    cancel () {
      this.$emit('cancel')
    }
  },
  mounted () {
    console.log('this.baseData: ', this.baseData)
    if (this.baseData.starData) {
      this.hardLevel = this.baseData.starData.hard_level
      this.stared = true
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  /* .star {
  } */
  .edit-frame .fade{
    display: none
  }
  .edit-frame:hover .fade {
    display: inline-block;
  }
  .rate-width {
    width: 72%;
  }
</style>
