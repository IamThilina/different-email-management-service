import logger from '../../utils/logger';

/**
 * Decorator class with reusable utils embedded to be extended by all other modules
 */
export default class Decorator {
	/**
	 * @returns {object | null} - Decorated instance
	 * @constructor
	 */
	constructor() {
		const _this = this;
		_this.logger = logger;
		return _this;
	}

	/**
	 * Logs given error in a readable format
	 * @param {object} err - instance of Error object
	 */
	logError(err) {
		this.logger.error(`Error: ${err.message}\nPath: ${err.path}\nCauses: ${err.causes}`);
	}
}
