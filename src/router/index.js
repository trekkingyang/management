import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list/list'
import login from '@/components/login/login'
import register from '@/components/register/register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
