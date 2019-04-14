// core modules
import express from 'express';
import Validator from 'xpress-req-validator';
import Decorator from '../../helpers/decorator';

// helpers
import { INTERNAL_ERROR, SUCCESS } from '../../helpers/constants';
import config from './validation/configs';

// controller
import emailController from '../../controllers/email';

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
		const router = new express.Router(),
			validator = new Validator(config),
			validationMiddleware = validator.init();

		router.post('/', validationMiddleware, this.sendEmail.bind(this));
		router.get('/:id', validationMiddleware, this.getEmailDeliveryStatus.bind(this));
		router.delete('/:id', validationMiddleware, this.deleteQueuedEmail.bind(this));
		return router;
	}

	/**
	 * send an email to given address with given details
	 * @param {Object} req - express request
	 * @param {Object} res - express response
	 */
	sendEmail(req, res) {
		emailController.sendEmail(req.body)
			.then((ack) => res.status(SUCCESS).json(ack))
			.catch((err) => {
				this.logError(err);
				return res.status(INTERNAL_ERROR).json({message: err.message});
			});
	}

	/**
	 * get the status of a previously sent mail
	 * @param {Object} req - express request
	 * @param {Object} res - express response
	 */
	getEmailDeliveryStatus(req, res) {
		emailController.getEmailDeliveryStatusById(req.params)
			.then((email) => res.status(SUCCESS).json(email))
			.catch((err) => {
				this.logError(err);
				return res.status(INTERNAL_ERROR).json({message: err.message});
			});
	}

	/**
	 * delete a previously queued email
	 * @param {Object} req - express request
	 * @param {Object} res - express response
	 */
	deleteQueuedEmail(req, res) {
		emailController.deleteQueuedEmailById(req.params)
			.then((email) => res.status(SUCCESS).json(email))
			.catch((err) => {
				this.logError(err);
				return res.status(INTERNAL_ERROR).json({message: err.message});
			});
	}
}

export default new EmailRouter();
