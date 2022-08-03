<template>
  <v-navigation-drawer clipped app width="30%">
    <div class="spacer" />
    <table style="height: 95%; width: 95%;">
      <tr>
        <td style="width: 48%;vertical-align: top;">
          <table id="tbl-database">
            <tr>
              <td>
                <h2>{{ countDbs }} Databases</h2>
              </td>
            </tr>
            <tr v-for="(db, i) in databases" v-bind:key="'db' + i">
              <td>
                <v-btn
                  text
                  class="btn-db"
                  :color="getActiveColor(db.name, 'database')"
                  @click="setSelectedDatabase(db.name)"
                >
                  <table class="tbl-text">
                    <tr>
                      <td><v-icon size="18">fa-database</v-icon></td>
                      <td>{{ db.name }}</td>
                    </tr>
                  </table>
                </v-btn>
              </td>
            </tr>
          </table>
        </td>
        <td style="width: 4%;">
          <v-divider vertical></v-divider>
        </td>
        <td style="width: 48%;vertical-align: top;">
          <table id="tbl-collections">
            <tr>
              <td>
                <h2>{{ countCollections }} Collections</h2>
              </td>
            </tr>
            <tr
              v-for="(collection, i) in collections"
              v-bind:key="'collection' + i"
            >
              <td>
                <v-btn
                  text
                  class="btn-db"
                  :color="getActiveColor(collection, 'collection')"
                  @click="setSelectedCollection(collection)"
                >
                  <table class="tbl-text">
                    <tr>
                      <td><v-icon size="18">fa-list</v-icon></td>
                      <td>{{ collection }}</td>
                    </tr>
                  </table>
                </v-btn>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </v-navigation-drawer>
</template>
<script lang="ts">
import Vue from 'vue';
import { api } from '../config';
export default Vue.extend({
  name: 'SideBar',
  computed: {
    databases: {
      get(): any[] {
        return this.$store.state.databases;
      }
    },
    selectedDatabase: {
      get(): string {
        return this.$store.state.selectedDatabase;
      },
      set(value: string) {
        this.$store.state.selectedDatabase = value;
      }
    },
    countDbs: {
      get(): number {
        return this.$store.state.databases.length;
      }
    },
    collections: {
      get(): any[] {
        return this.$store.state.collections;
      }
    },
    countCollections: {
      get(): number {
        return this.$store.state.collections.length;
      }
    }
  },
  methods: {
    getActiveColor(name: string, type: string) {
      if (type === 'database') {
        if (name === this.$store.state.selectedDatabase) {
          return '#57AE47';
        }
      } else if (type === 'collection') {
        if (name === this.$store.state.selectedCollection) {
          return '#57AE47';
        }
      }
      return '#555555';
    },
    setSelectedDatabase(dbName: string) {
      this.$store.commit('setDatabase', dbName);
    },
    setSelectedCollection(collName: string) {
      this.$store.commit('setCollection', collName);
    }
  }
});
</script>
<style scoped>
#tbl-database {
  width: 100%;
  vertical-align: top;
}

#tbl-database td {
  padding-left: 8px;
  padding-bottom: 12px;
  vertical-align: top;
}

.tbl-text td {
  padding: 6px;
}

.btn-db {
  text-transform: none;
  font-size: 16px;
}

#tbl-collections {
  width: 100%;
}

#tbl-collections td {
  vertical-align: top;
  padding-left: 8px;
  padding-bottom: 12px;
}
</style>
