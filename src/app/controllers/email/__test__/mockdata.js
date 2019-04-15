import { EMAIL_STATUS } from '../../../helpers/constants';

export const EMAIL_REQUEST = {
	id: '5cb2b89222e0dc7444bb3d20',
};

export const EMAIL_DELETE_RESPONSE = {
	id: EMAIL_REQUEST.id,
	deleted: true,
};

export const EMAIL_DELIVERY_STATUS_BY_DAO = {
	_id: EMAIL_REQUEST.id,
	status: EMAIL_STATUS.QUEUED,
};

export const EMAIL_DELIVERY_STATUS = {
	id: EMAIL_REQUEST.id,
	status: EMAIL_STATUS.QUEUED,
};

export const EMAIL_DELIVERY_STATUS_ERROR = new Error('No email found for id: 5cb2b89222e0dc7444bb3d20');

export const EMAIL_DOC = {
	_id: '5cb2b89222e0dc7444bb3d30',
};

export const EMAIL_SENT_RESPONSE = {
	id: EMAIL_DOC._id,
	status: EMAIL_STATUS.SENT,
};

export const EMAIL_QUEUED_RESPONSE = {
	id: EMAIL_DOC._id,
	status: EMAIL_STATUS.SENT,
};

export const EMAIL_FAILED_RESPONSE = {
	id: EMAIL_DOC._id,
	status: EMAIL_STATUS.FAILED,
};

export const EMAIL_SEND_REQUEST_BODY = {
	to: 'xyz@example.com',
	content: 'Hello world!',
	subject: 'Welcome',
};
