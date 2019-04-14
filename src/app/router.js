/* eslint-disable require-jsdoc */
// Core modules
import express from 'express';
import Decorator from './helpers/decorator';

// Sub level routers
import emailRouter from './routers/email';

/**
 * v1 base router, delegate requests to sub level routers
 */
class Router extends Decorator {
	/**
	 * constructor
	 * @return {express.Router} -
	 */
	constructor() {
		super();
		const router = new express.Router();
		router.use('/emails', emailRouter);
		return router;
	}
}

export default new Router();
