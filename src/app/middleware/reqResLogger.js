import logger, {reqSerializer, resSerializer} from '../../utils/logger';

export const reqLogger = (req, res, next) => {
	logger.info(`[REQUEST-${req.id}] - ${JSON.stringify(reqSerializer(req))}`);
	next();
};

export const resLogger = (body, req, res) => {
	logger.info(`[RESPONSE-${req.id}] - ${JSON.stringify(resSerializer({
		...res,
		body
	}))}`);
};
