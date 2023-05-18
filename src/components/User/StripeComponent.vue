<template>
  <div class="d-flex justify-center">
    <v-form class="w-50" @submit.prevent="submit">
      <v-text-field v-model="name" label="Name on card" required></v-text-field>
      <v-text-field v-model="cardNumber" label="Card number" required></v-text-field>
      <v-text-field v-model="expDate" label="Expiration date" required></v-text-field>
      <v-text-field v-model="cvc" label="CVC" required></v-text-field>
      <v-btn type="submit" color="primary">Pay</v-btn>
    </v-form>


  </div>
</template>

<script>
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';

export default {
  data() {
    return {
      name: "",
      cardNumber: "",
      expDate: "",
      cvc: "",
      paymentStatus: null,
      stripe: null
    };
  },
  async mounted() {
    this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLIC_KEY);
  },
  methods: {
    async submit() {
      try {
        const [expMonth, expYear] = this.expDate.split("/");
        const { paymentMethod } = await this.stripe.createPaymentMethod({
          type: "card",
          card: {
            number: this.cardNumber,
            exp_month: expMonth,
            exp_year: expYear,
            cvc: this.cvc,
          },
        });

        const response = await axios.post("/payment/pay", {
          paymentMethodId: paymentMethod.id,
        });

        this.paymentStatus = response.data.success ? "success" : "error";
      } catch (error) {
        console.error(error);
        this.paymentStatus = "error";

        // Show an error message using SweetAlert2
        await this.$swal({
          title: "Error",
          text: "An error occurred while processing your payment",
          icon: "error",
        });
      }
    },
  },
};
</script>

<style>
</style>
