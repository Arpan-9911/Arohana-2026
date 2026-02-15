import mongoose from "mongoose";

const { Schema } = mongoose;

const roundSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    instruction: {
      type: String,
      trim: true
    },
    rule: [
      {
        type: String,
        trim: true
      }
    ]
  },
  { _id: false }
);

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    society: {
      type: Schema.Types.ObjectId,
      ref: "Society",
      required: true
    },

    type: {
      type: String,
      enum: ["solo", "group"],
      required: true,
      lowercase: true,
      trim: true
    },

    minTeamSize: {
      type: Number,
      min: 1,
      validate: {
        validator: function (value) {
          if (this.type === "group") return value != null;
          return true;
        },
        message: "minTeamSize required for group events"
      }
    },

    maxTeamSize: {
      type: Number,
      validate: {
        validator: function (value) {
          if (this.type === "group") {
            return value != null && value >= this.minTeamSize;
          }
          return true;
        },
        message: "maxTeamSize must be >= minTeamSize for group events"
      }
    },

    time: {
      type: String,
      required: true
    },

    date: {
      type: Date,
      required: true
    },

    venue: {
      type: String,
      required: true,
      trim: true
    },

    desc: {
      type: String,
      trim: true
    },

    eventImg: {
      type: String
    },

    generalRule: [
      {
        type: String,
        trim: true
      }
    ],

    rounds: {
      type: [roundSchema],
      default: []
    },

    isOnlineSubmission: {
      type: Boolean,
      default: false
    },

    onlineSubmissionDealine: {
      type: Date,
      validate: {
        validator: function (value) {
          if (this.isOnlineSubmission) return value != null;
          return true;
        },
        message: "Deadline required if online submission is enabled"
      }
    }
  },
  {
    timestamps: true
  }
);

const Event =
  mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
