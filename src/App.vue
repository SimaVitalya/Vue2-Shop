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
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}
.text-decoration-none {
  color: inherit;
  text-decoration: none;
}

.text-decoration-none:hover {
  color: red;
  transition: color 0.3s ease-in-out;
}

</style>
