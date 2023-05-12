<template>
  <v-container> <!-- Product card -->
    <v-container class="d-flex justify-center">
      <v-row>
        <v-container class="d-flex justify-center">
          <v-col cols="4">
            <v-card elevation="10" height="430" width="300" class=" ml-3 rounded-lg" max-width="300">
              <v-card-title><h4 class="text-h5">{{ product.name }}</h4>
                <v-spacer></v-spacer>
                <span class="text-h6">${{ product.price }}</span></v-card-title>
              <v-card>
                <v-img class="mb-1" height="250" width="300" cover :src="`http://lar/storage/${product.image}`"></v-img>
              </v-card>
              <v-card-actions class="justify-center">
                <v-btn variant="text" color="teal-accent-4" @click="reveal = product.id">Learn More</v-btn>
              </v-card-actions>

              <v-card v-if="reveal === product.id" class="v-card--reveal" style="height: 100%;">
                <v-card-text class="pb-0">
                  <p class="text-h4 text--primary">Description</p>
                  <p>{{ product.description }}</p>
                </v-card-text>
                <v-card-actions class="pt-0">
                  <v-btn variant="text" color="teal-accent-4" @click="reveal = null" style="margin-bottom: 10px;">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
              <v-card-actions>
                <v-btn block color="orange" @click="addToCart(product)">Add to Cart</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="3">
            <random :product-id="product.id" class="ml-n10"></random>
          </v-col>
        </v-container>
      </v-row>
    </v-container>

    <!-- Comments section -->
    <v-container class="d-flex justify-center">
      <v-form style="width: 640px">
        <v-textarea v-model="message" variant="outlined" label="Message" rows="4" clearable color="success"
                    :rules="[rules.required, rules.length(4)]"
                    @keydown.enter.prevent="submitComment"
        ></v-textarea>
        <v-rating   :rules="[v => !!v || 'This field is required']"  bg-color="blue" color="primary" hover v-model="rating" label="Rating"></v-rating>
        <div>
          <v-btn color="primary" @click.prevent="submitComment">Submit Comment</v-btn>
        </div>
      </v-form>

    </v-container>
    <h3 v-if="comments.length > 0" class="text-start ml-5">Comments: {{ comments.length }}</h3>

    <div>
      <v-card mix-width="400" max-width="1200" min-height="100" max-height="2200" class="overflow-auto" elevation="10"
              v-if="comments.length > 0">
        <v-card-text>
          <v-list>
            <v-list-item v-for="comment in comments" :key="comment.id">
              <div class="d-flex justify-space-between text-blue-accent-2">
                <h3>{{ comment.user.name }}</h3>
                <v-list-item-subtitle class="mb-2"><strong></strong> {{
                    new Date(comment.created_at).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      hour12: false
                    })
                  }}
                </v-list-item-subtitle>
              </div>
              <v-list-item-content>
                <p>{{ comment.message }}</p>
                <v-rating v-if="comment.rating > 0" class="ml-n2" :model-value="comment.rating" color="primary"
                          size="x-small" readonly></v-rating>

              </v-list-item-content>
              <v-divider></v-divider>

            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>

    </div>
  </v-container>
</template>
<script> import axios from "axios";
import Swal from "sweetalert2";
import Random from "@/Pages/Random";
export default {
  data: () =>
    ({
      selection: 2,
      reveal: null,
      product: [],
      comments: [],
      message: null,
      rating: null,
      rules: {
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        required: [
          v => !!v || 'This field is required',
          v => v !== null || 'Please rate the product' // Добавляем проверку на null
        ]
      },

    }),
  props: {
    id:
      {
        type: Number,
        required: true,
      },
  },
  components:{Random},
  methods: {
    async getProduct() {
      await axios.get(`http://lar/api/product/${this.id}`).then((backend) => {
        this.product = backend.data;
      });
    },
    async getComments() {
      await axios.get(`http://lar/api/allComments/${this.id}`).then((backend) => {
        this.comments = backend.data;
        console.log(this.comments)
      });
    },
    submitComment() {
      const token = localStorage.getItem('access_token');
      axios.post(`http://lar/api/product/${this.id}/comments`, {
        message: this.message,
        rating: this.rating,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          // Comment created successfully
          console.log(response.data);
          this.showAlert('Комментарий добавлен');
          this.message = null; // Очищаем поле для ввода сообщения
          this.rating = null; // Сбрасываем рейтинг
          this.getComments(); // Обновляем список комментариев

        })
        .catch(error => {
          // Error creating comment
          console.log(error.response.data);
        });
    },
    showAlert(message) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({icon: 'success', title: message});
    }, addToCart(product) {
      this.$store.commit('addToCart', product);
      this.showAlert('Товар добавлен');
    },
  }
  ,
  mounted() {
    this.getProduct();
    this.getComments();
  }
  ,
  watch: {
    id: function (newId, oldId) {
      this.getProduct();
    }
    ,
    '$route.params.id'(newId, oldId) {
      if (newId !== oldId) {
        this.getComments();
      }
    },
  },
}
; </script>
