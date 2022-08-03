import {
  getDatabases,
  setDatabase,
  getCollections,
  setCollection,
  getCollectionContent,
  updateItem
} from '../controllers/mongo.controller';

export function mongoRoutes(app: any) {
  app.get('/databases', (req: any, res: any) => {
    getDatabases(req, res);
  });

  app.post('/database', (req: any, res: any) => {
    setDatabase(req, res);
  });

  app.get('/collections', (req: any, res: any) => {
    getCollections(req, res);
  });

  app.post('/collection', (req: any, res: any) => {
    setCollection(req, res);
  });

  app.get('/content', (req: any, res: any) => {
    getCollectionContent(req, res);
  });

  app.post('/updateItem', (req: any, res: any) => {
    updateItem(req, res);
  });
}
