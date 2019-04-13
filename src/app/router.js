/* eslint-disable require-jsdoc */
// Core modules
import express from 'express';

// Controllers

// Custom modules
import Decorator from './helpers/decorator';
import { INTERNAL_ERROR, SUCCESS } from './helpers/constants';

let _this;

/**
 * router for xyz ms
 */
class Router extends Decorator {
	/**
	 * constructor
	 * @return {express.Router} -
	 */
	constructor() {
		super();
		const router = new express.Router();
		_this = this;

		router.get('/mocks', _this.getAllMocks);

		return router;
	}

	/**
	 * utility to send error response
	 * @param {object} res - express res object
	 * @param {object} err - error object
	 * @private
	 */
	_sendErrorResponse(res, err) {
		res.status(INTERNAL_ERROR).json({
			message: err.message,
		});
	}

	async getAllMocks(req, res) {
		res.status(SUCCESS).json({});
	}
}

export default new Router();
