import request from '@/common-api/requestBase'
const preurl = '/myEnglishNote'

export default {
  getTotal () {
    return request.post(preurl + '/total/getTotal')
  },
  getUserStarData () {
    return request.post(preurl + '/total/getUserStarData')
  }
  // searchWord (word) {
  //   return request.post(preurl + '/word/search', word)
  // },
  // getWord (word) {
  //   return request.post(preurl + '/word/get', word)
  // },
  // wordsList (word) {
  //   return request.post(preurl + '/wordsList', word)
  // }
}
