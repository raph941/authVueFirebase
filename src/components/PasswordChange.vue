<template>
<v-card class="passChangeCard">
    <v-layout row v-if="error">
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </v-layout>
    <!-- change password -->
    <v-form @submit.prevent="onPassChange" ref="form" lazy-validation >
      <v-text-field
        name="currentPassword"
        label="Current Password"
        id="currentPassword"
        v-model="currentPassword"
        type="password"
      ></v-text-field>
      <v-text-field
        name="newPassword"
        label="new Password"
        id="newPassword"
        v-model="newPassword"
        type="password"
        :error-messages="newPasswordErrors"
        @input="$v.newPassword.$touch()"
        @blur="$v.newPassword.$touch()"
      ></v-text-field>
      <v-text-field
        name="confirmPassword"
        label="Confirm New Password"
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        :error-messages="confirmPasswordErrors"
        @input="$v.confirmPassword.$touch()"
        @blur="$v.confirmPassword.$touch()"
      ></v-text-field>

      <v-btn type="submit" :disabled="formIsInvalid" class="blue">
          Submit
      </v-btn>

    </v-form>
</v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'
import passChangeValidation from '@/mixins/passwordChangeValidation'
import Alert from '@/components/Alert/ErrorAlert'


export default {
  mixins: [validationMixin, passChangeValidation],
  components: {
    'app-alert' : Alert
  },
  data() {
      return {
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
      }
  },
  validations:{
    newPassword: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAs: sameAs('newPassword') }
  },
  computed: {
    formIsInvalid () {
        //this checks the overall form invalidity. returns true if form is invalid
        return this.$v.$invalid
    },
    error () {
        return this.$store.getters.error
    }
  },
  methods: {
    onPassChange() {
      var passChangeData = {
        currentPassword: this.currentPassword, 
        newPassword: this.newPassword, 
      }
      console.log(passChangeData)
      this.$store.dispatch('changePassword', passChangeData)
    }
  }
    
}
</script>

<style scoped>
.passChangeCard{
    margin: 20px;
}
</style>