<template>
  <v-container class="mt-5">
    <v-row>
      <v-col cols="6">
        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="form.phone" label="Введите номер телефона" required></v-text-field>
          <v-text-field v-model="form.firstname" label="Введите имя" required></v-text-field>
          <v-text-field v-model="form.lastname" label="Введите фамилию" required></v-text-field>
          <v-text-field v-model="form.name" label="Введите электронную почту" required></v-text-field>
          <v-select
            v-model="form.region"
            :items="regions"
            label="Введите область">
          </v-select>
          <v-select
            v-if="cities.length > 0"
            v-model="form.city"
            :item-title="(city) => city.name"
            :item-value="(city) => city.ref"
            :items="cities"
            label="Введите город"
          ></v-select>
          <v-select
            v-if="postOffices.length > 0"
            v-model="form.postOffice"
            :items="postOffices"
            :item-value="(postOffice) => postOffice.name"
            :item-title="(postOffice) => postOffice.name"
            label="Выберите отделение Новой Почты">
          </v-select>
          <v-select
            v-if="postOffices.length > 0"
            :items="['Visa','MasterCard']"
            v-model="form.paymentMethod"
            label="Выберите способ оплаты"
            required>
          </v-select>
          <v-btn  type="submit" color="primary">Submit</v-btn>
        </v-form>
      </v-col>
      <v-col cols='6'>
        <v-card width="600" height="665" class="overflow-y-auto">
          <v-card-text>
            <v-table>
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
                    <router-link class="text-decoration-none" :to="`/product/${product.id}`">
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
          <v-card-footer>
            <v-container class="ml-5 d-flex justify-center">
              <h3>Total price :<span class="text-red ml-2">{{ $store.getters.totalPrice }} $</span></h3>
            </v-container>
          </v-card-footer>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        phone: '',
        firstname: '',
        lastname: '',
        email: '',
        region: '',
        city: '',
        postOffice: '',
        paymentMethod: '',
      },
      regions: [],
      cities: [],
      postOffices: [],

    }
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    },
  },
  methods: {
    submitForm() {
      const formData = new FormData();
      formData.append('phone', this.form.phone);
      formData.append('firstname', this.form.firstname);
      formData.append('lastname', this.form.lastname);
      formData.append('email', this.form.email);
      formData.append('region', this.form.region);
      formData.append('city', this.form.city);
      formData.append('postOffice', this.form.postOffice);

      axios.post('http://lar/api/create', formData)
        .then(response => {
          this.form.phone = null
          this.form.firstname = null
          this.form.lastname = null
          this.form.email = null
          this.form.region = null
          this.form.city = null
          this.form.postOffice = null
          this.form.paymentMethod = null
          console.log(response)

        }).catch(error => {
        console.log(error);
      });
    },

    showRegions() {
      this.$swal.fire('wait for loading...')
      this.$swal.showLoading()
      axios.get(`http://lar/api/region`)
        .then(backend => {

          this.regions = backend.data.Ru;
          console.log(this.regions)
          this.$swal.close()
          this.$swal.hideLoading()
        })
        .catch(error => {
          console.log(error);
        });
    },
    showCities(region) {
      this.$swal.fire('wait for loading...')
      this.$swal.showLoading()
      // Сбрасываем выбранный город в форме
      this.form.city = '';
      // Очищаем список городов
      this.cities = [];
      axios.get(`http://lar/api/region/${region}`)
        .then(response => {
          this.cities = response.data['Ru'];
          console.log(this.cities)
          this.$swal.close()
          this.$swal.hideLoading()
        })
        .catch(error => {
          console.log(error);
        });
    }
    ,
    showPostOffices() {
      if (this.form.city) {
        this.$swal.fire('wait for loading...')
        this.$swal.showLoading()
        axios.post(`http://lar/api/postalOffices`, {
          'city_ref': this.form.city
        })
          .then(response => {
            this.postOffices = response.data['Ru'];
            console.log(` ${this.form.city}: ${this.postOffice.length}`);
            this.$swal.close()
            this.$swal.hideLoading()
          })
          .catch(response => {
            console.log(response)
            this.postOffice = response.data;
            console.log(this.postOffice);
            this.$swal.close()
            this.$swal.hideLoading()
          });
      }
    },
    removeFromCart(product) {
      this.$store.commit('removeFromCart', product);
    },
    addToCart(product) {
      this.$store.commit('addToCart', product);
    },
    deleteProduct(product) {
      this.$store.commit('deleteProduct', product);
    },


  },
  watch: {
    'form.region': function (newVal, oldVal) {
      if (newVal) {
        this.showCities(newVal);
        this.form.city = null; // сбрасываем выбранный город при смене региона
        this.postOffices = []; // сбрасываем почтовые отделения при смене региона
      }
    },
    'form.city': function (newVal, oldVal) {
      if (newVal) {
        this.showPostOffices();
      } else {
        this.postOffices = []; // сбрасываем почтовые отделения при смене города на пустое значение
      }
    }
  },
  mounted() {
    this.showRegions();


  },
}
</script>
<style scoped>


/* Стили для скроллбара */
.overflow-y-auto::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 5px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
