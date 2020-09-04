<template>
  <div id="app" :style="{ height: totalHeight + 'px' }">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      totalHeight: null
    }
  },
  created () {
    this.totalHeight = window.document.documentElement.clientHeight
  }
}
</script>
<style lang="scss" src="../src/assets/css/common.scss"></style>
<style>
body {
  height: 100%;
}
#app {
  height: 100%;
  /* background: #ddd; */
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
