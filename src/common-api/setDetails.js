import request from './requestBase'
const preurl = '/myEnglishNote'

export default {
  getArticle (data) {
    return request.post2(preurl + '/getArticle', data)
  },
  getSentence (data) {
    return request.post2(preurl + '/getSentence', data)
  },
  getPhrase (data) {
    return request.post2(preurl + '/getPhrase', data)
  },
  getWord (data) {
    return request.post2(preurl + '/getWord', data)
  },
  getWordsRoot (data) {
    return request.post2(preurl + '/getWordsRoot', data)
  }
}
