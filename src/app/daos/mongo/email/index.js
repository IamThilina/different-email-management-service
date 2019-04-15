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
		try {
			const email = new Email({ to, content, subject, status });
			return await email.save();
		} catch (err) {
			err.appendDetails(this.constructor.name, this.insertEmail.name);
			throw err;
		}
	}

	/**
	 * get email using email id
	 * @param {string} id - unique email id
	 * @return {Promise<void>} -
	 */
	async getEmailById(id) {
		try {
			return await Email.findById(id);
		} catch (err) {
			err.appendDetails(this.constructor.name, this.getEmailById.name);
			throw err;
		}
	}

	/**
	 * get emails matching the given fields & values
	 * @param {Object} matchFields - fields to be matched
	 * @return {Promise<void>} -
	 */
	async getEmailsByMatchingFields(matchFields) {
		try {
			return await Email.find(matchFields);
		} catch (err) {
			err.appendDetails(this.constructor.name, this.getEmailsByMatchingFields.name);
			throw err;
		}
	}

	/**
	 * update given fields of emails which match with given fields & values
	 * @param {Object} matchFields - fields to be matched
	 * @param {Object} updateFields - fields to updated
	 * @return {Promise<*>} -
	 */
	async updateEmail(matchFields, updateFields) {
		try {
			return await Email.updateOne(matchFields, updateFields);
		} catch (err) {
			err.appendDetails(this.constructor.name, this.updateEmail.name);
			throw err;
		}
	}
}

export default new EmailDao();
