import { CronJob } from 'cron';
import Decorator from '../../helpers/decorator';

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
class EmailCronJobManager extends Decorator {
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
			const emails = await emailDao.getEmailsByMatchingFields({
				status: EMAIL_STATUS.QUEUED,
				archived: false
			});
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
				}).catch((err) => {
					this.logger.info(`[EMAIL_CRON_JOB_MANAGER] Failed to send queued mail id: ${email._id}, Error: ${err.message}`);
				});
			});
		} catch (err) {
			throw err;
		}
	}
}

export default new EmailCronJobManager();
