import Vue from 'vue'
import Router from 'vue-router'
import Signup from '../Views/Signup.vue'
import Signin from '../Views/Signin.vue'
import Profile from '../Views/Profile.vue'
import AuthGuard from './auth-guard'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
  ],
  mode: 'history'
})
