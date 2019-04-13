// d1##erent_u$er
// different
// mongodb://cake_shop:cake_shop@cake-shop-shard-00-00-0jzpd.mongodb.net:27017,cake-shop-shard-00-01-0jzpd.mongodb.net:27017,cake-shop-shard-00-02-0jzpd.mongodb.net:27017/cake_shop?ssl=true&replicaSet=Cake-Shop-shard-0&authSource=admin
// core modules
import mongoose from 'mongoose';

// helpers
import { definitions } from '../../../configs';

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
		.then(() => Promise.resolve(), err => Promise.reject(err));
};
