import Joi from 'joi';

export default Joi.object()
	.keys({
		APP: Joi.string()
			.strict()
			.required(),
		HOST: Joi.string()
			.strict()
			.required(),
		PORT: Joi.string()
			.strict()
			.required(),
	})
	.required();
