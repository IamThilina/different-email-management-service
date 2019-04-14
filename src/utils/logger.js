// Core modules
import * as bunyan from 'bunyan';
import bformat from 'bunyan-format';

const log_stream = [];
log_stream.push({
	stream: bformat({ outputMode: 'short' }),
});

export const reqSerializer = ({ method, url, headers, body }) => ({
	method,
	url,
	headers,
	body,
});

export const resSerializer = ({ statusCode, statusMessage, body }) => ({
	statusCode,
	statusMessage,
	body,
});

export default bunyan.createLogger({
	name: 'different-api',
	src: false,
	streams: log_stream,
	'console-log': false,
	level: 'trace',
	serializers: {
		req: reqSerializer,
		res: resSerializer,
	},
});
