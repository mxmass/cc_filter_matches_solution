<template>
  <v-app>
    <v-container grid-list-md text-xs-center>
      <v-layout
        row
        wrap>
        <v-flex
          xs12
          sm7
          md6>
          <div class="sticky">
            <div v-if="selectedUser._id">
              <User
                :user="selectedUser"
                @wipeUser="wipeUser"
              />
              <Form
                :count="listCount"
                :switchMe="switchMe"
                @performSearch="filterList"
              />
            </div>
            <div v-else>You should select anchor user to enable filter options</div>
          </div>
        </v-flex>
        <v-flex
          xs12
          sm5
          md6>
          <List
            :items="list"
            :user="selectedUser"
            @setUser="setUser"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import Axios from 'axios'
import List from './components/List.vue'
import Form from './components/Form.vue'
import User from './components/User.vue'

export default {
  name: 'app',
  components: {
    List,
    Form,
    User
  },
  data() {
    return {
      config: {
        API_URL: `http://localhost:8081`,
      },
      list: Object,
      selectedUser: Object,
      listCount: 0,
      switchMe: false
    }
  },
  mounted() {
    this.retreiveList();
  },
  methods: {
    errorHandler (error) {
      console.error(error); // eslint-disable-line no-console
    },
    retreiveList () {         // get initial list
      let route = this.config.API_URL + `/`;
      Axios.post(route, {})   // async promise based API call
      .then(({ data }) => {
        this.list = data
      }).catch(error => {
        this.errorHandler(error);
      })
    },
    filterList (filter) {     // get filtered list
      this.switchMe = true;
      filter.lng = this.selectedUser.location.coordinates[0];
      filter.lat = this.selectedUser.location.coordinates[1];
      let route = this.config.API_URL + `/filter`;
      Axios.post(route, filter, {}) // async promise based API call
      .then(({ data }) => {
        setTimeout(this.updateList, 1000, data);
      }).catch(error => {
        this.errorHandler(error);
        this.switchMe = false;
      })
    },
    updateList(data) {
      this.list = data;
      this.countList();
      this.switchMe = false;
    },
    setUser(user) {
      this.selectedUser = user;
    },
    wipeUser() {
      this.selectedUser = {};
      this.retreiveList();
      this.listCount = 0;
    },
    countList() {
      if (this.list) {
        this.listCount = this.list.length-1;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.sticky {
  position: -webkit-sticky;
  position: -moz-sticky;
  position: -ms-sticky;
  position: -o-sticky;
  position: sticky;
  top: 10px;
}
</style>
