import { store } from "../Store/"

// takes care of restricting routes based on authentication status of users
export default (to, from, next) => {
    if (store.getters.user) {
        next()
    } else {
        next('/signin')
    }
}