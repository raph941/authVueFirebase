<template>
<v-card class="userUploadCard">
    <!-- change password -->
    <v-form @submit.prevent="onFileSubmit" ref="form" lazy-validation >
      <v-file-input v-model="image" accept="image/*" label="File input"></v-file-input>
      <v-btn type="submit" class="blue">
          Submit
      </v-btn>

    </v-form>
</v-card>
</template>

<script>

export default {
  data() {
      return {
          image: null,
      }
  },
  methods: {
    onFileSubmit() {
        console.log(this.image.file)
        var imageData = {
            image: this.image
        }
     this.$store.dispatch('uploadProfilePic', imageData)
    }
  }
    
}
</script>

<style scoped>
.userUploadCard{
    margin: 20px;
}
</style>