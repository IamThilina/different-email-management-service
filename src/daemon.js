// Core modules
import * as sourceMaps from "source-map-support";

// Helpers
import {loadConfigs} from './configs';
import {ENV} from './app/helpers/constants';

// Modules that need to be bootstrapped before application starts
import mongoDbConnector from './app/daos/mongo';
import cronJobManager from './app/crons';
import sendGridClient from './app/clients/sendGrid';

/**
 * All daemon services that should be instantiated before starting the https server, or that can be
 * initiated asynchronously will be initiated/instantiated here
 */
export default class Daemon {
	/**
	 * Instantiate and/or initiate daemon services that are required before starting the https server
	 * @returns {Promise} - task success
	 */
	static async initSyncServices() {
		try {
			await Daemon.enableSourceMaps();
			await Daemon.modifyErrorPrototype();
			await Daemon.loadConfigs();
			await Daemon.connectToMongoDB();
			return Promise.resolve();
		} catch (err) {
			return Promise.reject(err);
		}
	}

	/**
	 * Instantiate and/or initiate daemon services that run independent of the https server
	 */
	static initAsyncServices() {
		cronJobManager.init();
		sendGridClient.init();
	}

	/**
	 * Enable Source-map support in dev environments
	 * @returns {Promise} - promise
	 */
	static async enableSourceMaps() {
		if (process.env === ENV.DEV) {
			sourceMaps.install();
		}
		return Promise.resolve();
	}

	/**
	 * load env configs
	 */
	static async loadConfigs() {
		return loadConfigs();
	}

	/**
	 * connect with mongo db cluster
	 */
	static async connectToMongoDB() {
		return mongoDbConnector();
	}

	/**
	 * Appends additional details to the standard error object
	 * @param {string} [pathOverrider] - String to override the error propagation path
	 * @param {string} [causesOverrider] - String to override the error causes list
	 * @returns {Promise} - task success
	 */
	static modifyErrorPrototype(pathOverrider, causesOverrider) {
		return new Promise((resolve) => {
			/**
			 * @param {string} className - Name of the module in which the error was detected
			 * @param {string} method - Name of the module-method in which the error was detected
			 * @param {string} cause - More details about the cause of the error
			 */
			Error.prototype.appendDetails = function (className = "*NULL*", method = "*NULL*", cause = "*NULL*") {
				this.path = pathOverrider || (this.path || "#") + ` -> [${className}]|(${method})`;
				this.causes = causesOverrider || (this.causes || "#") + ` -> (${method})|${cause}`;
			};
			return resolve();
		});
	}
}
