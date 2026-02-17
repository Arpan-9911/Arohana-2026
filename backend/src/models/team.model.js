import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    teamCode: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },

    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    submitted: {
        type: Boolean,
        default: false,
    },

    isLocked: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

teamSchema.index(
    { event: 1, name: 1 },
    { unique: true }
);

export default mongoose.model("Team", teamSchema);