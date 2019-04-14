import momentTimeZone from 'moment-timezone';

import sendGridClient from '../../clients/sendGrid';

import { definitions } from '../../../configs';

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
	async sendEmail({ to, content, subject }) {
		try {
			return await sendGridClient.sendEmail({ to, content, subject });
		} catch (err) {
			err.appendDetails(this.constructor.name, this.sendEmail.name);
			throw err;
		}
	}

	/**
	 * check whether the current time is wihin the email sending window
	 * @return {boolean} - email sending window on/off
	 */
	isEmailSendingWindowOn() {
		const {
				EMAIL_DELIVERY_START_HOUR,
				EMAIL_DELIVERY_END_HOUR,
				EMAIL_DELIVERY_TIME_ZONE,
			} = definitions,
			currentHourInSydney = Number(
				momentTimeZone()
					.tz(EMAIL_DELIVERY_TIME_ZONE)
					.format('H')
			);
		return (
			Number(EMAIL_DELIVERY_START_HOUR) < currentHourInSydney &&
			currentHourInSydney < Number(EMAIL_DELIVERY_END_HOUR)
		);
	}
}

export default new EmailService();
