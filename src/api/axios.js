import axios from 'axios'
import qs from 'qs'
import config from '../config/index'
import store from '../store/store'

const service = axios.create({
  baseURL: config.urlStr,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
let Axios = async (url, data, method = 'post', isQs = true) => {
  return new Promise((resolve, reject) => {
    const options = {
      url,
      method
    }
    if (method.toLowerCase() === 'get') {
      options.params = data
    } else {
      if (isQs) {
        data = qs.stringify(data)
      }
      options.data = data
    }
    service(options)
      .then(res => {
        if (Number(res.data.status) === 200) {
          resolve(res.data)
        } else if (res.data.status === 307 || res.data.status === 900 || res.data.status === 901) {
          if (window.location.href.indexOf('/login/memberLogin') !== -1 || window.location.href.indexOf('/login/orgLogin') !== -1) {
            return
          } else {
            sessionStorage.clear()
            localStorage.clear()
            store.state.user = null
            store.state.userType = ''
            store.state.userToken = ''
            store.state.userCode = ''
            store.state.userId = ''
            store.state.sdktoken = ''
            store.state.uid = ''
            window.location.href = '/login/memberLogin'
          }
        } else {
          reject(res.data)
        }
      })
      .catch(error => {
        console.log(error)
      })
  })
}
export default Axios