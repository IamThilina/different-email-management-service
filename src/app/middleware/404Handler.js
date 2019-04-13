// Helpers
import {NOT_FOUND} from '../helpers/constants';

/**
 * Catch 404 and forward to error handler
 * @param {object} req - HTTP request
 * @param {object} res - HTTP response
 * @param {function} next - call to next middleware
 */
export default function middleware(req, res, next) {
    const err = new Error('Resource Not Found');
    err.status = NOT_FOUND;
    next(err);
}
