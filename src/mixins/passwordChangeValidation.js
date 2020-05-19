export default {
  computed: {
    newPasswordErrors () {
        //this helps to return error message when password fields are wrong (used for SignUp)
        const errors = []
        if (!this.$v.newPassword.$dirty) return errors
        !this.$v.newPassword.required && errors.push('password is required')
        !this.$v.newPassword.minLength && errors.push('password must be at least 8 characters')
        return errors
    },
    confirmPasswordErrors () {
        //this helps to return error message when passwords fields do not match (Used for SignUp)
        const errors = []
        if (!this.$v.confirmPassword.$dirty) return errors
        !this.$v.confirmPassword.required && errors.push('password is required')
        !this.$v.confirmPassword.sameAs && errors.push('password does not match')
        return errors
    },
  }
};