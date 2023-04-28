<template>
  <v-row justify="center">
    <v-btn @click="visibleAbout = !visibleAbout"></v-btn>
    <modal :testItsProps ="visibleAbout"></modal>
<!--    в модал мы передаем наш пропс с параметром как у модал пропса-->
    <!--    <v-card v-if="visibleAbout">-->
    <!--      wfw-->
    <!--    </v-card>-->
    <!--  </v-row> это аналог того что мы вставим тут пропс с другим компонетном .но для удобноти мы
    взяли новый компонент с пропсом-->
  </v-row>
  <div>
    {{ text }}
  </div>
</template>

<script>
import Modal from "@/components/Modal";

export default {
  name: "AboutPage",
  components: {
    Modal,

  },
  data() {
    return {
      visibleAbout: false,
      text:'Test word'
    }
  },


}
</script>

<style scoped>

</style>
