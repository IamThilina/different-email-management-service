jest.mock('moment-timezone');
jest.mock('../../../../configs');
jest.mock('../../../clients/sendGrid');

import momentTimeZone from 'moment-timezone';
import Daemon from '../../../../daemon';
import emailService from '../index';
import sendGridClient from '../../../clients/sendGrid';

import {
	EMAIL_REQUEST_BODY,
	EMAIL_DELIVERY_TIME_ZONE,
	EMAIL_SENDING_WINDOW_ON,
	EMAIL_SENDING_WINDOW_OFF,
} from './mockdata';

let mockSendMail = jest.fn();

describe('unit tests for EmailService', () => {
	beforeAll(async () => {
		await Daemon.modifyErrorPrototype();
	});
	beforeEach(() => {
		momentTimeZone.mockClear();
		mockSendMail.mockClear();
	});
	describe('unit test suite for sendMail()', () => {
		test('returns success response when sendgrid client returns success response', () => {
			mockSendMail = jest.fn(() => Promise.resolve());
			sendGridClient.sendEmail = mockSendMail;
			expect(emailService.sendEmail(EMAIL_REQUEST_BODY)).resolves.toBe();
		});
		test('returns error response when sendgrid client returns error response', () => {
			mockSendMail = jest.fn(() => Promise.reject());
			sendGridClient.sendEmail = mockSendMail;
			expect(emailService.sendEmail(EMAIL_REQUEST_BODY)).rejects.toThrow();
		});
	});
	describe('unit test suite for isEmailSendingWindowOn()', () => {
		test('returns true when current time overlaps with email sending time window', () => {
			const format = jest.fn().mockReturnValue(EMAIL_SENDING_WINDOW_ON),
				tz = jest.fn().mockReturnValue({format});
			momentTimeZone.mockReturnValue({ tz });
			expect(emailService.isEmailSendingWindowOn()).toBe(true);
			expect(tz).toHaveBeenCalledWith(EMAIL_DELIVERY_TIME_ZONE);
		});
		test('returns error response when sendgrid client returns error response', () => {
			const format = jest.fn().mockReturnValue(EMAIL_SENDING_WINDOW_OFF),
				tz = jest.fn().mockReturnValue({format});
			momentTimeZone.mockReturnValue({ tz });
			expect(emailService.isEmailSendingWindowOn()).toBe(false);
			expect(tz).toHaveBeenCalledWith(EMAIL_DELIVERY_TIME_ZONE);
		});
	});
});
