import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/store.js'
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

//路由全局守卫 守卫页面登录状态的跳转
router.beforeEach((to,from,next)=>{
  let token=sessionStorage.getItem('token')
  if(token){
    //如果登录了你就可以访问下一个
    next()
  }else{
    //如果你直接访问login页面，那么就直接去login页面
    if(to.path=='/login'){
      next()
    }else{//如果没有登录，又访问了其他页面，那么就跳转到登录页面
      next('/login')
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
