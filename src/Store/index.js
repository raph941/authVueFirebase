import Vue from 'vue'
import Vuex from 'vuex'
import user from './User'
import shared from './Shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
   modules: {
       user: user,
       shared
   }
})
