<template>
  <div>
    <v-alert
      @input="onClose"
      dismissible
      color="red"
      border="left"
      elevation="2"
      colored-border
      error
      :value="true"
    >
      {{ text }}
    </v-alert>
  </div>
</template>

<script>
  export default {
    props: ['text'],
    methods: {
        onClose () {
            this.$emit('dismissed')
        }
    }
  }
</script>