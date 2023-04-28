<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-form @submit.prevent="submitForm">
          <v-select v-model="form.region" :items="region" label="Введите область"></v-select>
          <v-select v-model="form.city" :items="city" label="Введите город"></v-select>
          <v-select v-model="form.postOffice" :items="postOffice" label="Выберите отделение Новой Почты"></v-select>
          <v-btn type="submit" color="primary">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        region: '',
        city: '',
        postOffice: ''
      },
      region: [],
      city: [],
      postOffice: []
    }
  },
  methods: {
    showRegions() {
      axios.get(`http://lar/api/region`)
        .then(backend => {

          this.region = backend.data.Ru;
          console.log(this.region)
        })
        .catch(error => {
          console.log(error);
        });
    },
    showCities(region) {
      axios.get(`http://lar/api/region/${region}`)
        .then(response => {
          console.log(response)
          this.city = response.data.Ru;
          console.log(` ${region}: ${this.city.length}`);
        })
        .catch(error => {
          console.log(error);
        });
    }
    ,
    showPostOffices() {
      if (this.form.city) {
        axios.get(`http://lar/api/postalOffices/${this.form.city}`)
          .then(response => {
            console.log(response)
            this.postOffice = response;
            console.log(` ${this.form.city}: ${this.postOffice.length}`);
          })
          .catch(response => {
            console.log(response)
            this.postOffice = response.data;
            console.log(this.postOffice);
          });
      }
    },
    submitForm() {
      // отправка данных формы
      // ...

      // получение отделений почты для выбранного города
      this.showPostOffices();
    }
  },
  watch: {
    'form.region': function(newVal, oldVal) {
      if (newVal) {
        this.showCities(newVal);
      }
    },
    'form.city': function(newVal, oldVal) {
      if (newVal) {
        this.showPostOffices();
      }
    }
  },
  mounted() {
    this.showRegions();
  }
}
</script>
