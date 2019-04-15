jest.mock('../../../../configs');
jest.mock('../../../daos/mongo/email');
jest.mock('../../../services/email');

import Daemon from '../../../../daemon';
import emailController from '../index';
import emailDao from '../../../daos/mongo/email';
import emailService from '../../../services/email';

import { EMAIL_STATUS } from '../../../helpers/constants';
import {
	EMAIL_REQUEST,
	EMAIL_DELETE_RESPONSE,
	EMAIL_DELIVERY_STATUS_BY_DAO,
	EMAIL_DELIVERY_STATUS,
	EMAIL_DELIVERY_STATUS_ERROR,
	EMAIL_DOC,
	EMAIL_SENT_RESPONSE,
	EMAIL_QUEUED_RESPONSE,
	EMAIL_FAILED_RESPONSE,
	EMAIL_SEND_REQUEST_BODY
} from './mockdata';

let mockUpdateEmail = jest.fn(),
	mockGetEmailById = jest.fn(),
	mockIsEmailSendingWindowOn = jest.fn(),
	mockSendEmail = jest.fn(),
	mockInsertEmail = jest.fn();

describe('unit tests for EmailController', () => {
	beforeAll(async () => {
		await Daemon.modifyErrorPrototype();
	});
	beforeEach(() => {
		mockUpdateEmail.mockClear();
		mockGetEmailById.mockClear();
		mockInsertEmail.mockClear();
		mockIsEmailSendingWindowOn.mockClear();
		mockSendEmail.mockClear();
	});
	describe('unit test suite for sendEmail()', () => {
		test('successfully send the mail at that moment itself when the email sending time window is on', () => {
			mockIsEmailSendingWindowOn = jest.fn(() => true);
			mockSendEmail = jest.fn(() => Promise.resolve());
			mockInsertEmail = jest.fn(() => Promise.resolve(EMAIL_DOC));
			emailService.isEmailSendingWindowOn = mockIsEmailSendingWindowOn;
			emailService.sendEmail = mockSendEmail;
			emailDao.insertEmail = mockInsertEmail;
			expect(emailController.sendEmail(EMAIL_SEND_REQUEST_BODY)).resolves.toEqual(
				EMAIL_SENT_RESPONSE
			);
			expect(mockSendEmail).toHaveBeenCalledWith(EMAIL_SEND_REQUEST_BODY);
			expect(mockIsEmailSendingWindowOn).toHaveBeenCalledTimes(1);
		});
		test('successfully queue the mail to send later when the email sending time window is off', () => {
			mockIsEmailSendingWindowOn = jest.fn(() => false);
			mockSendEmail = jest.fn(() => Promise.reject());
			mockInsertEmail = jest.fn(() => Promise.resolve(EMAIL_DOC));
			emailService.isEmailSendingWindowOn = mockIsEmailSendingWindowOn;
			emailService.sendEmail = mockSendEmail;
			emailDao.insertEmail = mockInsertEmail;
			expect(emailController.sendEmail(EMAIL_SEND_REQUEST_BODY)).resolves.toEqual(
				EMAIL_QUEUED_RESPONSE
			);
			expect(mockSendEmail).toHaveBeenCalledTimes(0);
			expect(mockInsertEmail).toHaveBeenCalledWith({...EMAIL_SEND_REQUEST_BODY, status: EMAIL_STATUS.QUEUED});
			expect(mockIsEmailSendingWindowOn).toHaveBeenCalledTimes(1);
		});
		test('successfully save the mail to db when the email sending fails for any reason', () => {
			mockIsEmailSendingWindowOn = jest.fn(() => true);
			mockInsertEmail = jest.fn(() => Promise.resolve(EMAIL_DOC));
			emailService.isEmailSendingWindowOn = mockIsEmailSendingWindowOn;
			emailDao.insertEmail = mockInsertEmail;
			expect(emailController.sendEmail(EMAIL_SEND_REQUEST_BODY)).resolves.toEqual(
				EMAIL_FAILED_RESPONSE
			);
			expect(mockSendEmail).toHaveBeenCalledWith(EMAIL_SEND_REQUEST_BODY);
			expect(mockIsEmailSendingWindowOn).toHaveBeenCalledTimes(1);
		});
	});
	describe('unit test suite for getEmailDeliveryStatusById()', () => {
		test('returns expected response when requested email exist', () => {
			mockGetEmailById = jest.fn(() => Promise.resolve(EMAIL_DELIVERY_STATUS_BY_DAO));
			emailDao.getEmailById = mockGetEmailById;
			expect(emailController.getEmailDeliveryStatusById(EMAIL_REQUEST)).resolves.toEqual(
				EMAIL_DELIVERY_STATUS
			);
			expect(mockGetEmailById).toHaveBeenCalledWith(EMAIL_REQUEST.id);
		});
		test('returns meaningful error message when requested email does not exist', async () => {
			mockGetEmailById = jest.fn(() => Promise.resolve(null));
			emailDao.getEmailById = mockGetEmailById;
			expect(emailController.getEmailDeliveryStatusById(EMAIL_REQUEST)).rejects.toThrow(
				EMAIL_DELIVERY_STATUS_ERROR
			);
			expect(mockGetEmailById).toHaveBeenCalledWith(EMAIL_REQUEST.id);
		});
		test('returns error response when db operations fails', async () => {
			mockGetEmailById = jest.fn(() => Promise.reject(EMAIL_DELIVERY_STATUS_ERROR));
			emailDao.getEmailById = mockGetEmailById;
			expect(emailController.getEmailDeliveryStatusById(EMAIL_REQUEST)).rejects.toThrow(
				EMAIL_DELIVERY_STATUS_ERROR
			);
			expect(mockGetEmailById).toHaveBeenCalledWith(EMAIL_REQUEST.id);
		});
	});
	describe('unit test suite for deleteQueuedEmailById()', () => {
		test('returns expected response when requested email is deleted', () => {
			mockUpdateEmail = jest.fn(() => Promise.resolve({nModified: 1}));
			emailDao.updateEmail = mockUpdateEmail;
			expect(emailController.deleteQueuedEmailById(EMAIL_REQUEST)).resolves.toEqual(
				EMAIL_DELETE_RESPONSE
			);
			expect(mockUpdateEmail).toHaveBeenCalledWith(
				{
					_id: EMAIL_REQUEST.id,
					status: EMAIL_STATUS.QUEUED,
				},
				{
					archived: true,
				}
			);
		});
		test('returns meaningful error response when requested email is not eligible to delete', () => {
			mockUpdateEmail = jest.fn(() => Promise.resolve({nModified: 0}));
			emailDao.updateEmail = mockUpdateEmail;
			expect(emailController.deleteQueuedEmailById(EMAIL_REQUEST)).rejects.toThrow();
			expect(mockUpdateEmail).toHaveBeenCalledWith(
				{
					_id: EMAIL_REQUEST.id,
					status: EMAIL_STATUS.QUEUED,
				},
				{
					archived: true,
				}
			);
		});
		test('returns error response when db operation returns error response', () => {
			mockUpdateEmail = jest.fn(() => Promise.reject());
			emailDao.updateEmail = mockUpdateEmail;
			expect(emailController.deleteQueuedEmailById(EMAIL_REQUEST)).rejects.toThrow();
		});
	});
});
