<template>
  <v-dialog
    :value="show"
    width="60%"
    @click:outside="closeDialog()"
    @keydown="handleEscape"
  >
    <v-card shaped elevation="3">
      <br />
      <v-card-title><h2>JSON Edit</h2></v-card-title>
      <div id="card-content">
        <br />
        <v-textarea
          v-model="jsonString"
          auto-grow
          type="text"
          rounded
          outlined
        />
      </div>
      <v-card-actions>
        <table style="margin: 0 auto">
          <tr>
            <td style="padding: 15px">
              <v-btn icon color="#57AE47" @click="saveChanges"
                ><v-icon size="40">fa-save</v-icon></v-btn
              >
            </td>
            <td style="padding: 15px">
              <v-btn icon color="red" @click="closeDialog"
                ><v-icon size="40">fa-times-circle</v-icon></v-btn
              >
            </td>
          </tr>
        </table>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="showError" width="40%">
      <v-card elevation="3" rounded color="red" dark>
        <div class="div-error">
          <br />
          <table style="width: 100%">
            <tr>
              <td>Saving not possible! Content is not in JSON-format.</td>
              <td>
                <v-btn icon @click="showError = false"
                  ><v-icon>fa-times-circle</v-icon></v-btn
                >
              </td>
            </tr>
          </table>

          <br />
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showSuccess" width="25%">
      <v-card elevation="3" rounded color="green" dark>
        <div class="div-error">
          <br />
          <table style="width: 95%; margin: 0 auto">
            <tr>
              <td>Saving successful!</td>
              <td>
                <v-btn icon @click="showSuccess = false"
                  ><v-icon>fa-times-circle</v-icon></v-btn
                >
              </td>
            </tr>
          </table>
        </div>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'EditJson',
  props: {
    show: Boolean,
    editJson: Object
  },
  data() {
    return {
      editorOptions: {
        confirmText: 'Confirm',
        cancelTest: 'Cancel'
      },
      jsonEdit: '',
      showError: false,
      showSuccess: false
    };
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    },
    saveChanges() {
      try {
        let obj: any | any[] = JSON.parse(this.jsonEdit);
        let updatedObj: any = this.editJson.originItem;
        updatedObj[this.editJson.propName] = obj;
        this.$store.commit('updateItem', updatedObj);
        this.showSuccess = true;
      } catch (error) {
        this.showError = true;
        return false;
      }
    },
    handleEscape(event: any) {
      const { key } = event;
      if (key === 'Escape') {
        this.closeDialog();
      }
    }
  },
  computed: {
    jsonString: {
      get(): string {
        this.jsonEdit = JSON.stringify(this.json, null, 4);
        return JSON.stringify(this.json, null, 4);
      },
      set(value: string) {
        this.jsonEdit = value;
      }
    },
    json: {
      get(): Object | Array<any> | undefined {
        if (this.editJson) {
          return this.editJson.json;
        }
        return undefined;
      }
    }
  }
});
</script>
<style scoped>
#card-content {
  padding: 15px;
}

.div-error {
  font-size: 20px;
  padding-bottom: 10px;
}
</style>
