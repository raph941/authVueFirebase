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
                    firebase.database().ref('profile/' + user.user.uid).set(profilePayload)
                    return user.uid
                }
            )
            .then(
                userId => {
                    commit('setLoading', false)
                    const newUser = {
                        id: userId,
                    }
                    commit('setUser', newUser)
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
            firebase.auth().signInWithEmailAndPassword(
                payload.email, payload.password
            ).then(
                user => {
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                    }
                    commit('setUser', newUser)
                }
            ).catch(
                error => {
                    commit('setError', error)
                }
            )
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {id: payload.uid})
        },
        fetchUserData ({commit}) {
            commit('setLoading', true)
            // firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
            //     .then(data => {
            //         const dataPairs = data.val()
            //         let registeredMeetups = []
            //         let swappedPairs = {}
            //         for (let key in dataPairs){
            //             registeredMeetups.push(dataPairs[key])
            //             swappedPairs[dataPairs[key]] = key
            //         }
            //         const updatedUser = {
            //             id: getters.user.id,
            //             registeredMeetups: registeredMeetups,
            //             fbkeys: swappedPairs
            //         }
            //         commit('setLoading', false)
            //         commit('setUser', updatedUser)
            //     })
            //     .catch(error => {
            //         console.log(error)
            //         commit('setLoading', false)
            //     })
            
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