<template>
  <v-container>
    <div class="d-flex justify-end">
      <v-btn
        id="menu-activator"
        color="primary"
      >
        Sort-by
      </v-btn>

      <v-menu activator="#menu-activator">
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-container>
  <!--  sort end-->
  <!--  product start-->
  <v-container>
    <v-row>
      <v-col
        v-for="product in products"
        cols="3"
        :key="product.id"
      >
        <v-card
          variant="outlined"
          class="mx-auto rounded-lg"
          max-width="250"
        >
          <v-card-title>
            <h4 class="text-h5">
              {{ product.name }}
            </h4>
            <v-spacer></v-spacer>
            <span class="text-h6">${{ product.price }}</span>
          </v-card-title>
          <v-card>
            <v-img class="mb-3" height="250" width="250" :src="`http://lar/storage/${product.image}`"></v-img>
          </v-card>
          <v-card-actions class="justify-center">
            <v-btn
              variant="text"
              color="teal-accent-4"
              @click="reveal = product.id"
            >
              Learn More
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <v-card
              v-if="reveal === product.id"
              class="v-card--reveal"
              style="height: 100%;"
            >
              <v-card-text class="pb-0">
                <p class="text-h4 text--primary">
                  Origin
                </p>
                <p>{{ product.description }} </p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn
                  variant="text"
                  color="teal-accent-4"
                  @click="reveal =null"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-expand-transition>

          <v-divider class="mx-4"></v-divider>
          <v-card-actions>
            <v-btn block color="orange" @click="addToCart(product)">
              Add to Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!--  product-end-->
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {

  data: () => ({
    selection: 2,
    reveal: false,
    items: [
      {title: 'Price >'},
      {title: 'Price <'},
      {title: 'Name a-z'},
      {title: 'Name z-a'},
    ],
    products: [],
  }),
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getProducts() {
      axios.get(`http://lar/api/categories/${this.id}`)
        .then(backend => {
          this.products = backend.data;
        })
    }, addToCart(product) {
      this.$store.commit('addToCart', product); // Добавляем товар в корзину
      this.showAlert('Товар добавлен');
    },
    showAlert() {
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
        title: 'Товар добавлен'
      });
    },

  },

  watch: {
    id: function (newId, oldId) {
      this.getProducts();
    }
  },
  mounted() {
    this.getProducts()

  },
}
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
