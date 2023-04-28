<template>
  <v-container>
    <div>
      <h1 class="text-center mb-5">Main </h1>
      <AboutPage />
<!--      <div v-if="isVisible">HelloWord</div>-->
<!--     <v-btn @click="isVisible = !isVisible ">isVisible</v-btn>-->
    </div>
  </v-container>
</template>

<script>
import AboutPage from "@/components/AboutPage.vue";

export default {

  name: "MainPage.vue",
  components: {AboutPage},
  // data(){
  //   return{
  //     isVisible:true,
  //   }
  // }


}
</script>

<style scoped>

</style>
