<template>
  <v-container></v-container>
  <div>
    <v-container>
      <v-row>
        <v-col cols="4">
          <div class="text-start mt-3">
            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn large color="primary" v-bind="props"> {{ activeSortTitle }}</v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in sortItems" :key="index" @click="sort(item)"
                             :ripple="{ class: 'text-purple' }">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="3 " class="mt-3">
          <div >

            <v-range-slider
              color="orange"
              track-color="purple"
              class="w-60"
              thumb-label="always"
              v-model="priceRange"
              :min="minPrice"
              :max="maxPrice"
              thumb-color="orange"
              :disabled="loading"
              @input="getItems(1)"
            />
            <v-btn style="margin-left: 77px" class="mt-n12  " color="success" size="x-small"  @click="getItems(1)">
              <p style="font-size: 10px">Поиск по цене</p>
            </v-btn>

          </div>
          <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
        </v-col>
        <v-col cols="4">
          <div class=" mx-auto text-center">
            <v-text-field
              v-model="searchQuery"
              label="Find your note"
              rounded
              single-line
              hide-details
              @keydown.enter="getItems(1)"
              class="search-input"
              :disabled="loading"
            >
              <template #append>
                <v-icon color="primary" @click="getItems(1)">mdi-magnify</v-icon>
              </template>
            </v-text-field>

            <v-overlay :value="loading">
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
          </div>
        </v-col>
      </v-row>

    </v-container>
    <v-container>
      <v-row>
        <v-col
          v-for="product in paginatedItems()"
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
        v-model="page"
        :length="totalPages"
      ></v-pagination>
    </v-container>
  </div>
</template>
<script> import axios from 'axios';

export default {
  data() {
    return {
      loading: false,
      searchQuery: '',
      items: [],
      products: [],
      filteredItems: [],
      priceRange: [0, 0], // начальный диапазон цен
      minPrice: 0, // минимальная цена в списке товаров
      maxPrice: 0, // максимальная цена в списке товаров
      order_by: 'name',
      sort_by: 'asc',
      page: 1,
      perPage: 8,
      current: 1,
      totalPages: 0,
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
    this.getItems().then(()=>{this.priceRange = [0,this.maxPrice]});

  },

  methods: {
    async getItems(page = 1) {
      this.loading = true;
      try {
        const response = await axios.post("http://lar/api/products", {
          'order_by': this.order_by,
          'sort_by': this.sort_by,
          'search_query': this.searchQuery,
          'price_range': this.priceRange,
          'page': page,
          'per_page': this.perPage,
        });
        this.items = response.data.products.data;
        console.log(response.data);
        console.log(response.data.products.data);
        console.log('last_page:', response.data.products.last_page);
        console.log('max_price:', response.data.max_price);
        this.filteredItems = response.data.products.data;
        console.log('filter:', this.filteredItems)
        this.totalPages = response.data.products.last_page;
        this.maxPrice = response.data.max_price;
        // this.priceRange = [0, response.data.max_price];
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    sort(item) {
      if (item.title === "Стандартная сортировка") {
        this.activeSortTitle = "Стандартная сортировка";
        this.order_by = "name";
        this.sort_by = "desc";
      } else if (item.title === "сортировать от меньшей цены к большей") {
        this.activeSortTitle = "сортировать от меньшей цены к большей";
        this.order_by = "price";
        this.sort_by = "asc";
      } else if (item.title === "сортировать от большей цены к меньшей") {
        this.activeSortTitle = "сортировать от большей цены к меньшей";
        this.order_by = "price";
        this.sort_by = "desc";
      } else if (item.title === "Сортировать по имени от я до а") {
        this.activeSortTitle = "Сортировать по имени от я до а";
        this.order_by = "name";
        this.sort_by = "desc";
      } else if (item.title === "Сортировать по имени от а до я") {
        this.activeSortTitle = "Сортировать по имени от а до я";
        this.order_by = "name";
        this.sort_by = "asc";
      }
      this.getItems();
    },
    paginatedItems() {
      const start = (this.current - 1) * this.perPage;
      const end = start + this.perPage;
      return this.filteredItems.slice(start, end);

    }
  },
  watch: {
    page(newPage, oldPage) {
      if (newPage !== oldPage) {
        this.getItems(newPage);
      }
    },
    // searchQuery(newSearch, oldSearch) {
    //   if (newSearch !== oldSearch) {
    //     this.getItems(newSearch);
    //   }
    // },
    // priceRange(newPriceRange, oldPriceRange) {
    //   if (newPriceRange !== oldPriceRange) {
    //     this.getItems(newPriceRange);
    //   }
    // },
    // priceRange() {
    //   this.getItems();
    // },
  }
}
</script>
