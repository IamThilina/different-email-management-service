import Joi from 'joi';

export const POST_EMAIL_BODY_SPEC = Joi.object().keys({
	to: Joi.string()
		.email()
		.required(),
	content: Joi.string()
		.required(),
	subject: Joi.string()
		.required()
});

export const GET_EMAIL_STATUS_PATH_SPEC = Joi.object().keys({
	id: Joi.string()
		.required()
});

export const DELETE_EMAIL_PATH_SPEC = Joi.object().keys({
	id: Joi.string()
		.required()
});
