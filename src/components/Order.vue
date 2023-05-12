<template>
  <v-container class="mt-5">
    <v-row>
      <v-col cols="6">
        <v-form @submit.prevent="submitForm">
          <v-text-field :rules="phoneRules" color="success" v-model="form.phone" label="Введите номер телефона" required></v-text-field>
          <v-text-field :rules="firstnameRules" color="success" v-model="form.firstname" label="Введите имя" required></v-text-field>
          <v-text-field :rules="lastnameRules" color="success" v-model="form.lastname" label="Введите фамилию" required></v-text-field>
          <v-text-field :rules="emailRules" color="success" v-model="form.email" label="Введите электронную почту" required></v-text-field>
          <v-select v-model="form.region" :items="regions" :loading="isLoading" color="success" :rules="regionRules" label="Введите область"> </v-select>
          <v-select v-if="cities.length > 0"
            v-model="form.city"
            :item-title="(city) => city.name"
            :item-value="(city) => city.ref"
            :items="cities"
            :rules="cityRules"
            :loading="isLoading"
            color="success"
            label="Введите город"
          ></v-select>
          <v-select
            v-if="postOffices.length > 0"
            v-model="form.postOffice"
            :rules="officesRules"
            :items="postOffices"
            :loading="isLoading"
            color="success"
            :item-value="(postOffice) => postOffice.name"
            :item-title="(postOffice) => postOffice.name"
            label="Выберите отделение Новой Почты">
          </v-select>
          <v-select
            v-if="postOffices.length > 0"
            :items="['Visa','MasterCard']"
            v-model="form.paymentMethod"
            :rules="paymentRules"
            color="success"
            hint="Интеграции еще нет"
            label="Выберите способ оплаты"
            required>
          </v-select>
          <v-btn v-if="$store.state.cart.length > 0" type="submit" color="primary">Submit</v-btn>
          <v-btn v-else disabled type="submit" color="black">Submit</v-btn>
        </v-form>
      </v-col>
      <v-col v-if="$store.state.cart.length > 0" cols='6'>
        <v-card   width="600" mix-height="367" max-height="665" class="overflow-y-auto">
          <v-card-text >
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
      <v-col v-else cols="6">
        <v-img
          src="modal-cart-dummy.svg"
          width="200"
          height="200"
          class="mx-auto"
        >
        </v-img>
        <v-card-title class="text-center">
          <span class="text-h4">The basket is empty</span>
        </v-card-title>
        <v-card-text>
          <p class="text-center">But it's never too late to fix it :)</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import {required, email} from '@vuelidate/validators'

export default {
  data() {

    return {

      phoneRules: [
        value => {
          if (value) return true

          return 'Укажите номер телефона.'
        },
        value => {
          if (/^\d{5,20}$/.test(value)) return true

          return 'Номер телефона должен содержать от 5 до 20 цифр и содержать только цифры.'
        }
      ],
      firstnameRules: [
        value => {
          if (value) return true

          return 'Введите имя.'
        },
        value => {
          if (value?.length <= 40) return true

          return 'Имя должно содержать менее 40 символов.'
        },
      ],
      lastnameRules: [
        value => {
          if (value) return true

          return 'Введите фамилию.'
        },
        value => {
          if (value?.length <= 40) return true

          return 'Фамилия должна содержать менее 40 символов.'
        },
      ],
      emailRules: [
        value => {
          if (value) return true

          return 'Введите электронную почту.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'Электронная почта должна быть действующей.'
        },
      ],
      regionRules: [
        value => !!value || 'Выберите Область.',
      ],
      cityRules: [
        value => !!value || 'Выберите Город.',
      ],
      paymentRules: [
        value => !!value || 'Выберите метод оплаты',
      ],
      officesRules: [
        value => !!value || 'Выберите отделение.',
      ],

      isLoading: false,


      loading: false,
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
      status: '',
      product_id: '',
      quantity: '',
      price: '',
      name: '',
      image: ''
    }
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    },
  },
  created() {
    console.log(this.$store.state.cart)

  },
  methods: {
    // loading() {
    //   this.loading = true
    //
    // },
    submitForm() {
      const formData = new FormData();
      formData.append('phone', this.form.phone);
      formData.append('firstname', this.form.firstname);
      formData.append('lastname', this.form.lastname);
      formData.append('email', this.form.email);
      formData.append('region', this.form.region);
      formData.append('city', this.form.city);
      formData.append('postOffice', this.form.postOffice);

      axios.post('http://lar/api/addData', {
        phone: this.form.phone,
        firstname: this.form.firstname,
        lastname: this.form.lastname,
        email: this.form.email,
        region: this.form.region,
        city: this.form.city,
        postOffice: this.form.postOffice,
        paymentMethod: this.form.paymentMethod,
        total_price: this.$store.getters.totalPrice,
        cart: this.$store.state.cart,

      }).then(response => {
        this.form.phone = null
        this.form.firstname = null
        this.form.lastname = null
        this.form.email = null
        this.form.region = null
        this.form.city = null
        this.form.postOffice = null
        this.form.paymentMethod = null
        this.$store.commit('clearCart');
        this.$store.commit('clearCount')

        Swal.fire({
          title: 'Success!',
          text: 'The form has been submitted successfully.',
          icon: 'success',
          timer: 1300,
          timerProgressBar: true,
          showConfirmButton: false,
          background: '#000'
        });
        console.log(response)

      })
        .catch(error => {
          console.log(error.response.data);


        });

    },

    showRegions() {
      this.isLoading = true; // установка флага isLoading в true перед началом выполнения запроса

      axios.get(`http://lar/api/region`)
        .then(response => {
          this.regions = response.data.Ru;
          console.log(this.regions)
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false; // установка флага isLoading в false после завершения запроса
        });
    },
    showCities(region) {
      // this.$swal.fire('wait for loading...')
      // this.$swal.showLoading()
      // Сбрасываем выбранный город в форме
      this.isLoading = true;
      this.form.city = '';
      // Очищаем список городов
      this.cities = [];
      axios.get(`http://lar/api/region/${region}`)
        .then(response => {
          this.cities = response.data['Ru'];
          console.log(this.cities)
          // this.$swal.close()
          // this.$swal.hideLoading()
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false; // установка флага isLoading в false после завершения запроса
        });

    }
    ,
    showPostOffices() {
      if (this.form.city) {
        // this.$swal.fire('wait for loading...')
        // this.$swal.showLoading()
        this.isLoading = true;
        this.form.postOffice = '';
        // Очищаем список городов
        this.postOffices = [];
        axios.post(`http://lar/api/postalOffices`, {
          'city_ref': this.form.city
        })
          .then(response => {
            this.postOffices = response.data['Ru'];
            console.log(` ${this.form.city}: ${this.postOffice.length}`);
            // this.$swal.close()
            // this.$swal.hideLoading()
          })
          .catch(response => {
            console.log(response)
            this.postOffice = response.data;
            console.log(this.postOffice);
            // this.$swal.close()
            // this.$swal.hideLoading()
          })
          .finally(() => {
            this.isLoading = false; // установка флага isLoading в false после завершения запроса
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
  validation: {
    form: {
      phone: {
        required
      }
    }
  }
}
</script>
<style scoped>
span {
  font-weight: bold;
  color: #2ff607;
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
  overflow-y: auto;
}

.v-dialog .v-list {
  padding: 0;
  overflow-y: auto;
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
