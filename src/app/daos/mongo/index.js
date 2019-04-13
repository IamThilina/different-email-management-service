// d1##erent_u$er
// different
// mongodb://cake_shop:cake_shop@cake-shop-shard-00-00-0jzpd.mongodb.net:27017,cake-shop-shard-00-01-0jzpd.mongodb.net:27017,cake-shop-shard-00-02-0jzpd.mongodb.net:27017/cake_shop?ssl=true&replicaSet=Cake-Shop-shard-0&authSource=admin
// core modules
import mongoose from 'mongoose';

// helpers
import { definitions } from '../../../configs';

const generateMongoUrl = ({
	HOST_1: host_1,
	HOST_2: host_2,
	HOST_3: host_3,
	DB: db,
	USER: user,
	PASSWORD: password,
	CLUSTER: cluster,
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
