import sendGridClient from '../../clients/sendGrid';

/**
 * handles fine granular business logic related to emails
 */
class EmailService {
	/**
	 * pass email details to configured email client
	 * @param {string} to - recipient address
	 * @param {string} content - mail content
	 * @param {string} subject - mail subject
	 * @return {Promise<void>} -
	 */
	async sendEmail({to, content, subject}) {
		return await sendGridClient.sendEmail({to, content, subject});
	}

	/**
	 * check whether the current time is wihin the email sending window
	 * @return {boolean} - email sending window on/off
	 */
	isEmailSendingWindowOn() {
		return true;
	}
}

export default new EmailService();
