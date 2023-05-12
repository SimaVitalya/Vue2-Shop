<template>
  <div>
    <div v-if="!isPaymentSuccessful">
      <h2>Make Payment</h2>
      <form>
        <div class="form-group">
          <label for="card-number">Card Number</label>
          <input type="text" class="form-control" id="card-number" v-model="cardNumber" placeholder="Card Number">
        </div>
        <div class="form-group">
          <label for="card-expiry-month">Expiry Month</label>
          <input type="text" class="form-control" id="card-expiry-month" v-model="cardExpiryMonth" placeholder="MM">
        </div>
        <div class="form-group">
          <label for="card-expiry-year">Expiry Year</label>
          <input type="text" class="form-control" id="card-expiry-year" v-model="cardExpiryYear" placeholder="YYYY">
        </div>
        <div class="form-group">
          <label for="card-cvc">CVC</label>
          <input type="text" class="form-control" id="card-cvc" v-model="cardCvc" placeholder="CVC">
        </div>
        <div class="form-group">
          <label for="amount">Amount</label>
          <input type="text" class="form-control" id="amount" v-model="amount" placeholder="Amount">
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="makePayment">Pay</button>
      </form>
    </div>
    <div v-else>
      <h2>Payment Successful</h2>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isPaymentSuccessful: false,
      cardNumber: '',
      cardExpiryMonth: '',
      cardExpiryYear: '',
      cardCvc: '',
      amount: ''
    }
  },
  methods: {
    makePayment() {
      Stripe.card.createToken({
        number: this.cardNumber,
        exp_month: this.cardExpiryMonth,
        exp_year: this.cardExpiryYear,
        cvc: this.cardCvc
      }, (status, response) => {
        if (status === 200) {
          axios.post('/api/stripe-payment', {
            amount: this.amount,
            stripeToken: response.id
          }).then((response) => {
            console.log(response.data.message);
            this.isPaymentSuccessful = true;
          }).catch((error) => {
            console.log(error.response.data.message);
          });
        } else {
          console.log('Card validation failed');
        }
      });
    }
  }
}
</script>
