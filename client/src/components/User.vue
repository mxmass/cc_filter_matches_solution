<template>
  <v-layout
    row
    wrap>
    <v-flex xs12>
      <v-flex xs4 sm4 md4>
        <v-avatar
          v-if="avatar"
          size="64px"
        >
          <img
            :src="avatar"
            alt="Avatar"
          >
        </v-avatar>
      </v-flex>
      <strong>{{ user.display_name }}</strong> ({{ user.age }})
      from {{ user.city }}<br />
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['user'],
  data() {
    return {
      avatar: ''
    }
  }
}
</script>

<style scoped>
</style>
