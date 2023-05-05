<template>
  <div>
    <v-range-slider class="w-25" thumb-label="always" v-model="priceRange" :min="minPrice" :max="maxPrice"
                    @change="getItems"/>
    <div class="items-list">
      <div v-for="item in filteredItems" :key="item.id" class="item">
        <div class="item-image">
          <img width="200" :src="`http://lar/storage/${item.image}`"
               :alt="item.name"/>
        </div>
        <div class="item-details">
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <div class="item-price">{{ item.price }} руб.</div>
          <button @click="addToCart(item)">Добавить в корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {

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
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
