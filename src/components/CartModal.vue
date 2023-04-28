<template>
  <v-dialog
    v-model="dialog"
    max-width="1200"
  >
<!--    <template v-slot:activator="{ props }">-->
<!--      <v-btn icon="mdi-vuetify" color="green" class="text-none" v-bind="props">-->
<!--        <v-badge v-bind:content="cartCount" color="error">-->
<!--          <v-icon class="mt-1 ">mdi mdi-basket</v-icon>-->
<!--        </v-badge>-->
<!--      </v-btn>-->
<!--    </template>-->
    <v-card>
      <v-card-title>
        <span class="text-h5 text-center">Basket</span>
      </v-card-title>
      <v-card-text>
        <v-table >
          <thead>
          <tr>
            <th class="text-left">
              Товар
            </th>
            <th class="text-left">
              Количество
            </th>
            <th class="text-left">
              Цена
            </th>
            <th class="text-left">
              Сума
            </th>


          </tr>
          </thead>

          <tbody v-for="product in $store.state.cart" :key="product.id">
          <tr>
            <v-container class=" flex-direction: column">
              <td>
                <router-link  class="text-decoration-none" :to="`/product/${product.id}`">
                  <v-img width="100" height="100" class="ma-2" :src="`http://lar/storage/${product.image}`"></v-img>
                  <p class=" ml-1">{{ product.name }}</p>
                </router-link>

              </td>
            </v-container>

            <td>

              <div class="form-group">
                  <span style=" width: 20px;
                    display: inline-flex;
                      justify-content: center;">{{ product.quantity }}</span>
                <v-btn @click="addToCart(product)" size="40" class="small ml-2 mr-1" color="green">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
                <v-btn @click="removeFromCart(product)" size="40" class="small" color="red">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
              </div>
            </td>
            <td>{{ product.price }}</td>
            <td>{{ product.fullPrice }}</td>
            <td>
              <v-btn variant="text" icon="mdi mdi-delete" @click="deleteProduct(product)"
                     class="text-red">

              </v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-container class="ml-5 d-flex">
        <h3 class="text-start">Total price: </h3>
        <p class="ma-auto">{{ $store.getters.totalPrice }} $</p>
      </v-container>
      <v-container class="d-flex justify-end">
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            class="bg-green"
            size="large"
            variant="text"
            @click="dialog = false"
          >
            <router-link class="text-decoration-none " to="/ordering">checkout</router-link>
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="white"
            class="bg-red"
            size="large"
            variant="text"
            @click="dialog = false"
          >
            close
          </v-btn>
        </v-card-actions>
      </v-container>


    </v-card>
  </v-dialog>
</template>


<script>
  export default {
    data: () => ({
      dialog: false
    }),
    computed: {
      cartCount() {
        return this.$store.state.cartCount;
      },
    },
    methods: {
      removeFromCart(product) {
        this.$store.commit('removeFromCart', product);
      },
      addToCart(product) {
        this.$store.commit('addToCart', product);
      },
      deleteProduct(product) {
        this.$store.commit('deleteProduct', product);
      },
      openButton(){
        this.dialog = true;
      }
    },
  }
</script>

<style>

</style>
