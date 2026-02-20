import mongoose from "mongoose";
import Event from "../models/events.model.js";
import {createTeamSchema, submissionSchema, updateEventSchema} from "../validators/event.validation.js";
import Team from "../models/team.model.js";
import Participation from "../models/participation.model.js";
import generateTeamCode from "../utils/generateTeamCode.js";
import Submission from "../models/submission.model.js";

export async function getAllEventsController(req, res) {
    try {
        const events = await Event.find()
            .select("_id title description bannerImage eventDate location society type") // Include society for filtering
            .populate("society", "name")
            .sort({eventDate: 1}); // Chronological order

        return res.status(200).json({
            success: true,
            count: events.length,
            events,
        });
    } catch (error) {
        console.error("Error in getAllEventsController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function getEventByIdController(req, res) {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event ID",
            });
        }

        const event = await Event.findById(id)
            .select("-__v")
            .populate("society", "name");

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        return res.status(200).json({
            success: true,
            event,
        });
    } catch (error) {
        console.error("Error in getEventByIdController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function participateSoloController(req, res) {
    try {
        const {eventId} = req.params;
        const user = req.user;

        // valid eventId
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                success: false,
                message: "Event Id is not valid",
            })
        }

        // user approved ?
        if (user.status !== "approved") {
            return res.status(403).json({success: false, message: "Your application is not Approved"});
        }
        // events exists ?
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // solo event

        if (event.type !== "solo") {
            return res.status(400).json({
                success: false,
                message: "This event requires a team"
            });
        }

        const alreadyParticipated = await Participation.findOne({
            user: user._id,
            event: eventId,
        });

        if (alreadyParticipated) {
            return res.status(400).json({
                success: false,
                message: "You have already participated in this event",
            });
        }

        await Participation.create({
            user: user._id,
            event: eventId,
            team: null,
            status: "registered",
        });
        return res.status(200).json({
            success: true,
            message: "Successfully registered for the event",
        });
    } catch (error) {
        console.error("Error in participateSoloController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function createTeamController(req, res) {
    try {
        const {eventId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                success: false,
                message: "Event Id is not valid",
            })
        }
        // validation for req.body
        const {error, value} = createTeamSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const {name} = value;
        const user = req.user

        if (user.status !== "approved") {
            return res.status(403).json({success: false, message: "Account not approved"});
        }

        const event = await Event.findById(eventId);
        if (!event || event.type !== "group") {
            return res.status(400).json({success: false, message: "Invalid group event"});
        }

        if (!event.isOnlineSubmission && event.type === "group") {
        }

        const existingParticipation = await Participation.findOne({
            user: user._id,
            event: eventId,
        });
        if (existingParticipation) {
            return res.status(400).json({
                success: false,
                message: "Already registered in this event",
            });
        }
        // team code pattern(/^[A-Z0-9]+$/)
        const teamCode = generateTeamCode();

        const team = await Team.create({
            name,
            teamCode,
            event: eventId,
            leader: user._id,
            members: [user._id],
            submitted: false,
            isLocked: false,
        });

        await Participation.create({
            user: user._id,
            event: eventId,
            team: team._id,
            status: "registered",
        });
        return res.status(201).json({
            success: true,
            message: "Team created successfully",
            team: {
                id: team._id,
                name: team.name,
                teamCode: team.teamCode,
                event: team.event,
                members: team.members,
            },
        });
    } catch (err) {
        console.log(err)
        if (err.code === 11000) {
            if (err.keyPattern?.teamCode) {
                return res.status(400).json({
                    success: false,
                    message: "Team code collision, retry"
                });
            }
            if (err.keyPattern?.event && err.keyPattern?.name) {
                return res.status(400).json({
                    success: false,
                    message: "Team name already exists in this event"
                });
            }
            return res.status(400).json({
                success: false,
                message: "Duplicate value error"
            });
        }
        console.error("Error in createTeamController", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function submitController(req, res) {
    try {
        const {eventId} = req.params;
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({
                success: false,
                message: "Event Id is not valid",
            })
        }
        const user = req.user;

        const {error, value} = submissionSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const {url} = value;

        if (user.status !== "approved") {
            return res.status(403).json({
                success: false,
                message: "Account not approved",
            });
        }
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }
        if (!event.isOnlineSubmission) {
            return res.status(400).json({
                success: false,
                message: "Online submission not allowed for this event",
            });
        }
        if (event.onlineSubmissionDeadline < new Date()) {
            return res.status(400).json({
                success: false,
                message: "Submission deadline has passed",
            });
        }
        const participation = await Participation.findOne({
            user: user._id,
            event: eventId,
        });

        if (!participation) {
            return res.status(400).json({
                success: false,
                message: "You have not participated in this event",
            });
        }

        /**
         *  solo submission
         */
        if (!participation.team && event.type === "solo") {
            const existingSubmission = await Submission.findOne({
                event: eventId,
                submittedBy: user._id,
            });

            if (existingSubmission) {
                return res.status(400).json({
                    success: false,
                    message: "Already submitted",
                });
            }

            await Submission.create({
                event: eventId,
                team: null,
                submittedBy: user._id,
                url,
            });

            participation.status = "submitted";
            await participation.save();

            return res.json({
                success: true,
                message: "Submission successful",
            });
        }

        /**
         * Group submission
         */
        const team = await Team.findById(participation.team);

        if (!team) {
            return res.status(400).json({
                success: false,
                message: "Team not found",
            });
        }

        if (!team.members.some(
            member => member.toString() === user._id.toString()
        )) {
            return res.status(403).json({
                success: false,
                message: "You are not part of this team",
            });
        }

        if (team.submitted) {
            return res.status(400).json({
                success: false,
                message: "Team has already submitted",
            });
        }

        if (team.members.length < event.minTeamSize) {
            return res.status(400).json({
                success: false,
                message: "Minimum team size not reached",
            });
        }
        await Submission.create({
            event: eventId,
            team: team._id,
            submittedBy: user._id,
            url,
        });

        // Lock team
        team.submitted = true;
        team.isLocked = true;
        await team.save();

        await Participation.updateMany(
            {team: team._id},
            {status: "submitted"}
        );

        return res.status(201).json({
            success: true,
            message: "Team submission successful",
        });
    } catch (error) {
        console.error("Error in submitController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function updateEventController(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event ID",
            });
        }

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        // Authorization
        if (
            req.admin.role !== "super-admin" &&
            event.society.toString() !== req.admin.society.toString()
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to edit this event",
            });
        }
        const body = { ...req.body };

        // Parse arrays if coming as JSON strings
        try {
            if (body.rounds && typeof body.rounds === "string") {
                body.rounds = JSON.parse(body.rounds);
            }

            if (
                body.generalInstructions &&
                typeof body.generalInstructions === "string"
            ) {
                body.generalInstructions = JSON.parse(body.generalInstructions);
            }
        }catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid JSON format please try again",
            });
        }

        if (body.minTeamSize !== undefined) {
            body.minTeamSize = Number(body.minTeamSize);
        }
        if (body.maxTeamSize !== undefined) {
            body.maxTeamSize = Number(body.maxTeamSize);
        }
        if (body.isOnlineSubmission !== undefined) {
            body.isOnlineSubmission =
                body.isOnlineSubmission === "true" ||
                body.isOnlineSubmission === true;
        }
        // Remove onlineSubmissionDeadline if submission disabled
        if (body.isOnlineSubmission === false) {
            body.onlineSubmissionDeadline = undefined;
        }

        const { error, value } = updateEventSchema.validate(body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const participationExists = await Participation.exists({
            event: event._id,
        });

        if (
            participationExists &&
            value.type &&
            value.type !== event.type
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Cannot change event type after users have participated",
            });
        }

        // Prevent reducing maxTeamSize below existing team size
        if (value.maxTeamSize) {
            const teams = await Team.find({ event: event._id });

            for (let team of teams) {
                if (team.members.length > value.maxTeamSize) {
                    return res.status(400).json({
                        success: false,
                        message:
                            "Cannot reduce maxTeamSize below current team size",
                    });
                }
            }
        }
        Object.assign(event, value);

        // Banner update
        if (req.file) {
            const baseUrl = `${req.protocol}://${req.get("host")}`;
            event.bannerImage = `${baseUrl}/${req.file.path.replace(/\\/g, "/")}`;
        }

        await event.save();

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
            event,
        });

    } catch (error) {
        console.error("Error in updateEventController:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}