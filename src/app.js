// Core modules
import express from 'express';
import bodyParser from 'body-parser';

// Router
import router from './app/router';

// Middleware
import errorHandler from './app/middleware/errorHandler';
import $404Handler from './app/middleware/404Handler';

const app = express();

// pre processing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// version specific base router
app.use('/v1', router);

// Catch 404 and forward to error handler
app.use($404Handler);

// Main error handler
app.use(errorHandler);

export default app;
