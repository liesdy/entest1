<template>
  <div class="back-ground">
    <div class="frame">
      <el-row class='title-line' type='flex'>
        <el-col :span='6' class='logo'>
          <router-link to="/">
            <h1>En<span>try</span></h1>
          </router-link>
        </el-col>
        <el-col :span='18'>
          <el-row>
            <el-col :span='6' :offset="18">
              <template v-if='user'>
                <el-dropdown trigger="click">
                  <el-button type="text">
                    {{ user.name }}
                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
              <template v-else>
                <el-button type="text" @click="openDialog('Login')">登录</el-button>
                <el-button type="text" @click="openDialog('Register')">注册</el-button>
              </template>
            </el-col>
          </el-row>
          <el-row class="menu-line">
            <router-link to="/word">
              <!-- <el-col :offset="6" :span='3' > -->
              <el-col :span='4' >
                <el-button type="text"><span>单词</span> <br> <span class='s-menu'>word</span></el-button>
              </el-col>
            </router-link>
            <router-link to="/phrase">
              <el-col :span='4'>
                <el-button type="text"><span>短语</span> <br> <span class='s-menu'>phrase</span></el-button>
              </el-col>
            </router-link>
            <router-link to="/sentence">
              <el-col :span='4'>
                <el-button type="text"><span>例句</span> <br> <span class='s-menu'>sentence</span></el-button>
              </el-col>
            </router-link>
            <router-link to="/article">
              <el-col :span='4'>
                <el-button type="text"><span>课文</span> <br> <span class='s-menu'>article</span></el-button>
              </el-col>
            </router-link>
            <router-link to="/wordroot">
              <el-col :span='4'>
                <el-button type="text"><span>词根</span> <br> <span class='s-menu'>wordroot</span></el-button>
              </el-col>
            </router-link>
            <router-link to="/book">
              <el-col :span='4'>
                <el-button type="text"><span>书本</span> <br> <span class='s-menu'>book</span></el-button>
              </el-col>
            </router-link>
            <!-- <router-link to="/phrase">
              <el-col :span='3'>
                <el-button type="text">查询</el-button>
              </el-col>
            </router-link> -->
          </el-row>
        </el-col>
      </el-row>
      <el-row class='main-box'>
        <router-view></router-view>
      </el-row>
      <el-dialog
        :modal='false'
        :title="titleName"
        :visible.sync="showDialog"
        width="430px">
        <component
          v-if='showDialog'
          :is="componentName"
          @registered='registered'
          @logined='logined'
          @cancel='showDialog = false'
          >
        </component>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '@/common-api/auth.js'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      showDialog: false,
      titleName: null,
      componentName: null
    }
  },
  components: {
    login: () => import('./login.vue'),
    register: () => import('./register.vue')
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
  methods: {
    openDialog (val) {
      if (val === 'Login') {
        this.titleName = '登录'
        this.componentName = 'login'
      }
      if (val === 'Register') {
        this.titleName = '注册'
        this.componentName = 'register'
      }
      this.showDialog = true
    },
    registered (val) {
      this.showDialog = false
      // this.login(val)
    },
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userId')
      this.$store.commit('logOut')
      console.log('localStorage: ', localStorage)
    },
    logined () {
      this.showDialog = false
    }
  },
  mounted () {
    // console.log('localStorage.token: ', localStorage.token)
    // console.log('localStorage.userName: ', localStorage.userName)
    if (localStorage.userId) {
      let postData = {
        id: localStorage.userId
      }
      api.getUser(postData).then(res => {
        console.log('res.data: ', res.data)
        this.$store.commit('setUser', res.data)
      })
    }
    // this.$store.commit('setUserName', localStorage.userName)
    // this.$store.commit('setUserId', localStorage.userId)
    this.$store.commit('setToken', localStorage.token)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .back-ground {
    background-color: #efefef;
    height: 100%
  } */
  .frame {
    width: 1024px;
    margin-left: auto;
    margin-right: auto;
  }
  .title-line {
    /* background-color: #efefef; */
    margin-bottom: 20px;
    /* box-shadow: 0 0 3px #eee; */
  }
  .logo {
    display: flex;
    align-items: center;
    padding-left: 10px;
    position: relative;
    top: 14px;
  }
  .logo h1 {
    font:italic bold 54px/54px arial,sans-serif;
    color: rgb(255, 28, 28);
    letter-spacing: 3px;
    text-shadow:2px 1px 3px rgba(255, 28, 28, 0.514);
  }
  .logo h1 span {
    letter-spacing: 4px;
    color: #3c96eb;
    text-shadow:5px 2px 6px #7cc0ff7a;
    position: relative;
    top: 1px;
    left: 1px;
  }
  .main-box {
    box-shadow: 0 -7px 7px #EEE;
    padding: 25px 20px 0;
    background-color: #fff;
    border-radius: 15px;
  }
  .menu-line {
    position: relative;
    top: 5px;
    left: 72px;
  }
  .menu-line >>> .el-button--text {
    color: #666;
    font-size: 14px;
    text-align: left
  }
  .menu-line .s-menu {
    color: #eee;
    text-align: left;
    letter-spacing: 2px;
    font:normal normal 14px/20px arial,sans-serif;
  }
</style>
