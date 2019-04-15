/**
 * handle all error scenarios related email business logic
 */
class EmailErrorHandler {
	/**
	 * handle no matching email found to for delete operation scenario
	 * @param {string} id - email uuid
	 */
	handleNoMatchingEmailToDelete(id) {
		throw new Error(`Given email id: ${id} is not eligible to delete`);
	}
	/**
	 * handle no matching email found to for get status operation scenario
	 * @param {string} id - email uuid
	 */
	handleNoMatchingEmailToGetStatus(id) {
		throw new Error(`No email found for id: ${id}`);
	}
}

export default new EmailErrorHandler();
