import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Home from '@/components/home/index'
import Dashboard from '@/components/home/dashboard'
import viewRecord from '@/components/home/view-record'
import Login from '@/components/home/login'
import Edit from '@/components/home/edit'
import manage_detail from '@/components/home/manage_detail'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { auth: true}
    },
    {
      path: '/view-record',
      name: 'view-record',
      component: viewRecord,
      meta: {auth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {guest: true}
    },
    {
      path: '/edit/:transaction_id',
      name: 'edit',
      component: Edit,
      meta: {auth: true}
    }, 
    {
      path: '/view-each-record/:transactionId',
      namme: 'view-each-record',
      component: manage_detail,
      meta: {auth: true}
    }
  ],
  mode: 'history',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from, next) => {
   if(to.matched.some(record => record.meta.auth)){
      if(!firebase.auth().currentUser){
          next({path:'/login'})
      }else next()
   }else if(to.matched.some(record => record.meta.guest)){
     if(firebase.auth().currentUser){
       next({path:'/dashboard'})
     }else next()
   }else next()
})

export default router