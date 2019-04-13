// core modules
import Decorator from '../../helpers/decorator';

// services
import emailService from '../../services/email';

// daos
import emailDao from '../../daos/mongo/email';

// helpers
import {EMAIL_STATUS} from '../../helpers/constants';


/**
 * handles business logic related to emails
 */
class EmailController extends Decorator {

	/**
	 * send email
	 * @param {string} to - recipient address
	 * @param {string} content - mail content
	 * @param {string} subject - mail subject
	 * @return {Promise} - promise
	 */
	async sendEmail({ to, content, subject }) {
		try {
			let emailDoc,
				status = EMAIL_STATUS.SENT;
			if(emailService.isEmailSendingWindowOn()) { // can send the mail right now, without queueing
				await emailService.sendEmail({to, content, subject});
				emailDoc = await emailDao.insertEmail({to, content, subject, status});
			} else { // its not the mail sending window, queue the mail to deliver in next email delivery window
				status = EMAIL_STATUS.QUEUED;
				emailDoc = await emailDao.insertEmail({to, content, subject, status});
			}
			return {
				id: emailDoc._id,
				status
			};
		} catch (err) {
			throw err;
		}
	}

	/**
	 * get email status
	 * @param {string} id - unique email id
	 * @return {Promise} - promise
	 */
	async getEmailDeliveryStatusById({ id }) {
		try {
			const {_id, status} = await emailDao.getEmailById(id);
			return {
				id: _id,
				status
			};
		} catch (err) {
			throw err;
		}
	}

	/**
	 * delete a mail in queued state
	 * @param {string} id - unique email id
	 * @return {Promise} - promise
	 */
	async deleteEmailById({ id }) {
		try {
			await emailDao.deleteEmailById(id);
			return {
				id,
				deleted: true
			};
		} catch (err) {
			throw err;
		}
	}
}

export default new EmailController();
