<template>
  <div class="back-ground">
    <div class="frame">
      <el-row class='title-line' type='flex'>
        <el-col :span='6' class='logo' @click.native="route('')">
          <h1>En<span>try</span></h1>
        </el-col>
        <el-col :span='18'>
          <el-row>
            <el-col :span='6' :offset="18">
              <template v-if='user'>
                <el-dropdown trigger="click">
                  <el-button type="text">
                    {{user.name}}
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
            <el-col
              v-for="(item, index) in menuList"
              :key='index'
              :span='4'
              @click.native="route(item.en)">
              <div :class='{ menu: true, "is-active": active === item.en }' type="text" >
                <span>{{item.cn}}</span> <br> <span class='s-menu'>{{item.en}}</span>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class='main-box' v-if="showTable">
        <router-view></router-view>
      </el-row>
      <el-dialog
        :modal='true'
        append-to-body
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

      <el-dialog
       :visible.sync="showHello"
       width="600px"
       append-to-body>
        <div class='hello'>
          <h3>Hello</h3>
          <p>这是一个为了方便进行英语学习笔记的小型试做项目</p>
          <p>核心主旨在于联系</p>
          <p>比如遇到了一个新的英语生词</p>
          <p>首先可以在此查询，看是否已被录入</p>
          <p>如果是已经录入的单词，则可以直接查看，也可以进行修改</p>
          <p>如果还未录入，可以自行添加</p>
          <p>在详情中也可以将这个单词与其他的短语、例句、书本等内容进行关联</p>
          <br>
          <p>在其他板块，比如短语、例句等板块，也都有类似功能</p>
          <p>甚至还能查看历史修改记录</p>
          <br>
          <p>未来，也可能会陆续再添加其他功能....大概~~ ：)</p>
          <p> ————liesdy</p>
          <br>
          <br>
          <p class="light">ps: 这个项目并没有经过严格测试因此你可能会遇到各种奇怪bug甚至数据丢失,欢迎尝试并体验2333</p>
        </div>
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
      componentName: null,
      showHello: false, // 注册完成时显示弹窗
      showTable: true, // 显示表格
      active: null,
      menuList: [
        {
          cn: '单词',
          en: 'word'
        },
        {
          cn: '短语',
          en: 'phrase'
        },
        {
          cn: '例句',
          en: 'sentence'
        },
        {
          cn: '课文',
          en: 'article'
        },
        {
          cn: '词根',
          en: 'wordroot'
        },
        {
          cn: '书本',
          en: 'book'
        }
      ]
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
    route (to) {
      this.active = to
      this.$router.push('/' + to)
    },
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
      this.showHello = true
      // this.login(val)
    },
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userId')
      this.$store.commit('logOut')
      // console.log('localStorage: ', localStorage)
    },
    logined () {
      // 登录后重新查询表格数据（刷新收藏信息）
      this.showTable = false
      this.showDialog = false
      this.$nextTick(() => {
        this.showTable = true
      })
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
        // console.log('res.data: ', res.data)
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
  .back-ground {
    /* background-color: #efefef; */
    height: 100%
  }
  .frame {
    width: 1024px;
    height: 100%;
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
    cursor: pointer;
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
    height: 100%;
  }
  .menu-line {
    position: relative;
    top: 10px;
    left: 72px;
  }
  .menu {
    color: #999;
    cursor: pointer
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
  .is-active {
    font-weight: bold;
  }
  .menu-line .is-active {
    color: #409EFF;
  }
  .hello {
    text-align: center;
    line-height: 30px;
    color: #999999;
  }
  .hello .tr-s {
    text-align: right;
  }
  .hello h3 {
    margin-bottom: 20px;
    font-size: 18px;
    color: #409EFF;
  }
  .hello .light{
    color: #ddd;
    font-size: 12px;
  }
</style>
