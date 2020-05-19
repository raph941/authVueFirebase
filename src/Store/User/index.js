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
                        phoneNumber: payload.phoneNumber,
                        name: payload.name
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
                        name: profileData.name,
                        phoneNumber: profileData.phoneNumber,
                        imageUrl: profileData.imageUrl
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
                        name: data.name,
                        phoneNumber: data.phoneNumber,
                        imageUrl: data.imageUrl,
                    }
                    commit('setUser', userData)
                    commit('setLoading', false)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
            
        },
        updateUser({commit, getters}, payload){
            commit('setLoading', true)
            firebase.auth().currentUser.updateEmail(payload.email)
            .then(() => {
                var profileData = {
                    name: payload.name,
                    phoneNumber: payload.phoneNumber
                }
                return firebase.database().ref('profile/' + getters.user.id).update(profileData)
            })
            .then(() => {
                const userData = {
                    id: getters.user.id,
                    email: payload.email,
                    name: payload.name,
                    phoneNumber: payload.phoneNumber,
                    imageUrl: getters.user.imageUrl,
                }
                commit('setUser', userData)
                commit('setLoading', false)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        changePassword({commit}, payload){
            commit('setLoading', true)
            firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(
                firebase.auth.EmailAuthProvider.credential(
                  firebase.auth().currentUser.email, 
                  payload.currentPassword
                )
            )
            .then(() => {
                return firebase.auth().currentUser.updatePassword(payload.newPassword)
            })
            .then(() => {
                console.log('password change successful')
                commit('setLoading', false)
                firebase.auth().signOut()
                commit('setUser', null)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })

        },
        uploadProfilePic({commit, getters}, payload){
            commit('setLoading', true)
            const filename = payload.image.name
            firebase.storage().ref(getters.user.id + '/' + 'profileImage/' + filename).put(payload.image)
            .then(fileData => {
                const pathToFile = fileData.ref.fullPath
                const fileReference = firebase.storage().ref(pathToFile)
                return fileReference.getDownloadURL()
            })
            .then(url => {
                return firebase.database().ref('profile/' + getters.user.id).update({imageUrl: url})
            })
            .then(() => {
                console.log('upload successful')
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