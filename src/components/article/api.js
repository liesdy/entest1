import request from '@/common-api/requestBase'
const preurl = '/myEnglishNote/article'

export default {
  search (word) {
    return request.post2(preurl + '/search', word)
  },
  list (word) {
    return request.post2(preurl + '/list', word)
  },
  get (data) {
    return request.post2(preurl + '/get', data)
  },
  add (data) {
    return request.post(preurl + '/add', data)
  },
  updateIncludeDetail (data) {
    return request.post(preurl + '/updateIncludeDetail', data)
  },
  relateHistory (data) {
    return request.post2(preurl + '/relateHistory', data)
  },
  checkExist (data) {
    return request.post2(preurl + '/checkExist', data)
  },
  update (data) {
    return request.post(preurl + '/update', data)
  },
  getHistory (data) {
    return request.post2(preurl + '/getHistory', data)
  }
}
