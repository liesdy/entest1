import request from '@/common-api/requestBase'
const preurl = '/myEnglishNote'

export default {
  searchWord (word) {
    return request.post(preurl + '/searchWord', word)
  },
  getWord (word) {
    return request.post(preurl + '/getWord', word)
  },
  wordsList (word) {
    return request.post(preurl + '/wordsList', word)
  }
}
