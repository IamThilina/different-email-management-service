jest.mock('../../../../configs');

import Daemon from '../../../../daemon';
import sendGridClient from '../index';

import {
	EMAIL_REQUEST_BODY,
	SEND_GRID_POST_REQ,
	SEND_GRID_POST_SUCCESS,
	SEND_GRID_POST_ERROR,
	SEND_GRID_BASE_URL,
	SEND_GRID_CLIENT_HEADERS,
	SEND_GRID_TIMEOUT,
} from './mockdata';

describe('unit tests for SendGrid client', () => {
	beforeAll(async ()=>{
		await Daemon.modifyErrorPrototype();
	});
	describe('unit test suite for post()', () => {
		test('returns success response when successfully make a post request to SendGrid API', () => {
			sendGridClient.init();
			const post = jest.fn().mockReturnValue(SEND_GRID_POST_SUCCESS);
			sendGridClient.sendGridClient = jest.fn().mockReturnValue({ post });
			expect(
				sendGridClient.post(SEND_GRID_POST_REQ.url, SEND_GRID_POST_REQ.data)
			).resolves.toBe(SEND_GRID_POST_SUCCESS);
		});
	});
	describe('unit test suite for sendEmail()', () => {
		test('returns success response when post() returns success response', async () => {
			sendGridClient.post = jest
				.fn()
				.mockReturnValue(Promise.resolve(SEND_GRID_POST_SUCCESS));
			await expect(sendGridClient.sendEmail(EMAIL_REQUEST_BODY)).resolves.toBe(
				SEND_GRID_POST_SUCCESS
			);
		});
		test('returns error response when post() returns error response', async () => {
			sendGridClient.post = jest.fn().mockReturnValue(Promise.reject(SEND_GRID_POST_ERROR));
			await expect(sendGridClient.sendEmail(EMAIL_REQUEST_BODY)).rejects.toThrow(
				SEND_GRID_POST_ERROR
			);
		});
	});
	describe('unit test suite for init()', () => {
		test('init a specific axios instance for SnedGrid API', () => {
			sendGridClient.init();
			expect(sendGridClient.sendGridClient.defaults.baseURL).toBe(SEND_GRID_BASE_URL);
			expect(sendGridClient.sendGridClient.defaults.headers.authorization).toBe(
				SEND_GRID_CLIENT_HEADERS.authorization
			);
			expect(sendGridClient.sendGridClient.defaults.timeout).toBe(SEND_GRID_TIMEOUT);
		});
	});
});
