<template>
  <v-container>
    <v-layout row>
      <v-flex class="col-xs-12 col-sm-6 offset-sm3 grey--text">
        <v-card>
          <v-card-text>
            <v-container>
              <v-layout row v-if="error">
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
              </v-layout>
              <v-layout row>
                <v-card-text class="blue--text">
                  <h2>Signin</h2>
                </v-card-text>
              </v-layout>
              <v-form @submit.prevent="onSignin" ref="form" lazy-validation>
                <v-layout row>
                  <v-flex>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      required
                      :error-messages="emailErrors"
                      @input="$v.email.$touch()"
                      @blur="$v.email.$touch()"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      :error-messages="passwordErrors"
                      @input="$v.password.$touch()"
                      @blur="$v.password.$touch()"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-btn type="submit" :disabled="formIsInvalid" class="blue">
                        Submit
                    </v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-card-tex>{{ message }}</v-card-tex>
                    <v-btn text @click="onLogout">Signout</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      message: ''
    };
  },
  validations:{
    email: { required, email },
    password: { required },
  },
  computed: {
    emailErrors () {
        //this helps to return error message when email fields are wrong
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be a valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
    },
    passwordErrors () {
        //this helps to return error message when password fields are wrong
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('password is required')
        return errors
    },
    formIsInvalid () {
        //this checks the overall form invalidity. returns true if form is invalid
        return this.$v.$invalid
    },
    user () {
        return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
      user (value) {
          if (value !== null && value !== undefined ) {
              this.message = "User Signed In"
          }
      }
  },
  methods: {
    onSignin() {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
};
</script>
