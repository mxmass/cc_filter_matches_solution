<template>
  <v-layout
    row
    wrap>
    <v-flex xs2 offset-xs1 text--center>
      <v-avatar
        v-if="avatar"
        size="64px"
      >
        <AvatarImage :avatar="avatar" />
      </v-avatar>
    </v-flex>
    <v-flex
      grow
      class="userinfo"
    >
      <strong>{{ user.display_name }}</strong>
      ({{ user.age }})
      from {{ user.city }}
      <v-icon
        class="clickable"
        @click="wipeUser"
      >
        close
      </v-icon>
      <div>
        <i>is looking for friends ...</i>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Axios from 'axios'
import AvatarImage from './AvatarImage'


export default {
  props: ['user'],
  components: {
    AvatarImage
  },
  data() {
    return {
      avatar: '',
      imageHash: ''
    }
  },
  asyncComputed: {
    async avatar() { // force to reload image when user changed (they all have same avatar URL)
      return await Axios.get(this.imageHash)
                        .then(response => response.data[0]);
    }
  },
  mounted() {
    if (this.user.main_photo) {
      this.imageHash = this.user.main_photo+'&'+this.user._id // imageHash should be unique
      this.avatar = this.imageHash // update variable to force API call
    }
  },
  updated() {
    if (this.user.main_photo) {
      this.imageHash = this.user.main_photo+'&'+this.user._id; // imageHash should be unique
      this.avatar = this.imageHash // update variable to force API call
    }
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
