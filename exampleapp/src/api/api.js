
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
//拦截器 拦截每次http请求
axios.interceptors.request.use(config => {
    console.log(config)
    let token = window.sessionStorage.getItem('token')
    console.log(token)
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
})

// 登录验证
export const loginSure = params => {
    return axios.post('login', params).then(res => res.data)
}

// 获取左侧菜单权限
export const leftMenus = params => {
    return axios.get('menus', params).then(res => res.data)
}

// 所有权限列表
export const allPowerList = params => {
    return axios.get('rights/:type', params).then(res => res.data)
}

//用户数据列表
export const usersList =params =>{
    return axios.get('users',params).then(res=>res.data)
}
//根据用户id查数据
export const userId =id =>{
    return axios.get('users/'+id).then(res=>res.data)
}
//添加用户
export const usersAdd =params =>{
    return axios.post('users',params).then(res=>res.data)
}