import mongoose from "mongoose";

const { Schema } = mongoose;
const roundSchema = new mongoose.Schema({
    roundNumber: {
        type: Number,
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    rules: [{
        type: String,
        trim: true,
    },
    ],

    roundDate: {
        type: Date,
    },
},
    { _id: false }
);

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },

    bannerImage: {
        type: String, // public URL
        required: true,
    },

    type: {
        type: String,
        enum: ["solo", "group"],
        required: true,
    },

    minTeamSize: {
        type: Number,
        default: 1,
    },

    maxTeamSize: {
        type: Number,
        default: 1,
    },

    rounds: [roundSchema],
    generalInstructions: [
        {
            type: String,
            trim: true,
        }
    ],
    isOnlineSubmission: {
        type: Boolean,
        default: false,
    },

    onlineSubmissionDeadline: {
        type: Date,
    },

    eventDate: {
        type: Date,
        required: true,
    },

    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society",
        required: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
},
    { timestamps: true }
);

const Event =
    mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
