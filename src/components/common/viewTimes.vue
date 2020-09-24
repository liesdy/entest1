<template>
  <p v-if="rootData" class="mt10">
    总浏览次数: {{ rootData.times }} 次&nbsp;
    <el-dropdown v-if='user && rootData.myViewTimes'>
      <span class="link">我浏览了 {{ rootData.myViewTimes.length }} 次</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for='(item, index) in rootData.myViewTimes' :key='index'>{{ formatTime(new Date(item.time)) }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </p>
</template>

<script>
import { formatTime } from '@/utils/commonUtils.js'
export default {
  name: 'ViewTimes',
  props: {
    rootData: Object
  },
  data () {
    return {
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
    formatTime
  },
  mounted () {
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
  /* .viewTimes {
  } */
  p {
    padding-right: 20px;
    text-align: right;
  }
  .link {
    cursor: pointer;
    color: #409EFF;
  }
</style>
