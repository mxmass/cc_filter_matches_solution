<template>
  <v-layout
    row
    wrap>
      <v-flex xs2 offset-xs1 text--center>
        <v-avatar
          v-if="avatar"
          size="64px"
        >
          <v-img
            :src="avatar"
            aspect-ratio="1"
            class="grey lighten-2"
          >
            <template v-slot:placeholder>
              <v-layout
                fill-height
                align-center
                justify-center
                ma-0
              >
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
        </v-avatar>
      </v-flex>
      <v-flex grow>
        <div class="userinfo">
          <strong>{{ user.display_name }}</strong>
          ({{ user.age }})
          from {{ user.city }}
          <v-icon class="clickable" @click="wipeUser">close</v-icon>
          <div>
            <i>is looking for friends ...</i>
          </div>
        </div>
      </v-flex>
  </v-layout>
</template>

<script>
import Axios from 'axios'

export default {
  props: ['user'],
  data() {
    return {
      avatar: '',
      imageHash: ''
    }
  },
  asyncComputed: {
    async avatar() {
      return await Axios.get(this.imageHash)
                        .then(response => response.data[0]);
    }
  },
  mounted() {
    this.imageHash = this.user.main_photo+'&'+this.user._id
    this.avatar = this.imageHash
  },
  updated() {
    this.imageHash = this.user.main_photo+'&'+this.user._id;
    this.avatar = this.imageHash
  },
  methods: {
    wipeUser() {
      this.$emit('wipeUser');
    }
  }
}
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
