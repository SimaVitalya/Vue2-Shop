<template>
  <v-app>
    <Header></Header>
    <v-main>
      <router-view/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "@/components/Master/Header";
import Footer from "@/components/Master/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
</script>
<style>
.text-decoration-none {
  color: inherit;
  text-decoration: none;
}

.text-decoration-none:hover {
  color: red;
  transition: color 0.3s ease-in-out;
}

</style>
