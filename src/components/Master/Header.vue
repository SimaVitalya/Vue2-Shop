<template>
  <v-container fluid class="bg-blue-grey-lighten-2"

  >
    <v-container>
      <v-row>
        <v-col cols="1"
        >
          <v-img
            src="git.svg"
            width="55"
            height="55"
          >
          </v-img>
        </v-col>
        <v-col cols="5" class="mt-n1">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-container class="mt-n4">
            <v-btn color="purple" variant="text">
              <router-link class="text-decoration-none" to="/">Main</router-link>
            </v-btn>
            <v-btn color="purple" variant="text">
              <router-link class="text-decoration-none" to="/products">Products</router-link>
            </v-btn>
            <v-btn color="purple" variant="text">
              <router-link class="text-decoration-none" to="/tester">tester</router-link>
            </v-btn>
            <v-btn color="purple" variant="text">
              <router-link class="text-decoration-none" to="/price">price</router-link>
            </v-btn>
            <v-btn color="purple" variant="text">
              <router-link class="text-decoration-none" to="/fulltest">fulltest</router-link>
            </v-btn>

            <v-btn color="purple" variant="text">
              <router-link class="text-decoration-none" to="/sort">sort</router-link>
            </v-btn>
            <v-menu bottom left>
              <template v-slot:activator="{ props }">
                <v-btn  class="text-decoration-none" color="purple" variant="text" v-bind="props">categories</v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(category, index) in categories" :key="index">
                  <router-link class="text-decoration-none" :to="`/categories/${category.id}`">
                    <v-list-item-title>{{ category.name }}</v-list-item-title>
                  </router-link>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-btn color="purple" variant="text">
              <router-link class="text-decoration-none" to="/ordering">FORM</router-link>
            </v-btn>
            <v-btn color="black" icon="mdi mdi-account" variant="text"></v-btn>
            <cart-modal ref="cart-modal"></cart-modal>
<!--            <v-btn @click="openModal" color="black" icon="mdi mdi-basket" variant="text"></v-btn>-->
                  <v-btn  icon="mdi mdi-basket" color="black" variant="text" class="text-none " @click="openModal" >
                    <v-badge v-bind:content="$store.state.cartCount" color="error">
                      <v-icon class="mt-1 ">mdi mdi-basket</v-icon>
                    </v-badge>
                  </v-btn>
            <v-btn
              variant="text"
              color="black"
              icon="mdi mdi-brightness-6"
              @click="toggleTheme"
            ></v-btn>

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
    openModal()
    {
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
