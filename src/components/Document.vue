<template>
  <div class="relative">
    <v-text-field
      clearable
      label="Search products"
      v-model="searchTerm"
      @click="handleInput"
      @input="handleInput"
    ></v-text-field>
    <v-list
      max-width="375"
      min-height="100"
      max-height="350"
      class="overflow-auto"
      v-if="items.length && searchTerm"
      style="z-index: 1000;"
    >
      <v-list-item v-for="item in items" :key="item.id">
        <router-link class="text-decoration-none" :to="`/product/${item.id}`">
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </router-link>
        <v-img class="mb-1"
                height="70"
                width="70"
                cover
                :src="`http://lar/storage/${item.image}`"
      ></v-img>
      </v-list-item>
    </v-list>
    <div class="absolute inset-0 bg-gray-700 opacity-50 z-50"
         v-if="items.length && searchTerm"
         @click="handleOverlayClick"
    ></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchTerm: "",
      items: [],
    };
  },
  methods: {
    handleInput() {
      if (!this.searchTerm) {
        this.items = [];
        return;
      }
      axios
        .get(`http://lar/api/items`)
        .then((response) => {
          this.items = response.data.filter((item) =>
            item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          if (this.items.length === 0) {
            this.items = [{ id: 0, name: "No items found" }];
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleOverlayClick() {
      this.items = [];
      this.searchTerm = "";
    }
  },
};
</script>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
