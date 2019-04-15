import {generateMailRequestBody} from '../index';

import { EMAIL_REQUEST_BODY, GENERATED_EMAIL_REQUEST_BODY } from '../../__test__/mockdata';

describe('unit tests for SendGrid Req Template Generator', () => {
	describe('unit test suite for generateMailRequestBody()', () => {
		test('returns post request body in expected format when required fields are provided', () => {
			expect(generateMailRequestBody(EMAIL_REQUEST_BODY)).toEqual(
				GENERATED_EMAIL_REQUEST_BODY
			);
		});
	});
});
