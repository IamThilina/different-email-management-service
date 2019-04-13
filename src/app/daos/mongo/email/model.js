import mongoose, {Schema} from 'mongoose';
import {EMAIL_STATUS} from '../../../helpers/constants';

export default mongoose.model('emails', new Schema({
	to: String,
	content: String,
	subject: String,
	status: {
		type: String,
		enum: [EMAIL_STATUS.SENT, EMAIL_STATUS.QUEUED, EMAIL_STATUS.FAILED]
	},
	archived: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt'
	}
}));
