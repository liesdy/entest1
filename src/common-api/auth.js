import request from './requestBase'
const preurl = '/myEnglishNote/auth'

export default {
  register (data) {
    return request.post2(preurl + '/register', data)
  },
  checkName (data) {
    return request.post2(preurl + '/checkName', data)
  },
  login (data) {
    return request.post(preurl + '/login', data)
  },
  getUser (data) {
    return request.post(preurl + '/getUser', data)
  }
}
