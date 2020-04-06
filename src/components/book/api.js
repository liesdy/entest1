import request from '@/common-api/requestBase'
const preurl = '/myEnglishNote/book'

export default {
  search (word) {
    return request.post(preurl + '/search', word)
  },
  list (word) {
    return request.post(preurl + '/list', word)
  },
  // listsimple (word) {
  //   return request.post(preurl + '/listsimple', word)
  // },
  get (data) {
    return request.post(preurl + '/get', data)
  },
  add (data) {
    return request.post(preurl + '/add', data)
  },
  updateIncludeDetail (data) {
    return request.post(preurl + '/updateIncludeDetail', data)
  },
  relateHistory (data) {
    return request.post(preurl + '/relateHistory', data)
  },
  checkExist (data) {
    return request.post(preurl + '/checkExist', data)
  },
  update (data) {
    return request.post(preurl + '/update', data)
  },
  getHistory (data) {
    return request.post(preurl + '/getHistory', data)
  }
}
