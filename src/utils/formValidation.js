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
        //this helps to return error message when password fields are wrong
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('password is required')
        !this.$v.password.minLength && errors.push('password must be at least 8 characters')
        return errors
    },
    confirmPasswordErrors () {
        //this helps to return error message when passwords fields do not match
        const errors = []
        if (!this.$v.confirmPassword.$dirty) return errors
        !this.$v.confirmPassword.required && errors.push('password is required')
        !this.$v.confirmPassword.sameAs && errors.push('password does not match')
        return errors
    },
  }
};