import axios from 'axios'
const service = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: false,
  timeout: 5000, // request timeout
  method: 'POST'
})
service.interceptors.request.use(function (config) {
  if (localStorage.token) {
    console.log('localStorage.token: ', localStorage.token)
    // let each request carry token
    // ['X-Token'] is a custom headers key
    // please modify it according to the actual situation
    config.headers['X-Authorization'] = localStorage.token ? localStorage.token : null
    config.headers['X-Tkk'] = localStorage.userName ? localStorage.userName : null
    config.headers['X-UD'] = localStorage.userId ? localStorage.userId : null
  }
  return config
})
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  })
export default {
  post (url, data) {
    return service({
      url,
      method: 'post',
      data
    })
  }
  // findOne(prefix, id) {
  //   return request({
  //     url: `${prefix}/findOne`,
  //     method: 'post',
  //     data: {
  //       id
  //     }
  //   })
  // },
  // findPage(prefix, data) {
  //   if (data['filter'] != null) {
  //     data.filter.push({
  //       column: 'delFlag',
  //       type: 'andEq',
  //       value: 0
  //     })
  //   }
  //   return request({
  //     url: `${prefix}/findPage`,
  //     method: 'post',
  //     data
  //   })
  // },
  // findList(prefix, data) {
  //   if (data['filter'] != null) {
  //     data.filter.push({
  //       column: 'delFlag',
  //       type: 'andEq',
  //       value: 0
  //     })
  //   }
  //   return request({
  //     url: `${prefix}/findList`,
  //     method: 'post',
  //     data
  //   })
  // },
  // save(prefix, data) {
  //   return request({
  //     url: `${prefix}/save`,
  //     method: 'post',
  //     data
  //   })
  // },
  // update(prefix, data) {
  //   return request({
  //     url: `${prefix}/update`,
  //     method: 'post',
  //     data
  //   })
  // },
  // delete(prefix, id) {
  //   return request({
  //     url: `${prefix}/delete`,
  //     method: 'post',
  //     data: {
  //       id
  //     }
  //   })
  // },
  // /**
  //  * 批量删除
  //  * @param prefix
  //  * @param ids 待删除ID数组[1,2,3]
  //  * @returns {AxiosPromise}
  //  */
  // batchDelete(prefix, ids) {
  //   return request({
  //     url: `${prefix}/deleteList`,
  //     method: 'post',
  //     data: {
  //       ids
  //     }
  //   })
  // },
  // // upload (prefix, data) {
  // //   return request({
  // //     url: `${prefix}/upload`,
  // //     method: 'post',
  // //     data
  // //   })
  // // },
  // export (prefix, data) {
  //   return request({
  //     url: `${prefix}/download`,
  //     method: 'post',
  //     responseType: 'blob',
  //     data
  //   })
  // }
}
