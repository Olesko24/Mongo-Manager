import server from './server';
import { winston } from './services/logger';
import { port, mongoURI } from './config';
import { initMongo } from './controllers/mongo.controller';

/**
 * initating the server.
 */
async function init() {
  try {
    initMongo(mongoURI);
    winston.info(`Initialisierung des Servers erfolgreich.`, {
      metadata: {
        class: 'index',
        method: 'init'
      }
    });
  } catch (error) {
    console.log(`Fehler beim Setup des Servers: ${error}`);
    process.exit();
  }
}

init();

/**
 * starting express service.
 */
server
  .listen(port, () => {
    winston.info(`Server läuft auf port ${port}`, {
      metadata: {
        class: 'index.ts',
        method: 'listen'
      }
    });
  })
  .on('error', error => {
    console.log(error);
    process.exit();
  });

/**
 * catching uncaught errors
 */

process.on('uncaughtException', error => {
  console.log(error);
});

process.on('unhandledRejection', error => {
  console.log(error);
});

process.on('SIGINT', () => {
  process.exit();
});
