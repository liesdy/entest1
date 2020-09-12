// const TokenKey = 'x_token'
import { Message } from 'element-ui'
export function checkToken (errMessage) {
  if (localStorage.token) {
    return true
  } else {
    Message({
      message: errMessage,
      type: 'warning'
    })
    return false
  }
}
// export function setToken (token) {
//   window.sessionStorage.setItem(TokenKey, token)
// }

// export function removeToken () {
//   window.sessionStorage.removeItem(TokenKey)
// }
