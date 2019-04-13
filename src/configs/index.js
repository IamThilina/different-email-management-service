import Joi from 'joi';
import configSchema from './schema';

const throwError = err => {
	if (err) {
		throw new Error(
			`Environment validation failed. \nDetails - ${JSON.stringify(
				err.message || 'not found'
			)}`
		);
	}
};

export let definitions = {};

export const loadConfigs = async () => {
	const { NODE_ENV } = process.env;

	if (typeof NODE_ENV === 'undefined') {
		throwError(new Error('NODE_ENV must be defined'));
	} else {
		const result = require('dotenv').config();
		if (result.error) {
			throwError(new Error('Failed to load env variables'));
		} else {
			definitions = result.parsed;
			Joi.validate(definitions, configSchema, { allowUnknown: true }, throwError);
		}
	}
	return Promise.resolve();
};
