import axios from 'axios'
import { Message } from 'element-ui'

/**
 * 选择当前的运行环境
 */
// let currentEnv = 'dev'
let currentEnv = 'prod'

let urlList = {
  dev: 'http://127.0.0.1:8000',
  prod: 'http://124.70.214.237:8000'
}
let checkNameUrl = {
  dev: 'http://127.0.0.1:8000/myEnglishNote/auth/login_check',
  prod: 'http://124.70.214.237:8000/myEnglishNote/auth/login_check'
}
const service = axios.create({
  baseURL: urlList[currentEnv],
  withCredentials: false,
  timeout: 5000, // request timeout
  method: 'POST'
})
const service2 = axios.create({
  baseURL: urlList[currentEnv],
  withCredentials: false,
  timeout: 5000, // request timeout
  method: 'POST'
})
service.interceptors.request.use(function (config) {
  if (localStorage.token) {
    // console.log('localStorage.token: ', localStorage.token)
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['X-Authorization'] = localStorage.token ? localStorage.token : null
    config.headers['X-Tkk'] = localStorage.userName ? localStorage.userName : null
    config.headers['X-UD'] = localStorage.userId ? localStorage.userId : null
  }
  return config
})
service.interceptors.response.use(response => {
  const res = response.data
  return res
})
service2.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers['X-Authorization'] = localStorage.token ? localStorage.token : null
    config.headers['X-Tkk'] = localStorage.userName ? localStorage.userName : null
    config.headers['X-UD'] = localStorage.userId ? localStorage.userId : null
  }
  return config
})
service2.interceptors.response.use(response => {
  const res = response.data
  return res
})
function checkName () {
  return new Promise((resolve, reject) => {
    service({
      url: checkNameUrl[currentEnv],
      method: 'post',
      data: null
    }).then(res => {
      if (res.data.result === 'success') {
        resolve(res.data.result)
      } else {
        reject(res.data.result)
      }
    })
  })
}
export default {
  post (url, data) {
    return checkName().catch(res => {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userId')
      Message({
        message: '需要登录后再进行操作',
        type: 'warn'
      })
    }).then(res => {
      return service({
        url,
        method: 'post',
        data
      })
    })
  },
  post2 (url, data) {
    return service2({
      url,
      method: 'post',
      data
    })
  }
}
