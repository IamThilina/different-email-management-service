// core modules
import mongoose from 'mongoose';

// helpers
import { definitions } from '../../../configs';
import logger from '../../../utils/logger';

const generateMongoUrl = ({
	MONGO_HOST_1: host_1,
	MONGO_HOST_2: host_2,
	MONGO_HOST_3: host_3,
	MONGO_DB: db,
	MONGO_USER: user,
	MONGO_PASSWORD: password,
	MONGO_CLUSTER: cluster,
}) => {
	if (!(host_1 && host_2 && host_3 && db && cluster)) {
		throw new Error('Details provided to establish the mongo connection are invalid');
	}

	let authString = '';

	if (user && password) {
		authString = `${user}:${password}@`;
	}

	return `mongodb://${authString}${host_1},${host_2},${host_3}/${db}?ssl=true&replicaSet=${cluster}&authSource=admin`;
};

export default async () => {
	const mongoURL = generateMongoUrl(definitions);
	mongoose
		.connect(
			mongoURL,
			{ useNewUrlParser: true }
		)
		.then(() => {
			logger.info(`Successfully established mongo connection to cluster: ${mongoURL}`);
		}, err => Promise.reject(err));
};
