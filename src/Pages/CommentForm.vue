<template>
  <v-form style="width: 640px">
    <v-textarea v-model="message" variant="outlined" label="Message" rows="4" clearable color="success" :rules="[v => !!v || 'Message is required']" @keydown.enter.prevent="submitComment"
    ></v-textarea>
    <v-rating bg-color="blue" color="primary" hover v-model="rating" label="Rating"></v-rating>
    <div>
      <v-btn color="primary" @click.prevent="submitComment">Submit Comment</v-btn>
    </div>
  </v-form>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: {
    productId: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    message: "",
    rating: null,
  }),
  mounted() {
    this.submitComment()
  },
  methods: {


    submitComment() {
      const token = localStorage.getItem('access_token');
      axios.post(`http://lar/api/product/${this.productId}/comments`, {
        message: this.message,
        rating: this.rating,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          const newComment = response.data.comment;
          this.$emit('comment-added', newComment);
          this.showAlert('Комментарий добавлен');

          this.message = '';
          this.rating = null;

          // Push the new comment to the comments array
          this.comments.push(newComment);
        })
        .catch((error) => {
          console.error(error);
        })
    },

    showAlert(message) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,

        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: message
      });
    },
  },
};
</script>
