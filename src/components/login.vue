<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="用户名">
      <el-input class="w-input" v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password" class="w-input" v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from '@/common-api/auth.js'
export default {
  name: 'login',
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      let data = this.form
      api.login(data).then(res => {
        if (res.data.sign && res.data.sign === 'success') {
          localStorage.token = res.data.token
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userName', res.data.user ? res.data.user.name : null)
          localStorage.setItem('userId', res.data.user ? res.data.user.id : null)
          this.$message('登录成功')
          this.$emit('logined')
          this.$store.commit('setUser', res.data.user)
          this.$store.commit('setToken', localStorage.token)
        } else if (res.data === 'checkError') {
          this.$message('用户名或密码错误')
        } else if (res.data === 'noUser') {
          this.$message('用户名不存在')
        }
      })
    },
    cancel () {
      this.form = {
        name: '',
        password: ''
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
