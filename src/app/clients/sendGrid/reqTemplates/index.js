/**
 * generate send mail request body in required format
 * @param {string} to - recipient address
 * @param {string} content - mail content
 * @param {string} subject - mail subject
 * @return {{personalizations: {to: {email: *, name: string}[], subject: *}[], content: {type: string, value: *}[], from: {email: string, name: string}}} -
 */
export const generateMailRequestBody = ({ to, content, subject }) => ({
	personalizations: [
		{
			to: [
				{
					email: to,
					name: 'Different Client',
				},
			],
			subject: subject,
		},
	],
	content: [
		{
			type: 'text/plain',
			value: content,
		},
	],
	from: {
		email: 'different@example.com',
		name: 'Different Team',
	},
});
