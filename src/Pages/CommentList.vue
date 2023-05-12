<template>
  <h3 v-if="comments.length > 0"  class="text-start ml-5">Comments: {{ comments.length }}</h3>

  <div>
    <v-card mix-width="400" max-width="1200" min-height="100" max-height="2200" class="overflow-auto"  elevation="10" v-if="comments.length > 0">
      <v-card-text  >
        <v-list>
          <v-list-item v-for="comment in comments" :key="comment.id">
            <div class="d-flex justify-space-between text-blue-accent-2">
              <h3 >{{ comment.user.name }}</h3>
              <v-list-item-subtitle class="mb-2"><strong></strong> {{
                  new Date(comment.created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: false
                  })
                }}
              </v-list-item-subtitle>
            </div>
            <v-list-item-content>
              <p>{{ comment.message }}</p>
              <v-rating v-if="comment.rating > 1" class="ml-n2" :model-value="comment.rating" color="primary" size="x-small"  readonly></v-rating>

            </v-list-item-content>
            <v-divider></v-divider>

          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    comments:[],
  }),
  created() {
    this.getComments();
  },
  watch: {
    '$route.params.id'(newId, oldId) {
      if (newId !== oldId) {
        this.getComments();
      }
    },
  },
  methods: {
    async getComments() {
      const productId = this.$route.params.id;
      axios.get(`http://lar/api/allComments/${productId}`)
        .then((backend) => {
          this.comments = backend.data;
          console.log(this.comments)
        });
    },
  },

};
</script>
