import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Sidebar from '@/components/Sidebar'
import Managemajor from '@/components/Managemajor'
import First from '@/components/First'
import People from '@/components/People'
import Plan from '@/components/Plan'
import Outlinelist from '@/components/Outlinelist'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component:Login
    },
    {
      path: '/Outlinelist',
      name: 'Outlinelist',
      components:{
        left:Sidebar,
        right:Outlinelist
      }
    },
    {
      path: '/Managemajor',
      name: 'Managemajor',
      components:{
        left:Sidebar,
        right:Managemajor
      }
    },
    {
      path: '/Home',
      name: 'Home',
      components:{
        left:Sidebar,
        right:First
      }
    },
    {
      path: '/Peoplemanage',
      name: 'Peoplemanage',
      components:{
        left:Sidebar,
        right:People
      }
    },
    {
      path: '/Plandesign',
      name: 'Plandesign',
      components:{
        left:Sidebar,
        right:Plan
      }
    }
  ]
})
