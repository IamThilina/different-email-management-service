import { CronJob } from 'cron';

// services
import emailService from '../../services/email';

// daos
import emailDao from '../../daos/mongo/email';

// helpers
import { EMAIL_STATUS } from '../../helpers/constants';
import { definitions } from '../../../configs';

/**
 * Init and control all cron jobs related to emails
 */
class EmailCronJobManager {
	/**
	 * init all cron jobs related to emails
	 */
	init() {
		const { CRON_EMAIL_DELIVERY, EMAIL_DELIVERY_TIME_ZONE } = definitions;
		const job = new CronJob(
			CRON_EMAIL_DELIVERY,
			this.sendQueuedEmailsOnDeliveryWindow,
			null,
			true,
			EMAIL_DELIVERY_TIME_ZONE
		);
		job.start();
	}

	/**
	 * read queued emails from mongo and try to deliver them
	 * update status of delivered mails
	 * @return {Promise<void>} -
	 */
	async sendQueuedEmailsOnDeliveryWindow() {
		try {
			const emails = await emailDao.getEmailsByStatus(EMAIL_STATUS.QUEUED);
			emails.forEach(email => {
				emailService.sendEmail(email).then(() => {
					emailDao.updateEmail(
						{
							_id: email._id,
						},
						{
							status: EMAIL_STATUS.SENT,
						}
					);
				});
			});
		} catch (err) {
			throw err;
		}
	}
}

export default new EmailCronJobManager();
