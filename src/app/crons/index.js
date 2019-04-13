// other cron job managers
import EmailCronJobManager from './email';

/**
 * Init and control all cron job managers
 */
class CronJobManager {
	/**
	 * init all other cron job managers
	 */
	init() {
		EmailCronJobManager.init();
	}
}

export default new CronJobManager();
