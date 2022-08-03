import { MongoClient, Collection, Db, ObjectId } from 'mongodb';
import { winston } from './logger';

/**
 * MongoDB structure:
 *
 * MongoDB
 *   |__Database
 *          |__Collection
 */

/**
 * connection to MongoDB database
 */
export default class Mongo {
  client: MongoClient;
  db: Db;
  collection: Collection;

  /**
   * Mongo class constructor
   * @param uri database URI
   */
  constructor(uri: string) {
    this.client = new MongoClient(uri);
    this.connect();
  }

  /**
   * connects the client to your local MongoDB
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (error) {
      winston.error(`Error while connecting to MongoDB: ${error}`, {
        metadata: {
          class: 'mongo',
          method: 'connect'
        }
      });
      throw error;
    }
  }

  /**
   * Gets all databases from your MongoDB
   */
  async getDatabases(): Promise<any> {
    let dbs: any;
    try {
      dbs = await this.client.db().admin().listDatabases();
      return dbs;
    } catch (error) {
      winston.error(`Error while getting the databases: ${error}`, {
        metadata: {
          class: 'mongo',
          method: 'getDatabases'
        }
      });
      throw error;
    }
  }

  /**
   * sets the current choosen database
   * @param dbName database name
   */
  async setDatabase(dbName: string) {
    try {
      this.db = this.client.db(dbName);
    } catch (error) {
      winston.error(`Error while setting the database: ${error}`, {
        metadata: {
          class: 'mongo',
          method: 'setDatabase'
        }
      });
      throw error;
    }
  }

  /**
   * gets all collections from the choosen database.
   */
  async getCollections(): Promise<any[]> {
    let collections: any[];
    try {
      collections = await this.db.listCollections().toArray();
      return collections;
    } catch (error) {
      winston.error(
        `Error while getting the collections from the database ${this.db.databaseName}: ${error}`,
        {
          metadata: {
            class: 'mongo',
            method: 'getCollections'
          }
        }
      );
      throw error;
    }
  }

  /**
   * sets the current choosen collection
   * @param collectionName collection name
   */
  setCollection(collectionName: string): void {
    try {
      this.collection = this.db.collection(collectionName);
    } catch (error) {
      winston.error(`Error while setting the collection: ${error}`, {
        metadata: {
          class: 'mongo',
          method: 'setCollection'
        }
      });
      throw error;
    }
  }

  /**
   * gets all the content from the choosen collection
   */
  async getCollectionContent(): Promise<any[]> {
    let collectionContent: any[];
    try {
      collectionContent = await this.collection.find().toArray();
      return collectionContent;
    } catch (error) {
      winston.error(
        `Error while getting the content from collection ${this.collection.collectionName}: ${error}`,
        {
          metadata: {
            class: 'mongo',
            method: 'getCollectionContent'
          }
        }
      );
      throw error;
    }
  }

  /**
   * updates the selected item
   * @param updatedItem updated item object
   * @param id  item uuid
   */
  async updateItem(updatedItem: any, id: string): Promise<void> {
    try {
      delete updatedItem._id;
      delete updatedItem._createdAt;
      delete updatedItem.updatedAt;
      delete updatedItem.__v;
      let dbUpdated: any = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedItem }
      );
      return dbUpdated;
    } catch (error) {
      winston.error(`Error while updating the item with id ${id}: ${error}`, {
        metadata: {
          class: 'mongo',
          method: 'updateItem'
        }
      });
      throw error;
    }
  }
}
