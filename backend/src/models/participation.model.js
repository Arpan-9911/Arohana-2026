import mongoose from "mongoose";

const participationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },

    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null, // null for solo events
    },

    status: {
        type: String,
        enum: ["registered", "submitted"],
        default: "registered",
    },
},
    { timestamps: true }
);

participationSchema.index(
    { user: 1, event: 1 },
    { unique: true }
);

export default mongoose.model("Participation", participationSchema);