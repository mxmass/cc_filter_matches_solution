<template>
  <v-img
    :src="avatar"
    aspect-ratio="1"
    class="grey lighten-2"
  >
    <template v-slot:placeholder>
      <ImgLoader />
    </template>
  </v-img>
</template>

<script>
import ImgLoader from './ImgLoader'

export default {
  props: ['avatar'],
  components: {
    ImgLoader
  }
}
</script>
