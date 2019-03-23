<template>
  <v-layout
    align-center
    row
    spacer
    wrap
    @click="setUser(user)"
  >
    <v-flex xs7 sm7>
      <strong v-html="user.display_name"></strong>
      <span
        v-if="user.age"
        class="grey--text"
      >
        &nbsp;({{ user.age }})
      </span>
      <v-icon
        v-if="user.favourite"
        color="yellow darken-4"
      >
        grade
      </v-icon>
    </v-flex>

    <v-flex no-wrap xs5 sm5>
      <v-chip
        v-if="user.city"
        :color="`lighten-4`"
        class="ml-0"
        label
        small
      >
        {{ user.city }}
      </v-chip>
    </v-flex>

    <v-flex
      class="grey--text"
      ellipsis
      xs12
      sm12
    >
      <span v-if="user.religion">{{ user.religion }}</span>
      <span v-if="user.height_in_cm">, {{ user.height_in_cm }}cm tall</span>
      <span v-if="user.contacts_exchanged">, has {{ user.contacts_exchanged }} connection(s)</span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    setUser(selected) {
      this.$emit('setUser', selected);
    }
  }
}
</script>
