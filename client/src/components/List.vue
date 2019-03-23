<template>
  <v-layout row>
    <v-expansion-panel>
      <v-expansion-panel-content
        v-for="(item, idx) in items"
        :key="idx">
        <template
          v-if="item._id !== user._id"
          v-slot:header
        >
          <Item
            :user="item"
            @setUser="setUser"
          />
        </template>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>

<script>
import Item from './List/Item.vue'

export default {
  props: ['items', 'user'],
  components: {
    Item
  },
  methods: {
    setUser(selected) {
      this.$emit('setUser', selected);
    }
  }
}
</script>

<style scoped>
</style>
