<template>
  <v-container>
    <div class="text-start">
      <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" >
            {{ activeSortTitle }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in sortItems"
                       :key="index"
                       @click="sort(item)"
                       :ripple="{ class: 'text-purple' }"

          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-container>
  <v-container>
    <v-row>
      <v-col
        v-for="product in paginatedItems"
        :key="product.id"
        cols="3"
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
            <v-img
              class="mb-3"
              height="250"
              width="250"
              :src="`http://lar/storage/${product.image}`"
            ></v-img>
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
                  Description
                </p>
                <p>{{ product.description }} </p>
              </v-card-text>
              <v-card-actions class="pt-0">
                <v-btn
                  variant="text"
                  color="teal-accent-4"
                  @click="reveal = null"
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
    <v-pagination
      :total-visible="6"
      color="primary"
      v-model="page.current"
      :length="totalPages"
    ></v-pagination>

  </v-container>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      reveal: null,
      items: [],
      page: {
        current: 1,
        length: 8,
      },
      sortItems: [
        {title: 'Стандартная сортировка'},
        {title: "сортировать от меньшей цены к большей"},
        {title: "сортировать от большей цены к меньшей"},
        {title: "Сортировать по имени от а до я"},
        {title: "Сортировать по имени от я до а"},
      ],
      activeSortTitle: "Сортировать",
    };
  },
  mounted() {
    this.getItems();
  },
  computed: {
    paginatedItems() {
      const start = (this.page.current - 1) * this.page.length;
      const end = start + this.page.length;
      return this.items.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.items.length / this.page.length);
    },
  },
  methods: {
    getItems() {
      axios.get("http://lar/api/items").then((response) => {
        this.items = response.data;
        console.log(this.items);
      });
    },
    sort(item) {
      if (item.title === "Стандартная сортировка") {
        this.activeSortTitle = "Стандартная сортировка";
        this.items.sort((a, b) => a.id - b.id); // Стандартная сортировка
      }
      if (item.title === "сортировать от меньшей цены к большей") {
        this.activeSortTitle = "сортировать от меньшей цены к большей";
        this.items.sort((a, b) => a.price - b.price);
      } else if (item.title === "сортировать от большей цены к меньшей") {
        this.activeSortTitle = "сортировать от большей цены к меньшей";
        this.items.sort((a, b) => b.price - a.price);
      } else if (item.title === "Сортировать по имени от я до а") {
        this.activeSortTitle = "Сортировать по имени от я до а";
        this.items.sort((a, b) => b.name.localeCompare(a.name));
      } else if (item.title === "Сортировать по имени от а до я") {
        this.activeSortTitle = "Сортировать по имени от а до я";
        this.items.sort((a, b) => a.name.localeCompare(b.name));
      }
    },
    addToCart(product) {
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
        title: 'Товар добавлен',

      });
    },
  },
};
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
