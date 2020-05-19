<template>
<div>
<v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
<v-toolbar >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>FireBase Vue User Authentication</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn text router to="/signin">
        SignIn
    </v-btn>

    <v-btn text @click="onLogout">
        Signout
    </v-btn>

    <v-btn text router to="/signup">
        SignUp
    </v-btn>

    <v-btn text router to="/profile">
        Profile
    </v-btn>
    
</v-toolbar>

<router-view></router-view>

</v-card>
    
</div>
</template>


<script>
 export default {
     methods: {
        onLogout () {
            this.$store.dispatch('logout')
            this.$router.push('/')
        }
     }
 }
</script>