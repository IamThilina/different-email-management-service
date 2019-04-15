export const EMAIL_REQUEST_BODY = {
	to: 'xyz@example.com',
	content: 'Hello world!',
	subject: 'Welcome',
};

export const GENERATED_EMAIL_REQUEST_BODY = {
	personalizations: [
		{
			to: [
				{
					email: EMAIL_REQUEST_BODY.to,
					name: 'Different Client',
				},
			],
			subject: EMAIL_REQUEST_BODY.subject,
		},
	],
	content: [
		{
			type: 'text/plain',
			value: EMAIL_REQUEST_BODY.content,
		},
	],
	from: {
		email: 'different@example.com',
		name: 'Different Team',
	},
};

export const SEND_GRID_POST_SUCCESS = {
	SUCCESS: true,
};

export const SEND_GRID_POST_REQ = {
	url: '/some/end-point',
	data: {},
};

export const SEND_GRID_POST_ERROR = new Error('failed to post the mail');

export const SEND_GRID_BASE_URL = 'https://send-grid-api';
export const SEND_GRID_API_KEY = 'api-key';
export const SEND_GRID_TIMEOUT = 1000;
export const SEND_GRID_CLIENT_HEADERS = {
	authorization: `Bearer ${SEND_GRID_API_KEY}`,
};
