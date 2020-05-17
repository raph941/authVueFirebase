import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { store } from './Store'
import * as firebase from 'firebase'
import router from './Router/index'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyBiWNjYMuS2Nt1Ex7q2HYzU8PU1AQIHPVM",
      authDomain: "generic-720ff.firebaseapp.com",
      databaseURL: "https://generic-720ff.firebaseio.com",
      projectId: "generic-720ff",
      storageBucket: "generic-720ff.appspot.com",
      messagingSenderId: "959882020642",
      appId: "1:959882020642:web:c71babea3f309c1bc9077b",
      measurementId: "G-D5QBQD7BK3"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
  }
}).$mount('#app')