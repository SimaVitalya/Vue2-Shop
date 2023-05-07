<!--<template>-->
<!--  <div>-->
<!--    <h2 class="text-center mt-5 text-h4">My Orders</h2>-->
<!--    <v-container>-->
<!--      <v-row>-->
<!--        <v-col v-for="order in orders" :key="order.id" cols="12" md="4">-->
<!--          <v-card class="my-4">-->
<!--            <v-card-title class="text-h5 text-blue-lighten-2">{{ order.order_user.firstname }}</v-card-title>-->
<!--            <v-card-text>-->
<!--              <div class="mb-2"><strong>Order ID:</strong> {{ order.id }}</div>-->
<!--              <div class="mb-2"><strong>Email:</strong> {{ order.order_user.email }}</div>-->
<!--              <div class="mb-2"><strong>Phone:</strong> {{ order.order_user.phone }}</div>-->
<!--              <div class="mb-2"><strong>Payment method:</strong> {{ order.order_user.paymentMethod }}</div>-->
<!--              <div class="mb-2"><strong>City:</strong> {{ order.order_user.city }}</div>-->
<!--              <div class="mb-2"><strong>Post office:</strong> {{ order.order_user.postOffice }}</div>-->
<!--              <div class="mb-2"><strong>Total price:</strong> {{ order.total_price }}</div>-->
<!--              <div class="mb-2"><strong>Status:</strong> {{ order.status }}</div>-->
<!--              <div class="mb-2"><strong>Created at:</strong> {{ new Date(order.created_at).toLocaleString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}) }}</div>            </v-card-text>-->
<!--            <v-card-actions>-->
<!--              <v-btn color="primary" dark @click="showOrderDetails(order)">View Details</v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-container>-->
<!--    <template>-->
<!--      <v-dialog v-model="dialogVisible" height="800" max-width="800">-->
<!--        <v-card >-->
<!--          <v-toolbar color="primary" dark>-->
<!--            <v-btn icon color="white" @click="dialogVisible = false">-->
<!--              <v-icon>mdi-close</v-icon>-->
<!--            </v-btn>-->
<!--            <v-toolbar-title class="ml-n12 text-center">Order Details</v-toolbar-title>-->
<!--          </v-toolbar>-->
<!--          <v-card-text>-->
<!--            <v-list>-->
<!--              <v-card-item>-->
<!--                <v-list-item v-for="item in selectedOrder.order_products" :key="item.id">-->
<!--                  <div>-->
<!--                    <v-img width="150" :src="`http://lar/storage/${item.image}`"></v-img>-->
<!--                  </div>-->
<!--                  <v-list-item-content>-->
<!--                    <v-list-item-title>{{ item.name }}</v-list-item-title>-->
<!--                    <v-list-item-title> Price : <span > {{ item.price }}</span></v-list-item-title>-->
<!--                    <v-list-item-title> Quantity : <span > {{ item.quantity }}</span></v-list-item-title>-->
<!--                    <v-list-item-title> Sum : <span > {{ item.quantity * item.price }}</span>-->
<!--                    </v-list-item-title>-->

<!--                  </v-list-item-content>-->
<!--                </v-list-item>-->
<!--              </v-card-item>-->
<!--            </v-list>-->
<!--            <v-divider></v-divider>-->
<!--            <v-list>-->
<!--              <v-list-item>-->
<!--                <v-list-item-content>-->
<!--                  <v-list-item-title class="text-center text-h6"><strong >Total Price:</strong> <span style="color: red">{{ selectedOrder.total_price }}</span>-->
<!--                  </v-list-item-title>-->
<!--                </v-list-item-content>-->
<!--              </v-list-item>-->
<!--            </v-list>-->
<!--          </v-card-text>-->
<!--          <v-card-actions class="d-flex justify-center align-center">-->

<!--            <v-btn color="primary" @click="dialogVisible = false">Close</v-btn>-->
<!--          </v-card-actions>-->
<!--        </v-card>-->
<!--      </v-dialog>-->
<!--    </template>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import axios from 'axios';-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      orders: [],-->
<!--      dialogVisible: false,-->
<!--      selectedOrder: null-->
<!--    };-->
<!--  },-->
<!--  mounted() {-->
<!--    this.fetchOrders();-->
<!--  },-->
<!--  methods: {-->
<!--    fetchOrders() {-->
<!--      axios.get('http://lar/api/getOrder')-->
<!--        .then(response => {-->
<!--          this.orders = response.data;-->
<!--          console.log(this.orders)-->
<!--        })-->
<!--        .catch(error => {-->
<!--          console.error(error);-->
<!--        });-->
<!--    },-->
<!--    showOrderDetails(order) {-->
<!--      this.selectedOrder = order;-->
<!--      this.dialogVisible = true;-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--/* Стили для скроллбара */-->
<!--::-webkit-scrollbar {-->
<!--  width: 10px;-->
<!--  height: 10px;-->
<!--}-->

<!--::-webkit-scrollbar-track {-->
<!--  background-color: #f5f5f5;-->
<!--  border-radius: 5px;-->
<!--}-->

<!--::-webkit-scrollbar-thumb {-->
<!--  background-color: #aaa;-->
<!--  border-radius: 5px;-->
<!--}-->

<!--::-webkit-scrollbar-thumb:hover {-->
<!--  background-color: #888;-->
<!--}-->
<!--span{-->
<!--  font-weight: normal;-->
<!--}-->
<!--.v-card {-->
<!--  border: 1px solid #ccc;-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.v-list-item {-->
<!--  border-bottom: 1px solid #ccc;-->
<!--}-->

<!--.v-list-item:last-child {-->
<!--  border-bottom: none;-->
<!--}-->
<!--.v-list-item-title{-->
<!--  font-weight: bold;-->
<!--}-->

<!--.v-btn {-->
<!--  text-transform: none;-->
<!--}-->

<!--.v-dialog .v-card {-->
<!--  border-radius: 4px;-->
<!--}-->

<!--.v-dialog .v-card-title {-->
<!--  background-color: #604b7f;-->
<!--  border-top-left-radius: 4px;-->
<!--  border-top-right-radius: 4px;-->
<!--  padding: 16px;-->
<!--}-->

<!--.v-dialog .v-card-text {-->
<!--  padding: 16px;-->
<!--}-->

<!--.v-dialog .v-list {-->
<!--  padding: 0;-->
<!--}-->

<!--.v-dialog .v-list-item-avatar {-->
<!--  width: 80px;-->
<!--  height: 80px;-->
<!--  margin-right: 16px;-->
<!--}-->

<!--.v-dialog .v-list-item-content {-->
<!--  padding-top: 0;-->
<!--  padding-bottom: 0;-->
<!--}-->



<!--.v-dialog .v-card-actions {-->
<!--  padding: 16px;-->
<!--  border-top: 1px solid #ccc;-->
<!--}-->
<!--</style>-->
