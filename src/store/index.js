import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // modules: {
  //   app,
  //   settings,
  //   user,
  //   permission
  // },
  // getters
  state: {
    // userName: null,
    // userId: null,
    user: null,
    token: null
  },
  mutations: {
    // setUserId (state, userId) {
    //   state.userId = userId
    // },
    // setUserName (state, userName) {
    //   state.userName = userName
    // },
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      state.token = token
    },
    logOut (state) {
      state.user = null
      state.token = null
      // localStorage.removeItem('token')
      // localStorage.removeItem('userName')
      // localStorage.removeItem('userId')
      localStorage.removeItem('user')
    }
  }
})

export default store
