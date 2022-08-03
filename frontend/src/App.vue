<template>
  <div>
    <v-app id="app">
      <Alert />
      <SideBar />
      <TopBar />
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { api } from "./config";
import TopBar from './components/TopBar.vue';
import SideBar from './components/SideBar.vue';
import Alert from './components/Alert.vue';
export default Vue.extend({
  name: 'App',
  components: {
    TopBar,
    SideBar,
    Alert
  },
  methods: {
    async getDatabases(){
      try {
        this.$store.state.loading = true;
        let res: Response = await fetch(`${api}/databases`, {
          method: 'GET'
        });
        let dbs: any = await res.json();
        this.$store.state.databases = dbs.dbs.databases;
      } catch(error){
        this.$store.state.error = error;
      } finally {
        this.$store.state.loading = false;
      }
    }
  },
  mounted(){
    this.getDatabases();
  }
});
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300&display=swap');
#app {
  font-family: 'Nunito', sans-serif;
  color: #555555;
}

.spacer {
  height: 20px;
}
</style>
