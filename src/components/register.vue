<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input v-model="form.name" @input="checkName" class="w-input"></el-input>
      <i class="el-icon-success green-c" v-if='nameOk === "OK"'></i>
      <i class="el-icon-error red-c" v-if='nameOk === "No"'></i>
    </el-form-item>
    <el-form-item label="密码">
      <el-input class="w-input" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input type="password" class="w-input" v-model="form.repassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">注册</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from '@/common-api/auth.js'
export default {
  name: 'register',
  data () {
    return {
      form: {
        name: '',
        password: '',
        repassword: ''
      },
      exist: false
    }
  },
  computed: {
    nameOk () {
      if (this.form.name.length && this.form.name.length >= 3 && !this.exist) {
        return 'OK'
      } else if (!this.exist && (!this.form.name.length || this.form.name.length < 3)) {
        return 'waiting'
      } else {
        return 'No'
      }
    }
  },
  methods: {
    onSubmit () {
      let data = this.form
      if (!this.exist) {
        if (data.password === data.repassword) {
          api.register(data).then(res => {
            console.log('res: ', res)
            console.log('here0')
            if (res.data === 'success') {
              console.log('here1')
              this.$emit('registered', data)
              this.$message('注册成功')
              this.login(data)
            }
          })
        } else {
          this.$message('两次输入密码不一致')
        }
      } else {
        this.$message('用户名已存在')
      }
    },
    login (data) {
      api.login(data).then(res => {
        if (res.data.sign && res.data.sign === 'success') {
          localStorage.token = res.data.token
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userName', res.data.user ? res.data.user.name : null)
          localStorage.setItem('userId', res.data.user ? res.data.user.id : null)
          // this.$message('登录成功')
          // this.$emit('logined')
          this.$store.commit('setUser', res.data.user)
          this.$store.commit('setToken', localStorage.token)
        } else if (res.data === 'checkError') {
          this.$message('用户名或密码错误')
        } else if (res.data === 'noUser') {
          this.$message('用户名不存在')
        }
      })
    },
    checkName (val) {
      let postData = {
        name: val
      }
      if (val && val.length >= 3) {
        api.checkName(postData).then(res => {
          if (res.data === 'exist') {
            this.exist = true
            this.$message('用户名已存在')
          }
          if (res.data === 'ok') {
            this.exist = false
          }
        })
      }
    },
    cancel () {
      this.form = {
        name: '',
        password: '',
        repassword: ''
      }
      this.$emit('cancel')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .frame {
    width: 1024px;
    margin-left: auto;
    margin-right: auto;
    /* background-color: #efefef; */
  }
  .title-line {
    background-color: #efefef;
  }
  .w-input {
    width: 260px;
  }
</style>
