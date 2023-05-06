<template>
  <div>
    <price-filter  @filter="updatePriceRange"></price-filter>
    <test-component :items="filteredItems"></test-component>
  </div>
</template>

<script>
import axios from 'axios';
import priceFilter from "@/components/PriceFilter";
import TestComponent from "@/components/TestComponent";

export default {
  components: {
    priceFilter,
    TestComponent,
  },
  data() {
    return {
      items: [],
      priceRange: [0, 1000], // начальный диапазон цен
      minPrice: 0, // минимальная цена в списке товаров
      maxPrice: 0, // максимальная цена в списке товаров
    };
  },
  mounted() {
    this.getItems();
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => item.price >= this.priceRange[0] && item.price <= this.priceRange[1]);
    },
  },
  methods: {
    getItems() {
      axios.get(`http://lar/api/items?minPrice=${this.priceRange[0]}&maxPrice=${this.priceRange[1]}`).then((response) => {
        this.items = response.data;
        // Вычисляем минимальную и максимальную цены
        this.minPrice = Math.min(...this.items.map((item) => item.price));
        this.maxPrice = Math.max(...this.items.map((item) => item.price));
      }).catch((error) => {
        console.log(error);
      });
    },
    updatePriceRange(range) {
      this.priceRange = range;
      this.getItems();
    },
  },
};
</script>
