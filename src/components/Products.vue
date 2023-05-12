<template>
<v-container>
  <!-- Слайдер рекомендуемых товаров -->
  <v-row class="mt-">
    <v-col cols="12">
      <h3 class="text-uppercase mb-12 text-center">Recommended Products</h3>
      <v-carousel
        :interval="6000"
        cycle height="400"
        :show-arrows="false"
        hide-delimiters
      >
        <v-carousel-item  v-for="(slide, index) in slides" :key="index">
          <v-row>
            <v-col v-for="(recommendation, index) in slide.recommendations" :key="index">
              <v-card class="mx-auto" max-width="300">
                <v-img :src="`http://lar/storage/${recommendation.image}`" cover height="200"></v-img>
                <v-card-title>
                  <h4 class="text-uppercase">{{ recommendation.name }}</h4>
                  <div class="text-h5">{{ recommendation.price }}</div>
                </v-card-title>
                <router-link :to="`/product/${recommendation.id}`" class="text-decoration-none">
                  <v-card-actions>
                    <v-btn color="primary" text>View Details</v-btn>
                  </v-card-actions>
                </router-link>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</v-container>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <div class="text-start mt-3">
            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn large color="primary" v-bind="props">
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
        </v-col>
        <v-col cols="3 " class="mt-3">

          <v-range-slider
            color="orange"
            track-color="purple"
            class="w-60"
            thumb-label="always"
            v-model="priceRange"
            :min="minPrice"
            :max="maxPrice"
            @input="getItems"
            thumb-color="orange"

          />
        </v-col>
        <v-col cols="4">
          <div class=" mx-auto text-center">
            <v-text-field
              v-model="searchQuery"
              append-icon="mdi-magnify"
              label="Find your note"
              rounded
              single-line
              hide-details
              class="search-input "
            ></v-text-field>
          </div>
        </v-col>
      </v-row>

    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="product in paginatedItems"
          :key="product.id"
          cols="3"
        >
          <v-card
            class="mx-auto rounded-lg "
            max-width="300"
          >
            <v-card-title>
              <router-link class="text-decoration-none" :to="`/product/${product.id}`">
                <h4 class="text-h5">
                  {{ product.name }}
                </h4>
              </router-link>

              <v-spacer></v-spacer>
              <span class="text-h6">${{ product.price }}</span>
            </v-card-title>
            <v-card>
              <router-link class="text-decoration-none" :to="`/product/${product.id}`">
                <v-img
                  class="mb-1"
                  height="250"
                  width="300"
                  cover
                  :src="`http://lar/storage/${product.image}`"
                ></v-img>
              </router-link>

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
                class="v-card--reveal overflow-auto"
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
              <v-btn block color="primary" @click="addToCart(product)">
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-pagination
        class="mt-10"
        :total-visible="6"
        color="primary"
        v-model="page.current"
        :length="totalPages"
      ></v-pagination>
    </v-container>
  </div>
</template>
<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  data() {
    return {
      searchQuery: '',
      items: [],
      slides: [],
      products: [],
      priceRange: [0, 0], // начальный диапазон цен
      minPrice: 0, // минимальная цена в списке товаров
      maxPrice: 0, // максимальная цена в списке товаров
      page: {
        current: 1,
        perPage: 8,

      },
      sortItems: [
        {title: 'Стандартная сортировка'},
        {title: "сортировать от меньшей цены к большей"},
        {title: "сортировать от большей цены к меньшей"},
        {title: "Сортировать по имени от а до я"},
        {title: "Сортировать по имени от я до а"},
      ],
      activeSortTitle: "Сортировать",
      reveal: null
    };
  },
  created() {
    this.getItems();
    this.getProductsRec();
  },

  methods: {

    async getItems() {
      try {
        const response = await axios.get("http://lar/api/items");
        this.items = response.data;
        // Вычисляем минимальную и максимальную цены
        let minPrice = 0;
        let maxPrice = 0;
        this.items.forEach(item => {
          if (item.price < minPrice) {
            minPrice = item.price;
          }
          if (item.price > maxPrice) {
            maxPrice = item.price;
          }
        });
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.priceRange = [0, maxPrice];
      } catch (error) {
        console.log(error);
      }
      console.log(this.items.length);
    },
    async getProductsRec() {
      try {
        const response = await axios.get("http://lar/api/showRecommendation");
        this.products = response.data;
        const items = response.data;
        // Group items into slides
        const slideCount = Math.ceil(items.length / 4);
        for (let i = 0; i < slideCount; i++) {
          const slideItems = items.slice(i * 4, (i + 1) * 4);
          const slide = {
            recommendations: slideItems.map((item) => ({
              id: item.id,
              name: item.name,
              image: item.image,
              price: `$${item.price}`,
            })),
          };
          this.slides.push(slide);
        }
      } catch (error) {
        console.log(error);
      }
    },

    addToCart(product) {
      this.$store.commit('addToCart', product); // Добавляем товар в корзину
      this.showAlert('Товар добавлен');
    }
    ,
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
    }
    ,
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
    }
    ,
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const priceMatch = item.price >= this.priceRange[0] && item.price <= this.priceRange[1];
        return nameMatch && priceMatch;
      });
    }
    ,
    paginatedItems() {
      const start = (this.page.current - 1) * this.page.perPage;
      const end = start + this.page.perPage;
      return this.filteredItems.slice(start, end);
    }
    ,
    totalPages() {
      return Math.ceil(this.filteredItems.length / this.page.perPage);
    }
    ,
  }
  ,
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


