<template>
  <v-form @submit.prevent="submitForm">
    <v-text-field v-model="form.name" label="Name" required></v-text-field>
    <v-textarea v-model="form.description" label="Description"></v-textarea>
    <v-text-field v-model="form.code" label="Code" required></v-text-field>
    <v-text-field v-model="form.price" label="Price" required></v-text-field>
    <v-select v-model="form.category_id" :items="categories" label="Category"></v-select>
    <v-file-input v-model="form.image" label="Image"></v-file-input>
    <v-btn type="submit" color="primary">Submit</v-btn>
  </v-form>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        code: '',
        price: '',
        category_id: '',
        image: null
      },
      categories: ['1', '2', '3']
    }
  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('description', this.form.description);
      formData.append('code', this.form.code);
      formData.append('price', this.form.price);
      formData.append('category_id', this.form.category_id);
      formData.append('image', this.form.image);

      axios.post('http://lar/api/create', formData)
        .then(response => {
          this.form.name = null
          this.form.description = null
          this.form.code = null
          this.form.price = null
          this.form.category_id = null
          this.form.image = null
          console.log(response)

        }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>
