// Core modules
import * as bunyan from 'bunyan';
import bformat from 'bunyan-format';

const log_stream = [];
//Format the bunyan logger
log_stream.push({
	stream: bformat({ outputMode: 'short' }),
});

export default bunyan.createLogger({
	name: 'different-api',
	src: false,
	streams: log_stream,
	'console-log': false,
	level: 'trace',
});
