<template>
<v-container>
    <v-card>
      <v-card-text name="name">Name: {{ name }}</v-card-text>
      <v-card-text name="email">Email: {{ email }}</v-card-text>
      <v-card-text name="phoneNumber">Phone Number: {{ phoneNumber }}</v-card-text>
      <v-card-text name="profileImageUrl">profile Image Url: {{ profileImageUrl }}</v-card-text>
      <v-btn @click="showEditForm = true, showChangePass = false, showFileUpload = false">Edit</v-btn>
      <v-btn @click="showChangePass = true, showEditForm = false, showFileUpload = false">Change Password</v-btn>
      <v-btn @click="showChangePass = false, showEditForm = false, showFileUpload = true">Upload Image</v-btn>
    </v-card>

    <v-card class="editForm col-sm-6" v-if="showEditForm">
      <!-- edit user profile info -->
    <v-form @submit.prevent="onSubmit" ref="form" lazy-validation >
      <v-text-field
        name="name"
        label="Full Name"
        id="name"
        v-model="name"
        required >
      </v-text-field>

      <v-text-field
        name="email"
        label="Email"
        id="email"
        v-model="email"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()">
      </v-text-field>

      <v-text-field
        name="phoneNumber"
        label="Phone Number"
        id="phoneNumber"
        v-model="phoneNumber"
        type="number"
        required >
      </v-text-field>

      <v-btn type="submit" class="blue">
          Submit
      </v-btn>

    </v-form>
    </v-card>

     <div class="editForm col-sm-6" v-if="showChangePass">
       <password-change></password-change>
    </div> 
    <div class="editForm col-sm-6" v-if="showFileUpload">
       <profile-image></profile-image>
    </div>   
</v-container>
</template>

<script>
import passwordChange from '@/components/PasswordChange'
import fileUpload from '@/components/uploadProfilePicture'

export default {
  components: {
    'password-change': passwordChange,
    'profile-image': fileUpload,
  },
  data() {
    return {
      showChangePass: false,
      showEditForm: false,
      showFileUpload: false,
      email: "",
      name: "",
      phoneNumber: "",
      profileImageUrl: "",
    };
  },
  computed: {
    user: {
        // getter
        get() {
            return this.$store.getters.user
        },
        // set(newValue) {
        //   console.log('helllo world:' + newValue)
        // }
    },
  },
  watch: {
      user (value) {
          if (value !== null && value !== undefined ) {
              this.email = value.email
              this.phoneNumber = value.phoneNumber
              this.name = value.name
              this.profileImageUrl = value.imageUrl
          }
      }
  },
  methods: {
    onSubmit() {
      if (this.email.trim() === '' || this.name.trim() === '' || this.phoneNumber.trim() === '') {
                return
            }
          var userData = {
            name: this.name, 
            email: this.email, 
            phoneNumber: this.phoneNumber
          }
        this.$store.dispatch('updateUser', userData)
    },
  },
};
</script>

<style scoped>
  .editForm{
    margin:20px;
  }
</style>
