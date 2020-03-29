import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Yearselect from '@/components/Yearselect'
import Taskpage from '@/components/Taskpage'
import Managemajor from '@/components/Managemajor'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component:Login
    },
    {
      path: '/Managemajor',
      name: 'Managemajor',
      component:Managemajor
    },
    {
      path: '/TaskList',
      name: 'TaskList',
      components:{
        left:Yearselect,
        right:Taskpage
      }
    }
  ]
})
