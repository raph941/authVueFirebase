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
      apiKey: process.env.VUE_APP_FIREBASE_APIKEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGINGSENDERID,
      appId: process.env.VUE_APP_FIREBASE_APPID,
      measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserWithProfile')
      }
    })
  }
}).$mount('#app')