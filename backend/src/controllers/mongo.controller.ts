import Mongo from '../services/mongo';
import { winston } from '../services/logger';

var mongo: Mongo;

export function initMongo(mongoUri: string) {
  mongo = new Mongo(mongoUri);
}

export async function getDatabases(req: any, res: any): Promise<void> {
  try {
    let dbs: any = await mongo.getDatabases();
    res.status(200).send({ dbs: dbs });
  } catch (error) {
    res
      .status(200)
      .send({ error: `error while getting the databases: ${error}` });
  }
}

export function setDatabase(req: any, res: any) {
  try {
    if (!('dbName' in req.body)) {
      winston.error(`request body is incomplete: {dbName: string}`, {
        metadata: {
          class: 'mongo.controller',
          method: 'setDatabase'
        }
      });
      res
        .status(400)
        .send({ error: `request body is incomplete: {dbName: string}` });
      return;
    }

    let { dbName } = req.body;

    mongo.setDatabase(dbName);

    res.status(200).send({ dbName: dbName });
  } catch (error) {
    res
      .status(400)
      .send({ error: `error while setting the database: ${error}` });
  }
}

export async function getCollections(req: any, res: any) {
  try {
    let collections: any[] = await mongo.getCollections();
    collections = collections.map((coll: any) => {
      return coll.name;
    });
    res.status(200).send({ collections: collections });
  } catch (error) {
    res
      .status(400)
      .send({ error: `error while getting the collection: ${error}` });
  }
}

export function setCollection(req: any, res: any) {
  try {
    if (!('collectionName' in req.body)) {
      winston.error(`request body is incomplete: {collectionName: string}`, {
        metadata: {
          class: 'mongo.controller',
          method: 'setCollection'
        }
      });
      res.status(400).send({
        error: `request body is incomplete: {collectionName: string}`
      });
      return;
    }

    let { collectionName } = req.body;

    mongo.setCollection(collectionName);

    res.status(200).send({ collectionName: collectionName });
  } catch (error) {
    res
      .stauts(400)
      .send({ error: `error while setting the collection: ${error}` });
  }
}

export async function getCollectionContent(req: any, res: any) {
  try {
    let collectionContent: any[] = await mongo.getCollectionContent();
    res.status(200).send({ content: collectionContent });
  } catch (error) {
    res.status(400).send({
      error: `error while getting the collection content: ${error}`
    });
  }
}

export async function updateItem(req: any, res: any) {
  try {
    if (!('updatedItem' in req.body && 'id' in req.body)) {
      res.status(400).send({
        error: `request body is incomplete: {updatedItem: object, id: string}`
      });
      return;
    }
    var { updatedItem, id } = req.body;

    let dbUpdated: any = await mongo.updateItem(updatedItem, id);
    res.status(200).send({ dbUpdated: dbUpdated });
  } catch (error) {
    res.status(400).send({
      error: `error while updating the item: ${error}`
    });
  }
}
