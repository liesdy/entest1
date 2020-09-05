<template>
  <div class='entry' ref="entry">
    <el-row type='flex' justify="center" class='m20 p20'>
      <el-col :span='12'>
        <el-autocomplete
          suffix-icon="el-icon-search"
          class='w100p'
          v-model='state'
          :fetch-suggestions='querySearchAsync'
          placeholder='请输入内容'
          @select='handleSelect'
        >
          <el-select v-model="searchType" slot="prepend" placeholder="请选择" class='w100'>
            <el-option
              v-for="item in searchTypeList"
              :label="item.label"
              :value="item"
              :key='item.value'>
            </el-option>
          </el-select>
        </el-autocomplete>
      </el-col>
    </el-row>

    <el-row class='mt10' type='flex' v-if='user'>
      <el-col :span='12'>
        <h3 class='tc-s chart-title'>站点统计</h3>
        <div v-if="totalHeight" ref="chart1" id="c1" class="chartbox" :style="{ width: '90%' , height: (0.4 * totalHeight) + 'px' }"></div>
      </el-col>
      <el-col :span='12'>
        <h3 class='tc-s chart-title'>我的关注</h3>
        <div v-if="totalHeight" ref="chart2" id="c2" class="chartbox" :style="{ width: '100%' , height: (0.4 * totalHeight) + 'px' }"></div>
      </el-col>
    </el-row>
    <el-row v-else>
      <h3 class='tc-s chart-title'>站点统计</h3>
      <div v-if="totalHeight" ref="chart3" id="c3" style="width:100%;height:500px"></div>
    </el-row>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="showDialog"
      :width="dialogWidth">
      <component
        v-if='showDialog'
        :acceptedId='choicedId'
        :is="componentName"
        @emitLeap='LeapTo'
        >
      </component>
    </el-dialog>
    <!-- <div v-if='wordData'>
      <p>英文: <span v-if='wordData.en'>{{ wordData.en }}</span></p>
      <p>中文: <span v-if='wordData.cn'>{{ wordData.cn }}</span></p>
      <p>词性: <span v-if='wordData.pos'>{{ wordData.pos }}</span></p>
      <div v-if='wordData.articles'>
        出现过的课文:
        <p v-for='article in wordData.articles' :key="article.id">
          <span>{{ article.book }}</span><span> 第{{ article.lesson }}课 </span><span>{{ article.title }}</span>
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import api from './entryApi.js'
import wordApi from '@/components/word/api.js'
import phraseApi from '@/components/phrase/api.js'
import sentenceApi from '@/components/sentence/api.js'
import articleApi from '@/components/article/api.js'
import bookApi from '@/components/book/api.js'
import wordRootApi from '@/components/wordRoot/api.js'
import indexMixin from '@/mixins/index-mixin'
import { Chart } from '@antv/g2'
export default {
  name: 'HelloWorld',
  mixins: [indexMixin],
  data () {
    return {
      searchTypeList: [
        {
          value: 'word',
          label: '单词',
          api: wordApi
        },
        {
          value: 'phrase',
          label: '短语',
          api: phraseApi
        },
        {
          value: 'sentence',
          label: '例句',
          api: sentenceApi
        },
        {
          value: 'article',
          label: '文章',
          api: articleApi
        },
        {
          value: 'book',
          label: '书本',
          api: bookApi
        },
        {
          value: 'wordroot',
          label: '词根',
          api: wordRootApi
        }
      ],
      currentApi: wordApi,
      searchType: {
        value: 'word',
        label: '单词',
        api: wordApi
      },
      detailType: 'word',
      state: null,
      totalShowed: false, // 是否已经渲染total图表
      totalHeight: null
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
    searchType (val, oldVal) {
      this.detailType = val.value
      this.currentApi = val.api
    },
    user (val, oldVal) {
      this.getTotal()
      if (val) {
        this.getUserStarData()
      }
    }
  },
  methods: {
    // 查询并过滤
    querySearchAsync (queryString, cb) {
      if (queryString && queryString.length > 1) {
        let postData = {
          en: queryString
        }
        // this.apiList[this.detailType].search(postData).then((result) => {
        this.currentApi.search(postData).then((result) => {
          if (result.data && result.data.length) {
            let resList = result.data.map((item) => {
              item.value = item.en
              return item
            })
            cb(resList)
          }
        })
      }
    },
    // 用来覆盖mixin中的同名方法,无实际用途，误删
    findList () {},
    // 前端筛选滤芯
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 选中下拉框中的内容时触发
    handleSelect (item) {
      let postData = {
        id: item.id
      }
      let vm = this
      // this.apiList[this.detailType].get(postData).then((result) => {
      this.currentApi.get(postData).then((result) => {
        vm.choicedId = result.data.id
        vm.showDialog = true
      })
    },
    getTotal () {
      let vm = this
      api.getTotal().then(res => {
        let totalData = res.data.totalNumberList
        vm.showTotalChart(totalData)
      })
    },
    getUserStarData () {
      let vm = this
      api.getUserStarData().then(res => {
        let userStarData = res.data.totalNumberList
        console.log('userStarData: ', userStarData)
        vm.showUserStarChart(userStarData)
      })
    },
    showTotalChart (totalData) {
      if (this.totalShowed) {
        return false
      }
      this.totalShowed = true
      // const option = {
      //   tooltip: {},
      //   xAxis: {
      //     data: ['单词', '短语', '例句', '文章', '书本', '词根']
      //   },
      //   yAxis: {},
      //   series: [{
      //     name: '统计',
      //     type: 'bar',
      //     data: totalData
      //   }]
      // }
      // this.initChart('chart1', option)
      // this.initChart('chart3', option)
      const data = [
        { type: '单词', value: totalData[0] },
        { type: '短语', value: totalData[1] },
        { type: '例句', value: totalData[2] },
        { type: '文章', value: totalData[3] },
        { type: '书本', value: totalData[4] },
        { type: '词根', value: totalData[5] }
      ]
      let container = this.user ? 'c1' : 'c3'
      const chart = new Chart({
        container: container, // 指定图表容器 ID
        autoFit: true, // 指定图表宽度
        height: '300px' // 指定图表高度
      })
      chart.data(data)
      chart.legend(false)
      chart.interval().position('type*value').color('type')
      chart.render()
    },
    showUserStarChart (userStarData) {
      const chart = new Chart({
        container: 'c2',
        // theme: 'dark',
        // theme: {
        //   defaultColor: 'red'
        // },
        // width: this.height * 1.4,
        autoFit: true,
        height: this.height * 0.7
      })
      chart.data(userStarData)
      chart
        .interval()
        .adjust('stack')
        .position('value')
        .color('name')
      chart.coordinate('polar').transpose()
      chart.legend({
        position: 'right',
        itemWidth: 80,
        maxWidth: 80
      })
      chart.render()
      // const option = {
      //   tooltip: {
      //     trigger: 'item',
      //     formatter: '{a} <br/>{b}: {c} ({d}%)'
      //   },
      //   series: {
      //     name: '分类',
      //     type: 'pie',
      //     data: userStarData.filter(item => item.value > 0)
      //   },
      //   textStyle: {
      //     color: 'rgba(100, 100, 100, 0.6)'
      //   },
      //   lineStyle: {
      //     color: 'rgba(100, 100, 100, 0.3)'
      //   }
      // }
      // this.initChart('chart2', option)
    },
    initChart (refsName, option) {
      // let chartNode = this.$refs[refsName]
      // if (chartNode) {
      //   let thisChart = this.$echarts.init(chartNode)
      //   thisChart.setOption(option)
      //   window.addEventListener('resize', function () {
      //     thisChart.resize()
      //   })
      // }
    },
    onResize () {
      this.clientHeight = null
      if (this.$refs.entry) {
        this.$nextTick(() => {
          this.totalHeight = this.$refs.entry.clientHeight
        })
      }
      // this.totalHeight = window.document.body.clientHeight
    }
  },
  mounted () {
    this.getTotal()
    this.onResize()
    window.addEventListener('resize', this.onResize)
    if (this.user) {
      this.getUserStarData()
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.entry {
  height: 100%;
}
.chart-title {
  position: relative;
  /* top: 20px; */
  font-weight: normal;
  margin-bottom: 20px;
  font-size: 20px;
  color: #777;
  text-shadow:0px 3px 3px #ddd;
}
.chartbox {
  margin-left: auto;
  margin-right: auto;
}
</style>
