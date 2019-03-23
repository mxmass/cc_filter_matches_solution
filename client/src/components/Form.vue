<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap white>
          <v-flex xs3>
            <v-switch
              v-model="hasphoto"
              :label="`With photo`"
            ></v-switch>
          </v-flex>
          <v-flex xs5>
            <v-switch
              v-model="incontact"
              :label="`Contacted to others`"
            ></v-switch>
          </v-flex>
          <v-flex xs4>
            <v-switch
              v-model="favourite"
              :label="`Added to favourites`"
            ></v-switch>
          </v-flex>
          <v-flex
            v-if="selectedUser._id"
            xs12
            sm12
            d-flex
            pa50
          >
            <v-slider
              v-model="range"
              thumb-label="always"
              min="30"
              max="300"
              label="Range (km)"
            >
            </v-slider>
          </v-flex>
          <v-flex xs12 sm12 d-flex pa50>
            <v-range-slider
              v-model="age"
              thumb-label="always"
              :max="age2"
              :min="age1"
              label="Age"
            ></v-range-slider>
          </v-flex>
          <v-flex xs12 sm12 d-flex pa50>
            <v-range-slider
              v-model="height"
              thumb-label="always"
              :max="height2"
              :min="height1"
              label="Height"
            ></v-range-slider>
          </v-flex>
          <v-flex xs12 sm12 d-flex pa50>
            <v-range-slider
              v-model="score"
              thumb-label="always"
              :max="score2"
              :min="score1"
              step="0.01"
              label="Score"
            ></v-range-slider>
          </v-flex>
          <v-flex xs12>
            <v-btn
              round
              color="primary"
              dark
              @click="performSearch"
            >
              Search<span v-if="count">&nbsp;&nbsp;({{count}})</span>
            </v-btn>
            <v-progress-circular
              v-if="switchMe"
              :indeterminate="switchMe"
              :value="0"
              size="24"
              class="ml-2"
            ></v-progress-circular>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['count', 'selectedUser', 'switchMe'],
  data() {
    return {
      age: [18, 95],
      age1: 18,
      age2: 95,
      height: [135, 210],
      height1: 135,
      height2: 210,
      score: [0.01, 0.99],
      score1: 0.01,
      score2: 0.99,
      range: 300,
      hasphoto: false,
      incontact: false,
      favourite: false
    }
  },
  methods: {
    performSearch() {
      const sarr = {
        range: this.range,
        minage: this.age[0],
        maxage: this.age[1],
        minheight: this.height[0],
        maxheight: this.height[1],
        minscore: this.score[0],
        maxscore: this.score[1],
        hasphoto: this.hasphoto,
        incontact: this.incontact,
        favourite: this.favourite
      }
      this.$emit('performSearch', sarr)
    }
  }
}
</script>

<style scoped>
.pa50 {
  margin: 0 15px;
}
</style>
