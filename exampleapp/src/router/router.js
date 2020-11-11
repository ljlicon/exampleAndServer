import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login.vue'
import home from '../views/home.vue'
Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: 'users',
          name: 'users',
          component: () => import('../pages/users/index.vue'),
        },
        {
          path: 'roles',
          name: 'roles',
          component: () => import('../pages/roles/index.vue'),
        }
      ]
    },
  ]
})
