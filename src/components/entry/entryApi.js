import request from '@/common-api/requestBase'
const preurl = '/myEnglishNote'

export default {
  getTotal () {
    return request.post2(preurl + '/total/getTotal')
  },
  getUserStarData () {
    return request.post(preurl + '/total/getUserStarData')
  }
  // searchWord (word) {
  //   return request.post2(preurl + '/word/search', word)
  // },
  // getWord (word) {
  //   return request.post2(preurl + '/word/get', word)
  // },
  // wordsList (word) {
  //   return request.post2(preurl + '/wordsList', word)
  // }
}
