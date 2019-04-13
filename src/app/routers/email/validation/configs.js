import { POST_EMAIL_BODY_SPEC, GET_EMAIL_STATUS_PATH_SPEC, DELETE_EMAIL_PATH_SPEC } from './specs';

export default {
	sendErrorResponse: true,
	specs: {
		POST: {
			'/': {
				body: POST_EMAIL_BODY_SPEC,
			},
		},
		GET: {
			'/:id': {
				path: GET_EMAIL_STATUS_PATH_SPEC,
			},
		},
		DELETE: {
			'/:id': {
				path: DELETE_EMAIL_PATH_SPEC,
			},
		},
	},
};
