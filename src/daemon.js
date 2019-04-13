// Core modules
import * as sourceMaps from "source-map-support";

// Helpers
import {loadConfigs} from './configs';
import {ENV} from './app/helpers/constants';

// Modules that need to be bootstrapped
import mongoDbConnector from './app/daos/mongo';

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
}
