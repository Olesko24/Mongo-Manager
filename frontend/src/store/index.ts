import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { api } from '../config';

export default new Vuex.Store({
  state: {
    loading: false,
    databases: new Array<any>(),
    selectedDatabase: '',
    collections: new Array<any>(),
    selectedCollection: '',
    collectionContent: new Array<any>(),
    error: ''
  },
  mutations: {
    async setDatabase(state, dbName: string) {
      state.loading = true;
      try {
        state.selectedCollection = '';
        state.collections = new Array<any>();
        // Database im Backend setzen
        let res: Response = await fetch(`${api}/database`, {
          method: 'POST',
          body: JSON.stringify({
            dbName: dbName
          }),
          headers: {
            'content-type': 'application/json'
          }
        });
        let dbRes: any = await res.json();
        if (dbRes.error) {
          throw dbRes.error;
        }
        state.selectedDatabase = dbRes.dbName;
        // Collections der Database holen
        res = await fetch(`${api}/collections`, {
          method: 'GET'
        });
        dbRes = await res.json();
        if (dbRes.error) {
          throw dbRes.error;
        }
        state.collections = dbRes.collections;
      } catch (error) {
        state.error = error as string;
      } finally {
        state.loading = false;
      }
    },
    async setCollection(state, collName: string) {
      state.loading = true;
      try {
        // Collection im Backend setzen
        let res: Response = await fetch(`${api}/collection`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            collectionName: collName
          })
        });
        let collRes: any = await res.json();
        if (collRes.error) {
          throw collRes.error;
        }
        state.selectedCollection = collRes.collectionName;
        // Inhalte der Collection holen
        res = await fetch(`${api}/content`, {
          method: 'GET'
        });
        let contentRes: any = await res.json();
        if (contentRes.error) {
          throw contentRes.error;
        }
        state.collectionContent = contentRes.content;
      } catch (error) {
        state.error = error as string;
      } finally {
        state.loading = false;
      }
    },
    async updateItem(state, item: any) {
      state.loading = true;
      try {
        let res: Response = await fetch(`${api}/updateItem`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            id: item._id,
            updatedItem: item
          })
        });
        let updatedItem: any = await res.json();
        if (updatedItem.error) {
          throw updatedItem.error;
        }
      } catch (error) {
        state.error = error as string;
      } finally {
        state.loading = false;
      }
    }
  }
});
