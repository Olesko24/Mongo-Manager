<template>
  <div>
    <v-dialog :value="showError" width="800px">
      <div id="error-container">
        <v-row align="center">
          <v-col class="shrink">
            <v-icon dark size="30">fa-exclamation-triangle</v-icon>
          </v-col>
          <v-col class="grow">
            <div class="error-text">{{ error }}</div>
          </v-col>
          <v-col class="shrink">
            <v-btn icon @click="close" dark
              ><v-icon>fa-times-circle</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </div>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Alert',
  computed: {
    error: {
      get(): string {
        return this.$store.state.error;
      },
      set(value: string) {
        this.$store.state.error = value;
      }
    },
    showError: {
      get(): boolean {
        if (this.$store.state.error !== '') {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    close() {
      this.error = '';
    }
  }
});
</script>
<style scoped>
#error-container {
  padding: 15px;
  background-color: rgb(240, 95, 95);
  color: white;
  border-radius: 6px;
}

.error-text {
  font-size: 17px;
}
</style>
