import Team from "../models/team.model.js";
import Event from "../models/events.model.js";
import Participation from "../models/participation.model.js";

import { joinTeamSchema } from "../validators/event.validation.js";

export async function joinTeamController(req, res) {
    try {
        const { error, value } = joinTeamSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { teamCode } = value;
        const user = req.user;
        if (!teamCode) {
            return res.status(400).json({ success: false, message: "Team code required" });
        }

        if (user.status !== "approved") {
            return res.status(403).json({ success: false, message: "Account not approved" });
        }

        const team = await Team.findOne({ teamCode });

        if (!team) {
            return res.status(404).json({ success: false, message: "Invalid team code" });
        }
        if (team.isLocked || team.submitted) {
            return res.status(400).json({
                success: false,
                message: "Team is locked. Cannot join.",
            });
        }

        const event = await Event.findById(team.event);
        if (!event) {
            return res.status(404).json({ success: false, message: "Event not found" });
        }

        if (team.members.includes(user._id)) {
            return res.status(400).json({
                success: false,
                message: "Already part of this team",
            });
        }

        const existingParticipation = await Participation.findOne({
            user: user._id,
            event: event._id,
        });

        if (existingParticipation) {
            return res.status(400).json({
                success: false,
                message: "Already registered in this event",
            });
        }

        if (team.members.length >= event.maxTeamSize) {
            return res.status(400).json({
                success: false,
                message: "Team is full",
            });
        }

        team.members.push(user._id);
        await team.save();

        await Participation.create({
            user: user._id,
            event: event._id,
            team: team._id,
            status: "registered",
        });

        return res.json({
            success: true,
            message: "Joined team successfully",
        });
    } catch (error) {
        console.error("Error in joinTeamController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}