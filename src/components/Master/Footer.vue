<template>
  <v-footer  class="bg-shades-black text-center d-flex flex-column">

    <v-container>
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 mb-7 text-red-lighten-3"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>
      <v-row>
        <v-col cols="1">
          <div>
            <v-img
              height="55"
              width="55"
              src="git.svg"
            ></v-img>
          </div>
        </v-col>
        <v-col cols="5">
          <p>
            Футер – это ткань на основе хлопка, которая благодаря особенностям
            технологии производства на изнаночной стороне имеет мягкий ворс, а с
            лицевой стороны - гладкую структуру. Считается, что родиной футера
            является Индия или другая страна, в которой очень развито
            производство хлопка.
          </p>
        </v-col>
        <v-col cols="5">
          <p>
            Футер – это ткань на основе хлопка, которая благодаря особенностям
            технологии производства на изнаночной стороне имеет мягкий ворс, а с
            лицевой стороны - гладкую структуру. Считается, что родиной футера
            является Индия или другая страна, в которой очень развито
            производство хлопка.
          </p>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <div CLASS="mt-5">
        {{ new Date().getFullYear() }} — <strong>SimaVitalya</strong>
      </div>
    </v-container>
  </v-footer>
</template>
<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
    ],
  }),
}
</script>
