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
                <v-text class="blue--text">
                  <h2>Signup</h2>
                </v-text>
              </v-layout>
              <v-form @submit.prevent="onSignup" ref="form" lazy-validation>
                <v-layout row>
                  <v-flex>
                    <v-text-field
                      name="name"
                      label="Full Name"
                      id="name"
                      v-model="name"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
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
                      name="phone"
                      label="Phone Number"
                      id="phone"
                      v-model="phone"
                      type="number"
                      required
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
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :error-messages="confirmPasswordErrors"
                      @input="$v.confirmPassword.$touch()"
                      @blur="$v.confirmPassword.$touch()"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex>
                    <v-btn type="submit" :disabled="formIsInvalid" class="blue">
                        Submit
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-card-text>{{ message }}  </v-card-text>
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import signUpValidation from '@/mixins/signUpValidation'
import Alert from '@/components/Alert/ErrorAlert'

export default {
  mixins: [validationMixin, signUpValidation],
  components: {
    'app-alert' : Alert
  },
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      valid: false,
      message: ''
    };
  },
  validations:{
    email: { required, email },
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAs: sameAs('password') }
  },
  computed: {
    formIsInvalid () {
        //this checks the overall form invalidity. returns true if form is invalid
        return this.$v.$invalid
    },
    user () {
        // this returns the currently signedIn user from the store
        return this.$store.getters.user
    },
    error () {
        return this.$store.getters.error
    }
  },
  watch: {
      user (value) {
          if (value !== null && value !== undefined ) {
              // when signup is successful, this function is evaluated
              this.message = "SignedUp Successfully"
          }
      },
  },
  methods: {
    onSignup() {
        this.$store.dispatch('signUserUp', {
          // more input parameters can be passed here as payload
          name: this.name, 
          email: this.email, 
          password: this.password, 
          phoneNumber: this.phone})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    },
  },
};
</script>