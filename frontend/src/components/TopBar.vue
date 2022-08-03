<template>
  <v-app-bar app clipped-left>
    <v-container id="tbl-app-bar">
      <v-row align="center">
        <v-col class="shrink">
          <v-img src="../assets/mongo-logo.png" max-width="55" />
        </v-col>
        <v-col cols="2">
          <h1>Mongo Manager</h1>
        </v-col>
        <v-col class="grow">
          <div style="height:25%;position: absolute;top: 40%">
            <p style="font-size:18px;">manage your MongoDB properly ...</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'TopBar'
});
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');
#tbl-app-bar {
  width: 98%;
  margin: 0 auto;
  font-family: 'Satisfy', cursive;
  color: rgb(85, 85, 85);
}

h1 {
  font-size: 42px;
}
</style>
