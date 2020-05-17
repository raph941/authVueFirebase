import Vue from 'vue'
import Router from 'vue-router'
import Signup from '../Views/Signup.vue'
import Signin from '../Views/Signin.vue'


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
  ],
  mode: 'history'
})
