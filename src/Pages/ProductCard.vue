<template>
  <v-card  >
    <v-card-title>
      <h4 class="text-h5">{{ product.name }}</h4>
      <v-spacer></v-spacer>
      <span class="text-h6">${{ product.price }}</span>
    </v-card-title>
    <v-card>
      <v-img
        class="mb-1"
        height="250"
        width="300"
        cover
        :src="`http://lar/storage/${product.image}`"
      ></v-img>
    </v-card>

    <v-card-actions class="justify-center">
      <v-btn variant="text" color="teal-accent-4" @click="reveal = product.id">Learn More</v-btn>
    </v-card-actions>

    <v-card v-if="reveal === product.id" class="v-card--reveal" style="height: 100%;">
      <v-card-text class="pb-0">
        <p class="text-h4 text--primary">Description</p>
        <p>{{ product.description }}</p>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-btn variant="text" color="teal-accent-4" @click="reveal = null" style="margin-bottom: 10px;">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card-actions>
      <v-btn block color="orange" @click="addToCart(product)">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Swal from "sweetalert2";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    reveal: null,
  }),
  methods: {
    addToCart(product) {
      this.$store.commit('addToCart', product); // Добавляем товар в корзину

      this.showAlert('Товар добавлен');
    },
    showAlert(message) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,

        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: message
      });
    },
  },
};
</script>
