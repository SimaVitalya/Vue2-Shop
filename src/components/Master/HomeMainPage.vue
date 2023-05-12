<!--<template>-->
<!--  <v-container d>-->
<!--    &lt;!&ndash; Слайдер основных товаров &ndash;&gt;-->
<!--    <v-row>-->
<!--      <v-col cols="12">-->
<!--        <v-carousel-->
<!--          cycle height="500"-->
<!--          :show-arrows="false"-->
<!--          hide-delimiters-->
<!--        >-->
<!--          <v-carousel-item :interval="1000">-->
<!--            <v-img src="https://picsum.photos/id/1015/1920/1080"></v-img>-->
<!--          </v-carousel-item>-->
<!--          <v-carousel-item :interval="6000"  v-for="(slide, index) in slides" :key="index">-->
<!--            <v-img :src="slide.image" height="500"></v-img>-->
<!--          </v-carousel-item>-->
<!--        </v-carousel>-->
<!--      </v-col>-->
<!--    </v-row>-->

<!--    &lt;!&ndash; Заголовок и описание &ndash;&gt;-->
<!--    <v-row>-->
<!--      <v-col cols="12" class="text-center">-->
<!--        <h2 class="text-uppercase">Welcome to our online store</h2>-->
<!--        <p class="subtitle-1">Browse our selection of products and find what you need</p>-->
<!--      </v-col>-->
<!--    </v-row>-->

<!--    &lt;!&ndash; Слайдер рекомендуемых товаров &ndash;&gt;-->
<!--    <v-row class="mt-10">-->
<!--      <v-col cols="12">-->
<!--        <h3 class="text-uppercase mb-12 text-center">Recommended Products</h3>-->
<!--        <v-carousel-->
<!--          cycle height="400"-->
<!--          :items-per-page="4"-->
<!--          :show-arrows="false"-->
<!--          hide-delimiters-->
<!--        >-->

<!--          <v-carousel-item :interval="1000">-->
<!--            <v-img src="https://picsum.photos/id/1015/1920/1080"></v-img>-->
<!--          </v-carousel-item>-->
<!--          <v-carousel-item v-for="(slide, index) in slides" :key="index" :interval="index === 0 ? 6000 : 0">-->
<!--            <v-row>-->
<!--              <v-col v-for="(recommendation, index) in slide.recommendations" :key="index">-->
<!--                <v-card class="mx-auto" max-width="300">-->
<!--                  <v-img :src="`http://lar/storage/${recommendation.image}`" cover height="200"></v-img>-->
<!--                  <v-card-title>-->
<!--                    <h4 class="text-uppercase">{{ recommendation.name }}</h4>-->
<!--                    <div class="text-h5">{{ recommendation.price }}</div>-->
<!--                  </v-card-title>-->
<!--                  <v-card-actions>-->
<!--                    <v-btn color="primary" text>View Details</v-btn>-->
<!--                    <v-btn color="secondary" text>Add to Cart</v-btn>-->
<!--                  </v-card-actions>-->
<!--                </v-card>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-carousel-item>-->
<!--        </v-carousel>-->
<!--      </v-col>-->
<!--    </v-row>-->
<!--    <v-container>-->
<!--      Основные товары-->

<!--      <v-row class="mt-10">-->
<!--        <v-col cols="3" v-for="(product, index) in items" :key="index">-->
<!--          <v-card>-->
<!--            <v-img :src="`http://lar/storage/${product.image}`" cover height="200"></v-img>-->
<!--            <v-card-title>-->
<!--              <h3 class="headline">{{ product.name }}</h3>-->
<!--              <div class="text-h5">{{ product.price }}</div>-->
<!--            </v-card-title>-->
<!--            <v-card-actions>-->
<!--              <v-btn color="primary" text>View Details</v-btn>-->
<!--              <v-btn color="secondary" text>Add to Cart</v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-container>-->

<!--  </v-container>-->
<!--</template>-->

<!--<script>-->
<!--import axios from "axios";-->

<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      slides: [],-->
<!--      items:[],-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    this.getItems();-->
<!--  },-->
<!--  methods: {-->
<!--    async getItems() {-->
<!--      try {-->
<!--        const response = await axios.get("http://lar/api/showRecommendation");-->
<!--        this.items = response.data;-->

<!--        const items = response.data;-->

<!--          // Group items into slides-->
<!--          const slideCount = Math.ceil(items.length / 4);-->
<!--          for (let i = 0; i < slideCount; i++) {-->
<!--            const slideItems = items.slice(i * 4, (i + 1) * 4);-->
<!--            const slide = {-->
<!--              image: `https://picsum.photos/id/${i + 1015}/1920/1080`,-->
<!--              recommendations: slideItems.map((item) => ({-->
<!--                id: item.id,-->
<!--                name: item.name,-->
<!--                image: item.image,-->
<!--                price: `$${item.price.toFixed(2)}`,-->
<!--              })),-->
<!--            };-->
<!--            this.slides.push(slide);-->
<!--          }-->
<!--        } catch (error) {-->
<!--          console.log(error);-->
<!--        }-->
<!--      }-->
<!--    },-->

<!--};-->
<!--</script>-->
<template>
  <v-container>
    <v-row>
      <v-col
      >
        <v-card
          variant="outlined"
          class="mx-auto rounded-lg"
          max-width="300"
        >
          <v-card-title>
            <h4 class="text-h5">
              {{ product.name }}
            </h4>
            <v-spacer></v-spacer>
            <span class="text-h6">${{ product.price }}</span>
          </v-card-title>
          <v-card>
            <v-img
              class="mb-1"
              height="250"
              width="300"
              cover
              :src="`http://lar/storage/${product.image}`"
            ></v-img>
          </v-card>

          <v-card-actions class="justify-center">
            <v-btn
              variant="text"
              color="teal-accent-4"
              @click="reveal = product.id"
            >
              Learn More
            </v-btn>
          </v-card-actions>

          <v-card
            v-if="reveal === product.id"
            class="v-card--reveal"
            style="height: 100%;"
          >
            <v-card-text class="pb-0">
              <p class="text-h4 text--primary">
                Description
              </p>
              <p>{{ product.description }} </p>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-btn
                variant="text"
                color="teal-accent-4"
                @click="reveal = null"
                style="margin-bottom: 10px;"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card-actions>
            <v-btn block color="orange" @click="addToCart(product)">
              Add to Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container>

  </v-container>
  <!--  product-end-->
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    selection: 2,
    reveal: null,
    items: [
      {title: "Price >"},
      {title: "Price <"},
      {title: "Name a-z"},
      {title: "Name z-a"},
    ],
    product: [],
  }),
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    async getProduct() {
      await axios.get(`http://lar/api/product/${this.id}`)
        .then((backend) => {
          this.product = backend.data;
          console.log(this.product)
        });
    },
    addToCart(product) {
      this.$store.commit('addToCart', product); // Добавляем товар в корзину
      this.showAlert('Товар добавлен');
    },
    showAlert() {
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

      Toast.fire({
        icon: 'success',
        title: 'Товар добавлен'
      });
    },

  },

  mounted() {
    this.getProduct();
  },
  watch: {
    id: function (newId, oldId) {
      this.getProduct();
    }
  },

};
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
