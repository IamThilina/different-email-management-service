// core modules
import Decorator from '../helpers/decorator';
import express from 'express';

// helpers
import { INTERNAL_ERROR, SUCCESS } from '../helpers/constants';

// controller
import emailController from '../controllers/emailController';

/**
 * Handles all routes related to emails
 */
class EmailRouter extends Decorator {

	/**
	 *
	 * @return {Router|router} - express email router
	 */
	constructor() {
		super();
		const router = new express.Router();
		router.post('/', this.sendEmail.bind(this));
		router.get('/:id', this.getEmailStatus.bind(this));
		router.delete('/:id', this.deleteEmail.bind(this));
		return router;
	}

	/**
	 * send an email to given address with given details
	 * @param {Object} req - express request
	 * @param {Object} res - express response
	 * @return {*} -
	 */
	sendEmail(req, res) {
		emailController.sendEmail(req.body)
			.then((ack) => {
				return res.status(SUCCESS).json(ack);
			})
			.catch((err) => {
				this.logError(err);
				return res.status(INTERNAL_ERROR).json({});
			});
	}

	/**
	 * get the status of a previously sent mail
	 * @param {Object} req - express request
	 * @param {Object} res - express response
	 * @return {*} -
	 */
	getEmailStatus(req, res) {
		emailController.getEmailStatus(req.params)
			.then((ack) => {
				return res.status(SUCCESS).json(ack);
			})
			.catch((err) => {
				this.logError(err);
				return res.status(INTERNAL_ERROR).json({});
			});
	}

	/**
	 * delete a previously queued email
	 * @param {Object} req - express request
	 * @param {Object} res - express response
	 * @return {*} -
	 */
	deleteEmail(req, res) {
		emailController.deleteEmail(req.params)
			.then((ack) => {
				return res.status(SUCCESS).json(ack);
			})
			.catch((err) => {
				this.logError(err);
				return res.status(INTERNAL_ERROR).json({});
			});
	}
}

export default new EmailRouter();
