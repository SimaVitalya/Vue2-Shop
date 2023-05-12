<template>
  <v-card elevation="10" height="430" width="300" class=" rounded-lg" max-width="300">

    <div class="d-flex justify-center mt-auto text-h5 ">
      Rating overview
    </div>

    <div class="d-flex align-center flex-column my-auto">
      <div  class="text-h2 mt-5">
        {{ averageRating }}
        <span  class="text-h6 ml-n3">/5</span>
      </div>

      <v-rating
        v-model="averageRating"
        color="primary"
        readonly
        half-increments
        @update:model-value="getRatings"
      ></v-rating>
      <div class="px-3">{{ totalRatings }} ratings</div>
    </div>

    <v-list
      bg-color="transparent"
      class="d-flex flex-column-reverse"
      density="compact"
    >
      <v-list-item v-for="(rating,i) in 5" :key="i">
        <v-progress-linear
          :model-value="ratingPercentage(rating)"
          class="mx-n5"
          color="primary"
          height="20"
          rounded
        ></v-progress-linear>

        <template v-slot:prepend>
          <span>{{ rating }}</span>
          <v-icon icon="mdi-star" class="mx-3"></v-icon>
        </template>

        <template v-slot:append>
          <div class="rating-values">
            <span class="d-flex justify-end">{{ ratingCount(rating) }}</span>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    productId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      ratings: [],
      averageRating: 0
    };
  },
  computed: {
    totalRatings() {
      return this.ratings.length;
    }
  },
  methods: {
    ratingCount(rating) {
      const count = this.ratings.filter((r) => r === rating).length;
      return count.toLocaleString();
    },
    ratingPercentage(rating) {
      const count = this.ratings.filter((r) => r === rating).length;
      const percentage = (count / this.ratings.length) * 100;
      return percentage.toFixed(0);
    },
    getRatings() {
      axios.get(`http://lar/api/products/${this.$route.params.id}/ratings`)
        .then(response => {
          this.ratings = response.data;
          const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
          this.averageRating = (sum / this.ratings.length).toFixed(1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getRatings();
  },

}
</script>
