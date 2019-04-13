import Email from './model';

/**
 * handle all data access tasks related email collection
 */
class EmailDao {
	/**
	 * create a new email document in email collection
	 * @param {string} to - recipient address
	 * @param {string} content - mail content
	 * @param {string} subject - mail subject
	 * @param {string} status - status of the mail delivery
	 * @return {Promise<void>} -
	 */
	async insertEmail({ to, content, subject, status }) {
		const email = new Email({ to, content, subject, status });
		return await email.save();
	}

	/**
	 * get email using email id
	 * @param {string} id - unique email id
	 * @return {Promise<void>} -
	 */
	async getEmailById(id) {
		try {
			const emails = await Email.findById(id);
			if (emails.length) {
				return emails[0];
			}
			throw new Error(`No email found for id: ${id}`);
		} catch (err) {
			throw err;
		}
	}

	/**
	 * archive the email of given id
	 * @param {string} id - unique email id
	 * @return {Promise<*>} -
	 */
	async deleteEmailById(id) {
		try {
			return await Email.update(
				{
					_id: id,
				},
				{
					archived: true,
				}
			);
		} catch (err) {
			throw err;
		}
	}
}

export default new EmailDao();
