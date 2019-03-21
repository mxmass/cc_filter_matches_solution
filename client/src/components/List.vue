<template>
  <v-layout row>
    <v-expansion-panel>
      <v-expansion-panel-content
        v-for="(item, idx) in items"
        :key="idx">
         <template v-slot:header>
            <v-layout
              align-center
              row
              spacer
              wrap
              @click="setUser(item)"
            >
              <v-flex xs1>
                <!-- <v-icon dark>mdi-grade</v-icon> -->
              </v-flex>
              <v-flex xs6 sm4>
                <strong v-html="item.display_name"></strong>
                <span
                  v-if="item.age"
                  class="grey--text"
                >
                  &nbsp;({{ item.age }})
                </span>
              </v-flex>

              <v-flex no-wrap xs5 sm5>
                <v-chip
                  v-if="item.city"
                  :color="`lighten-4`"
                  class="ml-0"
                  label
                  small
                >
                  {{ item.city }}
                </v-chip>
              </v-flex>

              <v-flex
                class="grey--text"
                ellipsis
                xs12
              >
                <span v-if="item.religion">{{ item.religion }}</span>
                <span v-if="item.height_in_cm">, {{ item.height_in_cm }}cm tall</span>
                <span v-if="item.contacts_exchanged">, has {{ item.contacts_exchanged }} connection(s)</span>
              </v-flex>
            </v-layout>
          </template>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>

<script>
import Axios from 'axios'

export default {
  props: ['items'],
  methods: {
    setUser(user) {
      this.$emit('setUser', user);
    }
  }
}
</script>

<style scoped>
</style>
