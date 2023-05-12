<template>
  <v-footer class="bg-black text-center mt-10">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <h3 class="mb-5 text-amber">Про нас</h3>
          <p class="mb-5">
            Наш магазин предлагает широкий выбор техники и электроники по выгодным ценам. Мы стремимся предоставить нашим клиентам лучший сервис и качественную продукцию
          </p>
          <v-btn color="amber" dark class="mb-5" href="/catalog">Перейти в каталог</v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="mb-5 text-amber">Социальные сети</h3>
          <v-row class="d-flex justify-center">
            <v-btn
              v-for="icon in socialIcons"
              :key="icon"
              class="mx-3"
              :icon="icon"
              color="amber"
              dark
            ></v-btn>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <h3 class="mb-5 text-amber">Контакты</h3>
          <p>
            <v-icon>mdi-map-marker</v-icon> Кременчуг, улица Соборная, дом 1
          </p>
          <p>
            <v-icon>mdi-phone</v-icon> +38 (067) 226-26-79
          </p>
          <p>
            <v-icon>mdi-email</v-icon> simachev27@gmail.com
          </p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <p class="py-5">&copy; {{ new Date().getFullYear() }} UkrShop.com</p>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    socialIcons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-instagram',
    ],
  }),
}
</script>

<style scoped>
.bg-grey.darken-4 {
  background-color: #202020;
}

.text-amber {
  color: #ffc107;
}
</style>
