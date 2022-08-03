import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyparser from 'body-parser';

var server: express.Application = express();
server.use(bodyparser.urlencoded({ extended: true, limit: '50mb' }));
server.use(cors());
server.use(helmet());
server.use(express.json());

/**
 * Routing
 */
import { mongoRoutes } from './routes/mongo.routes';

mongoRoutes(server);

export default server;
