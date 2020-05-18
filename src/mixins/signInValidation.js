export default {
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
          //this helps to return error message when password fields has not been filled
          const errors = []
          if (!this.$v.password.$dirty) return errors
          !this.$v.password.required && errors.push('password is required')
          return errors
      },
    }
  };