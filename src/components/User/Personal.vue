<template>
  <v-container>
    <h1 style="margin-left: 30px" class="text-end text-button">Personal Page
      <router-link to="">
        <v-btn class="ml-4" color="primary" dark @click.prevent="logout">
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </router-link>
    </h1>
  </v-container>
  <div>
    <h2 class="text-center mt-5 text-h4 ">My Orders</h2>
    <v-container>
      <v-row>
        <v-col v-for="order in orders" :key="order.id" cols="12" md="4">
          <v-card
            variant="outlined"
            class="mx-auto rounded-lg"
            max-width="550"
            style="height: 400px;"
          >
            <v-card-title class="text-h5 text-blue-lighten-2">{{ order.order_user.firstname }}</v-card-title>
            <v-card-text>
              <div class="mb-2"><strong>Order ID:</strong> {{ order.id }}</div>
              <div class="mb-2"><strong>Email:</strong> {{ order.order_user.email }}</div>
              <div class="mb-2"><strong>Phone:</strong> {{ order.order_user.phone }}</div>
              <div class="mb-2"><strong>Payment method:</strong> {{ order.order_user.paymentMethod }}</div>
              <div class="mb-2"><strong>City:</strong> {{ order.order_user.city }}</div>
              <div class="mb-2"><strong>Post office:</strong> {{ order.order_user.postOffice }}</div>
              <div class="mb-2"><strong>Total price:</strong> {{ order.total_price }}</div>
              <div class="mb-2"><strong>Status:</strong> {{ order.status }}</div>
              <div class="mb-2"><strong>Created at:</strong> {{
                  new Date(order.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                  })
                }}
              </div>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                variant="text"
                color="primary"
                @click="reveal = order.id"
              >
                View more
              </v-btn>
            </v-card-actions>


            <v-expand-transition>
              <v-card
                v-if="reveal === order.id"
                class="v-card--reveal overflow-auto"
                style="height: 100%;"

              >

                <v-list>
                  <v-list-item v-for="item in order.order_products" :key="item.id">
                    <v-row>
                      <v-col cols="6">
                        <router-link class="text-decoration-none" :to="`/product/${item.product_id}`">
                          <div style="display: flex; flex-direction: column;">
                            <v-img width="85" height="85" :src="`http://lar/storage/${item.image}`"></v-img>
                            <v-list-item-content>
                              <v-list-item-title>{{ item.name }}</v-list-item-title>
                            </v-list-item-content>
                          </div>
                        </router-link>
                      </v-col>
                      <v-col cols="6">
                        <v-list-item-title>Price: <span>{{ item.price }}</span></v-list-item-title>
                        <v-list-item-title>Quantity: <span>{{ item.quantity }}</span></v-list-item-title>
                        <v-list-item-title>Sum: <span>{{ item.quantity * item.price }}</span></v-list-item-title>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
                <v-card-actions class="justify-center align-center"
                >
                  <v-btn
                    variant="text"
                    color="primary"
                    @click="reveal = null"
                  >
                    Close
                  </v-btn>
                </v-card-actions>


              </v-card>

            </v-expand-transition>

          </v-card>

        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      reveal: null,
      orders: [],
      dialogVisible: false,
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      api.get('http://lar/api/auth/getOrder')
        .then(response => {
          this.orders = response.data;
          console.log(this.orders)
        })
        .catch(error => {
          console.log(error);
        });
    }, logout() {
      api.get('http://lar/api/auth/logout')
        .then(response => {
          localStorage.removeItem('access_token')
          this.$router.push({name: 'user.login'})
        })
    },

  }
};
</script>

