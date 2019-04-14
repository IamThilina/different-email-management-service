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
		this.logger.info('Email Cron Jobs Initiated Successfully');
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
				archived: false,
			});
			emails.forEach(email => {
				emailService
					.sendEmail(email)
					.then(() => {
						emailDao.updateEmail(
							{
								_id: email._id,
							},
							{
								status: EMAIL_STATUS.SENT,
							}
						);
					})
					.catch(err => {
						err.appendDetails(this.constructor.name, this.sendQueuedEmailsOnDeliveryWindow.name);
						this.logError(err);
					});
			});
		} catch (err) {
			err.appendDetails(this.constructor.name, this.sendQueuedEmailsOnDeliveryWindow.name);
			this.logError(err);
		}
	}
}

export default new EmailCronJobManager();
