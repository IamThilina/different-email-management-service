// core modules
import Decorator from '../../helpers/decorator';

// services
import emailService from '../../services/email';

// daos
import emailDao from '../../daos/mongo/email';

// helpers
import { EMAIL_STATUS } from '../../helpers/constants';

/**
 * handles business logic related to emails
 */
class EmailController extends Decorator {
	/**
	 * send|queue email based in the time window
	 * @param {string} to - recipient address
	 * @param {string} content - mail content
	 * @param {string} subject - mail subject
	 * @return {Promise<{id: *, status: string}>} -
	 */
	async sendEmail({ to, content, subject }) {
		let emailDoc,
			status = EMAIL_STATUS.SENT;
		try {
			if (emailService.isEmailSendingWindowOn()) {
				// can send the mail right now, without queueing
				await emailService.sendEmail({ to, content, subject });
			} else {
				// its not the mail sending window, queue the mail to deliver in next email delivery window
				status = EMAIL_STATUS.QUEUED;
			}
			emailDoc = await emailDao.insertEmail({ to, content, subject, status });
			return {
				id: emailDoc._id,
				status,
			};
		} catch (err) {
			err.appendDetails(this.constructor.name, this.sendEmail.name);
			this.logError(err);
			status = EMAIL_STATUS.FAILED;
			try {
				emailDoc = await emailDao.insertEmail({ to, content, subject, status });
				return {
					id: emailDoc._id,
					status,
				};
			} catch (err) {
				err.appendDetails(this.constructor.name, this.post.name);
				throw err;
			}
		}
	}

	/**
	 * get email status
	 * @param {string} id - unique email id
	 * @return {Promise<{id, status}>} -
	 */
	async getEmailDeliveryStatusById({ id }) {
		try {
			const { _id, status } = await emailDao.getEmailById(id);
			return {
				id: _id,
				status,
			};
		} catch (err) {
			err.appendDetails(this.constructor.name, this.getEmailDeliveryStatusById.name);
			throw err;
		}
	}

	/**
	 * delete a mail in queued state
	 * @param {string} id - unique email id
	 * @return {Promise<{id: *, deleted: boolean}>} -
	 */
	async deleteQueuedEmailById({ id }) {
		try {
			await emailDao.updateEmail(
				{
					_id: id,
					status: EMAIL_STATUS.QUEUED,
				},
				{
					archived: true,
				}
			);
			return {
				id,
				deleted: true,
			};
		} catch (err) {
			err.appendDetails(this.constructor.name, this.deleteQueuedEmailById.name);
			throw err;
		}
	}
}

export default new EmailController();
