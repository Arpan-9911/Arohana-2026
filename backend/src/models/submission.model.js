import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },

        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
            default: null, // null for solo
        },

        submittedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        url: {
            type: String,
            required: true,
            trim: true,
        },

        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

submissionSchema.index(
    { team: 1 },
    { unique: true, sparse: true }
);

submissionSchema.index(
    { event: 1, submittedBy: 1 },
    { unique: true, sparse: true }
);

export default mongoose.model("Submission", submissionSchema);