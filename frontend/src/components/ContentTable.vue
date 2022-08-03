<template>
  <div>
    <div v-if="tableContent.length > 0">
      <table id="tbl-search">
        <tr>
          <td><h3>{{tableContent.length}} Items</h3></td>
          <td>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            />
          </td>
          <td></td>
        </tr>
      </table>
      <br />
      <v-data-table
        :items="tableContent"
        :headers="headers"
        :items-per-page="50"
        elevation="1"
        :search="search"
      >
        <template v-slot:item="{ item, headers, index }">
          <tr>
            <td v-for="(head, i) in headers" v-bind:key="head.text + index + i">
              <template v-if="checkJSON(item[head.text])">
                <v-btn icon @click="editJSON(item[head.text], head.text, item)"
                  ><v-icon size="20">mdi-code-json</v-icon></v-btn
                >
              </template>
              <template v-else>
                <template v-if="checkCellEdit(item[head.text], head.text)">
                  <v-edit-dialog large @save="saveEditDialog(item)">
                    {{ item[head.text] }}
                    <template v-slot:input>
                      <v-text-field
                        v-model="item[head.text]"
                        label="Edit"
                        single-line
                      />
                    </template>
                  </v-edit-dialog>
                </template>
                <template v-else>
                  <div @click="openEditDialog(item, head.text)">
                    {{ item[head.text] }}
                  </div>
                </template>
              </template>
            </td>
          </tr>
        </template>
      </v-data-table>
      <EditJson
        :show="showEditJson"
        :editJson="editObject"
        @closeDialog="showEditJson = false"
      />
    </div>
    <v-overlay :value="loading" absolute>
      <v-progress-circular indeterminate size="180"></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="showEditDialog" width="50%" v-if="editValue">
      <v-card elevation="2" rounded>
        <v-container class="edit-container">
          <v-row justify="center" align="center">
            <br />
            <h2>Column "{{ editHeader }}" edit</h2>
          </v-row>
          <v-row>
            <br />
            <v-text-field
              v-model="editValue[editHeader]"
              :label="editHeader"
              v-if="editValue[editHeader].length <= 70"
            />
            <v-textarea
              v-model="editValue[editHeader]"
              :label="editHeader"
              v-else
            />
            <br />
          </v-row>
          <v-row justify="center" align="center">
            <v-btn
              color="#57AE47"
              dark
              @click="
                saveEditDialog(editValue);
                showEditDialog = false;
              "
              >Save</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import EditJson from './EditJson.vue';
import uniqBy from 'lodash/uniqBy';
export default Vue.extend({
  name: 'ContentTable',
  data() {
    return {
      search: '',
      editObject: {
        json: null,
        propName: '',
        originItem: null
      },
      showEditJson: false,
      editDialogValue: null,
      showEditDialog: false,
      editValue: null,
      editHeader: ''
    };
  },
  methods: {
    checkJSON(value: any) {
      if (!value) {
        return false;
      }
      if (Array.isArray(value)) {
        return true;
      }
      if (typeof value === 'object') {
        return true;
      }
      return false;
    },
    editJSON(value: any, propName: string, item: any) {
      if (typeof value === 'object' || Array.isArray(value)) {
        this.editObject = {
          json: value,
          propName: propName,
          originItem: item
        };
        this.showEditJson = true;
      }
    },
    saveEditDialog(item: any) {
      this.$store.commit('updateItem', item);
    },
    checkCellEdit(value: any, propName: string) {
      if (!value) {
        return false;
      }
      switch (propName) {
        case '_id':
        case 'createdAt':
        case 'updatedAt':
        case '__v':
          return false;
      }
      if (value.length > 20) {
        return false;
      }
      return true;
    },
    openEditDialog(item: any, header: string) {
      if (!item) {
        return;
      }
      switch (header) {
        case '_id':
        case 'createdAt':
        case 'updatedAt':
        case '__v':
          return;
      }
      this.showEditDialog = true;
      this.editValue = item;
      this.editHeader = header;
    }
  },
  computed: {
    tableContent: {
      get(): any[] {
        return this.$store.state.collectionContent;
      }
    },
    headers: {
      get(): any[] {
        let hds: any[] = new Array<any>();
        for (let cont of this.tableContent) {
          for (var [key, value] of Object.entries(cont)) {
            hds.push({
              text: key,
              value: key,
              sortable: true
            });
          }
        }
        return uniqBy(hds, 'text');
      }
    },
    loading: {
      get(): boolean {
        return this.$store.state.loading;
      }
    }
  },
  components: {
    EditJson
  }
});
</script>
<style scoped>
#tbl-search {
  width: 100%;
}

#tbl-search td {
  padding: 10px;
}

#tbl-search td:nth-child(odd) {
  width: 20%;
}

.edit-container {
  width: 95%;
  padding: 20px;
  margin: 0 auto;
}
</style>
