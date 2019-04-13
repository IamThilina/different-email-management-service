import axios from 'axios';

import {definitions} from '../../../configs';

/**
 * Client configured to communicate with SendGrid API
 */
class SendGridClient {
	/**
	 * post email details to sendgrid api
	 * @param {string} to - recipient address
	 * @param {string} content - mail content
	 * @param {string} subject - mail subject
	 * @return {Promise<void>} -
	 */
	async sendEmail({to, content, subject}) {
		// TODO: axios
		return Promise.resolve();
	}
}

export default new SendGridClient();
