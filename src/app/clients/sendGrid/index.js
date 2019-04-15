import axios from 'axios';

import { definitions } from '../../../configs';
import {generateMailRequestBody} from './reqTemplates';

/**
 * Client configured to communicate with SendGrid API
 */
class SendGridClient {
	/**
	 * initialize axios client specific to sendgrid
	 */
	init() {
		const { SEND_GRID_BASE_URL, SEND_GRID_API_KEY, SEND_GRID_TIMEOUT } = definitions;
		this.sendGridClient = axios.create({
			baseURL: SEND_GRID_BASE_URL,
			timeout: SEND_GRID_TIMEOUT,
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${SEND_GRID_API_KEY}`,
			},
		});
	}

	/**
	 * post email details to sendgrid api
	 * @param {string} to - recipient address
	 * @param {string} content - mail content
	 * @param {string} subject - mail subject
	 * @return {Promise<void>} -
	 */
	async sendEmail({ to, content, subject }) {
		return await this.post(
			definitions.SEND_GRID_MAIL_SEND_PATH,
			generateMailRequestBody({ to, content, subject })
		);
	}

	/**
	 * make a post request to sendgrid api using given data
	 * @param {string} url - sendgrid url path
	 * @param {Object} data - body of the request
	 * @return {Promise<void>} -
	 */
	async post(url, data) {
		try {
			return await this.sendGridClient.post(url, data);
		} catch (err) {
			err.appendDetails(this.constructor.name, this.post.name);
			throw err;
		}
	}
}

export default new SendGridClient();
