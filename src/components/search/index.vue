<template>
  <div class='hello'>
    <!-- <el-input v-model='input' placeholder='请输入内容' @input="searchEn"></el-input> -->
    <el-autocomplete
      v-model='state'
      :fetch-suggestions='querySearchAsync'
      placeholder='请输入内容'
      @select='handleSelect'
    ></el-autocomplete>
    <div v-if='wordData'>
      <p>英文: <span v-if='wordData.en'>{{ wordData.en }}</span></p>
      <p>中文: <span v-if='wordData.cn'>{{ wordData.cn }}</span></p>
      <p>词性: <span v-if='wordData.pos'>{{ wordData.pos }}</span></p>
      <div v-if='wordData.articles'>
        出现过的课文:
        <p v-for='article in wordData.articles' :key="article.id">
          <span>{{ article.book }}</span><span> 第{{ article.lesson }}课 </span><span>{{ article.title }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from './searchApi.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      input: null,
      msg: 'Welcome to Your Vue.js App',
      state: '',
      cn: null,
      timeout: null,
      wordData: null
    }
  },
  methods: {
    // 查询并过滤
    querySearchAsync (queryString, cb) {
      if (queryString && queryString.length > 1) {
        let postData = {
          en: queryString
        }
        api.searchWord(postData).then((result) => {
          if (result.data.data && result.data.data.length) {
            let resList = result.data.data.map((item) => {
              item.value = item.en
              return item
            })
            cb(resList)
          }
        })
      }
      // }).always(() => {
      //   vm.loading = false
      // })
      // var restaurants = this.restaurants
      // // 前端筛选过滤器
      // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      // // 返回结果
      // cb(results)
    },
    // 前端筛选滤芯
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    // 选中下拉框中的内容时触发
    handleSelect (item) {
      console.log('item: ', item)
      let postData = {
        id: item.id
      }
      let vm = this
      api.getWord(postData).then((result) => {
        console.log('result.data: ', result.data)
        vm.wordData = result.data.data
        // if (result.data.data && result.data.data.length) {
        //   let resList = result.data.data.map((item) => {
        //     item.value = item.en
        //     return item
        //   })
        // }
      })
    },
    searchEn (en) {
      let postData = {
        en: en
      }
      api.searchWord(postData).then((result) => {
        console.log('result: ', result)
        this.cn = result.data.data.cn
      })
    }
  },
  mounted () {
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
</style>
