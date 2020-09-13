import request from './requestBase'
const preurl = '/myEnglishNote/comment'

export default {
  addComment (data) {
    return request.post(preurl + '/add', data)
  },
  getCommentList (data) {
    return request.post2(preurl + '/getListSimple', data)
  }
}
