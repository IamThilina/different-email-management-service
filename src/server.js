// Core modules
import http from 'http';

// Custom Modules
import Daemon from './daemon';
import app from './app';

// Helpers
import * as constants from './app/helpers/constants';
import { definitions } from './configs';
import logger from './utils/logger';

// Create HTTP server and listen on dedicated port
const server = http.createServer(app);

// Init HTTPS server dependencies and start listening
Daemon.initSyncServices()
  .then(() => {
    const listeningPort = definitions.PORT;
    server.listen(listeningPort, () => {
      logger.info('Listening on port: %s', listeningPort);
    });
  })
  .catch((err) => {
    logger.fatal(
      `Failed to initialize required services. Process will now exit: ${err.message}`
    );
    process.exit(1);
  });

// Init asynchronous services
Daemon.initAsyncServices();

//Stop process killing on exceptions
process.on('uncaughtException', (err) => {
  logger.fatal('UncaughtException : %s', err.stack ? err.stack : err);
});

server.on('uncaughtException', (req, res, next, err) => {
  logger.error('UncaughtException : %s', err.stack ? err.stack : err);
  return res.status(constants.INTERNAL_ERROR).send(err.message);
});

server.on('error', (err) => {
  logger.fatal('Error : %s', err.stack ? err.stack : err);
  switch (err.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
  }
});
