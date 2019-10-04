import axios from 'axios'

// 测试环境
// axios.defaults.baseURL = "http://192.168.1.25:8080"
// 颜通
// axios.defaults.baseURL = "http://192.168.1.117:8080"
// 佳超
// axios.defaults.baseURL = "http://192.168.1.15:8080"

// 生产环境
axios.defaults.baseURL = "http://47.106.71.3:8080"

// Vue.prototype.$axios = axios
export default axios


