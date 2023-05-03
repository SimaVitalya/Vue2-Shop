<template>
  <v-container>
    <div>
      <h1 class="text-center mb-5">Main </h1>
      <AboutPage />
<!--      <div v-if="isVisible">HelloWord</div>-->
<!--     <v-btn @click="isVisible = !isVisible ">isVisible</v-btn>-->

      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-card
            v-bind="props"
            :color="isHovering ? 'red' : undefined"
            :ripple="{ class: 'text-blue' }">
            <p class="d-block w-50" >
              hello word
            </p>
          </v-card>
        </template>
      </v-hover>
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
