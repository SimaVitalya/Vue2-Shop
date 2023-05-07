<template>
  <div>
    <h2 class="text-center mt-5 text-h4">My Orders</h2>
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
import axios from 'axios';

export default {
  data() {
    return {
      reveal: null,
      orders: [],
      dialogVisible: false
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    fetchOrders() {
      axios.get('http://lar/api/getOrder')
        .then(response => {
          this.orders = response.data;
          console.log(this.orders)
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

/* Стили для скроллбара */


span {
  font-weight: normal;
}

.v-card {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.v-list-item {
  border-bottom: 1px solid #ccc;
}

.v-list-item:last-child {
  border-bottom: none;
}

.v-list-item-title {
  font-weight: bold;
}

.v-btn {
  text-transform: none;
}

.v-dialog .v-card {
  border-radius: 4px;
}

.v-dialog .v-card-title {
  background-color: #604b7f;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 16px;
}

.v-dialog .v-card-text {
  padding: 16px;
}

.v-dialog .v-list {
  padding: 0;
}

.v-dialog .v-list-item-avatar {
  width: 80px;
  height: 80px;
  margin-right: 16px;
}

.v-dialog .v-list-item-content {
  padding-top: 0;
  padding-bottom: 0;
}


.v-dialog .v-card-actions {
  padding: 16px;
  border-top: 1px solid #ccc;
}
</style>
