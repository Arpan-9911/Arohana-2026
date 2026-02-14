import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
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
    role: {
        type: String,
        enum: ['society-admin', 'super-admin'],
        default: 'society-admin',
        required: true,
    },
    society:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Society',
        default: null,
    }
}, { timestamps: true });

export default mongoose.model('Admin', adminSchema,"admins");