import request from './requestBase'
const preurl = '/myEnglishNote'

export default {
  getArticle (data) {
    return request.post(preurl + '/getArticle', data)
  },
  getSentence (data) {
    return request.post(preurl + '/getSentence', data)
  },
  getPhrase (data) {
    return request.post(preurl + '/getPhrase', data)
  },
  getWord (data) {
    return request.post(preurl + '/getWord', data)
  },
  getWordsRoot (data) {
    return request.post(preurl + '/getWordsRoot', data)
  }
}
