// core modules
import Decorator from '../../helpers/decorator';

// helpers

// dao


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
	sendEmail({ to, content, subject }) {
		return new Promise((resolve, reject) => {
			// TODO : send mail and store in db
			return resolve({
				id: "5c8820162d958994f71cbfa6",
				status: "QUEUED"
			});
		});
	}

	/**
	 * get email status
	 * @param {string} id - unique email id
	 * @return {Promise} - promise
	 */
	getEmailStatus({ id }) {
		return new Promise((resolve, reject) => {
			// TODO : get mail status from db
			return resolve({
				id: "5c8820162d958994f71cbfa6",
				status: "SENT"
			});
		});
	}

	/**
	 * delete a mail in queued state
	 * @param {string} id - unique email id
	 * @return {Promise} - promise
	 */
	deleteEmail({ id }) {
		return new Promise((resolve, reject) => {
			// TODO : delete mail if in queued state
			return resolve({
				id: "5c8820162d958994f71cbfa6",
				deleted: true
			});
		});
	}
}

export default new EmailController();
