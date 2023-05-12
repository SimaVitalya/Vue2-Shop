<template>
  <v-container fluid class="bg-black mb-10 " style="max-height: 100px"
  >
    <v-container>
      <v-row>
        <v-col cols="2"
        >
          <v-img class="mt-n1"
                 src="test1.logo.png"
                 width="150"
                 height="70"
          >
          </v-img>
        </v-col>
        <v-col cols="4" class="mt-n1">
          <v-text-field clearable v-model="searchTerm" @input="searchItems" label="Search products"></v-text-field>
          <v-list
            mix-width="375"
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
              <v-img
                class="mb-1"
                height="70"
                width="70"
                cover
                :src="`http://lar/storage/${item.image}`"
              ></v-img>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6 " class="text-end">
          <v-container class="mt-n4">
            <v-btn color="white" variant="text">
              <router-link class="text-decoration-none" to="/">Main</router-link>
            </v-btn>
            <v-btn color="white" variant="text">
              <router-link class="text-decoration-none" to="/products">Products</router-link>
            </v-btn>

            <v-menu bottom left>
              <template v-slot:activator="{ props }">
                <v-btn class="text-decoration-none" color="white" variant="text" v-bind="props">categories</v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(category, index) in categories" :key="index">
                  <router-link class="text-decoration-none" :to="`/categories/${category.id}`">
                    <v-list-item-title>{{ category.name }}</v-list-item-title>
                  </router-link>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-btn color="white" variant="text">
              <router-link class="text-decoration-none" to="/ordering">FORM</router-link>
            </v-btn>

            <router-link class="text-decoration-none" to="/users/login">
              <v-btn color="white" icon="mdi mdi-account" variant="text"></v-btn>
            </router-link>

            <cart-modal ref="cart-modal"></cart-modal>
            <v-btn icon="mdi mdi-basket" color="white" variant="text" class="text-none" @click="openModal">
              <v-badge v-bind:content="$store.state.cartCount" color="error">
                <v-icon class="mt-1">mdi mdi-basket</v-icon>
              </v-badge>
            </v-btn>
            <v-btn variant="text" color="white" icon="mdi mdi-brightness-6" @click="toggleTheme"></v-btn>

          </v-container>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>
<script>
import {useTheme} from 'vuetify'
import axios from "axios";
import CartModal from "@/components/CartModal";


export default {
  components: {CartModal},
  data() {
    return {
      searchTerm: '',
      items: []
    }
  }
  ,
  setup() {
    const theme = useTheme()

    return {
      dialogHeader: false,
      theme,
      toggleTheme: () => theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark',
      categories: [],
    }
  }, methods: {
    async getCategories() {
      await axios.get('http://lar/api/categories')
        .then(backend => {
          this.categories = backend.data
        })
    },
    searchItems() {
      if (!this.searchTerm) {
        this.items = []; // если поисковый запрос пуст, очищаем список элементов
        return;
      }

      axios.get(`http://lar/api/items`)
        .then(response => {
          console.log(response.data); // добавлено для отладки
          this.items = response.data.filter(item =>
            item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          )

          if (this.items.length === 0) {
            this.items = [{id: 0, name: 'No items found'}]; // если элементы не найдены, добавляем заглушку
          }
        })
        .catch(error => {
          console.error(error);
        });
    },
    openModal() {
      this.$refs['cart-modal'].openButton()
    }
  },

  mounted() {
    this.getCategories()

  },
}
</script>

<style scoped>


</style>
