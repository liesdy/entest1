import request from './requestBase'
const preurl = '/myEnglishNote/starBase'

export default {
  star (data) {
    return request.post(preurl + '/star', data)
  },
  starEdit (data) {
    return request.post(preurl + '/starEdit', data)
  }
}
