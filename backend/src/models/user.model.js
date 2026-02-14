import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    aadharImage: {
        type: String,
        default: null,
    },
    idCardImage: {
        type: String,
        default: null,
    },

    isApproved: {
        type: Boolean,
        default: false,
    },

    approvedAt: Date,

    qrToken: String,

    qrGeneratedAt: Date,
}, { timestamps: true });

export default mongoose.model('User', userSchema);