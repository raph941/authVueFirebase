import * as firebase from 'firebase'
//Note this file holds the state for User related stuff

export default {
    state: {
        user: null, 
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        },
    },
    actions: {
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(
                payload.email, payload.password
            ).then(
                user => {
                    const profilePayload = {
                        phoneNumber: payload.phoneNumber
                        //you can add more data here if you need
                        //to add more fields to registration
                    }
                    return firebase.database().ref('profile/' + user.user.uid).set(profilePayload)
                }
            )
            .catch(
                error => {
                    commit('setLoading', false)
                    commit('setError', error)
                }
            )
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            var userId = ''
            var userEmail = ''
            firebase.auth().signInWithEmailAndPassword(
                payload.email, payload.password
            ).then(snapshot => {
                userId = snapshot.user.uid
                userEmail = snapshot.user.email
                return firebase.database().ref('profile/' + userId).once('value')
            }).then (snapshot => {
                const profileData = snapshot.val()
                    const userData = {
                        id: userId,
                        email: userEmail,
                        phoneNumber: profileData.phoneNumber,
                    }
                commit('setUser', userData)
                commit('setLoading', false)
            })
            .catch(
                error => {
                    commit('setError', error)
                    commit('setLoading', false)
                }
            )
        },
        autoSignIn ({commit}, payload) {
            // Note here, only user data is obtained because calling a firebase instance to to fetch user profile 
            // would prolong page reload time
            // however user profile would be fetched immediatly this is complete. check 'main.js' to see
            const userData = {
                id: payload.uid,
                email: payload.email
            }
            commit('setUser', userData)
        },
        fetchUserWithProfile ({commit, getters}) {
            commit('setLoading', true)
            firebase.database().ref('profile/' + getters.user.id).once('value')
                .then(snapshot => {
                    const data = snapshot.val()
                    const userData = {
                        id: getters.user.id,
                        email: getters.user.email,
                        phoneNumber: data.phoneNumber,
                    }
                    commit('setUser', userData)
                    commit('setLoading', false)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
            
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
    },
    getters: {
        user (state) {
            return state.user
        },
    },
}