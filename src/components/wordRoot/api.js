import request from '@/common-api/requestBase'
const preurl = '/myEnglishNote/wordRoot'

export default {
  search (data) {
    return request.post(preurl + '/search', data)
  },
  get (data) {
    return request.post(preurl + '/get', data)
  },
  list (data) {
    return request.post(preurl + '/list', data)
  },
  add (data) {
    return request.post(preurl + '/add', data)
  },
  checkExist (data) {
    return request.post(preurl + '/checkExist', data)
  },
  update (data) {
    return request.post(preurl + '/update', data)
  },
  updateIncludeDetail (data) {
    return request.post(preurl + '/updateIncludeDetail', data)
  },
  relateHistory (data) {
    return request.post(preurl + '/relateHistory', data)
  },
  getHistory (data) {
    return request.post(preurl + '/getHistory', data)
  }
}
