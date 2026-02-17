import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import Society from "../models/society.model.js";
import Admin from '../models/admin.model.js';
import Event from "../models/events.model.js";
import Participation from "../models/participation.model.js";
import Submission from "../models/submission.model.js";
import Team from "../models/team.model.js";
import { createSocietySchema } from '../validators/adminAuth.validator.js';
import { createEventSchema } from '../validators/event.validation.js';
import { nanoid } from "nanoid";
import { rejectUserSchema } from "../validators/admin.validotor.js";

export async function getSocietiesController(req, res) {
    try {
        const societies = await Society.find().select("-__v").lean();

        // For each society, attach its admin
        const societiesWithAdmins = await Promise.all(
            societies.map(async (society) => {
                const admin = await Admin.findOne({
                    society: society._id,
                    role: "society-admin",
                }).select("-password -__v");

                return {
                    ...society,
                    admin,
                };
            }),
        );

        return res.status(200).json({
            success: true,
            count: societiesWithAdmins.length,
            societies: societiesWithAdmins,
        });
    } catch (error) {
        console.error("Get Societies Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}
export async function createSocietyController(req, res) {
    try {
        // validate request body
        const { error, value } = createSocietySchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        const { societyName, description, adminName, adminEmail, adminPassword } = value;
        // check if society with the same name already exists
        const existingSociety = await Society.findOne({ name: societyName });
        if (existingSociety) {
            return res.status(400).json({
                success: false,
                message: "Society with this name already exists"
            });
        }
        // check if admin email is already registered
        const existingAdmin = await Admin.findOne({ email: value.adminEmail });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin with this email already exists"
            });
        }
        // create new society
        const newSociety = await Society.create({
            name: societyName,
            description: description,
        });
        // hash password for the new admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        // create new admin for the society
        const newAdmin = await Admin.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: "society-admin",
            society: newSociety._id,
        });
        return res.status(201).json({
			success: true,
			message: "Society and Society Head created successfully",
			society: {
				_id: newSociety._id,
				name: newSociety.name,
				description: newSociety.description,
				admin: {
					_id: newAdmin._id,
					name: newAdmin.name,
					email: newAdmin.email,
					role: newAdmin.role,
				},
			},
		});        // return success response with society details
    } catch (error) {
        console.error("Error in createSocietyController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
export async function createEventController(req, res) {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Banner image is required"
            });
        }

        // parse rounds and generalInstructions from JSON strings to arrays
        req.body.rounds = req.body.rounds ? JSON.parse(req.body.rounds) : [];
        req.body.generalInstructions = req.body.generalInstructions ? JSON.parse(req.body.generalInstructions) : [];

        if (req.body.minTeamSize) {
            req.body.minTeamSize = Number(req.body.minTeamSize);
        }

        if (req.body.maxTeamSize) {
            req.body.maxTeamSize = Number(req.body.maxTeamSize);
        }

        if (req.body.isOnlineSubmission !== undefined) {
            req.body.isOnlineSubmission = req.body.isOnlineSubmission === "true";
        }

        if (req.body.type === "solo") {
            req.body.minTeamSize = 1;
            req.body.maxTeamSize = 1;
        } else {
            req.body.minTeamSize = Number(req.body.minTeamSize);
            req.body.maxTeamSize = Number(req.body.maxTeamSize);
        }

        if (!req.body.isOnlineSubmission) {
            req.body.onlineSubmissionDeadline = undefined;
        }

        const { error, value } = createEventSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const bannerUrl = `${baseUrl}/${req.file.path.replace(/\\/g, "/")}`;

        const event = await Event.create({
            ...value,
            bannerImage: bannerUrl,
            society: req.admin.society,
            createdBy: req.admin._id,
        });

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            event,
        });

    } catch (error) {
        console.error("Error in createEventController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function deleteEventController(req, res) {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event ID"
            });
        }

        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }
        // ownership check

        if (event.society.toString() !== req.admin.society.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this event",
            });
        }

        await event.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        console.error("Error in deleteEventController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
export async function getSocietyEventsController(req, res) {
    try {
        const events = await Event.find({
            society: req.admin.society,
        })
            .select("-__v")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: events.length,
            events,
        });

    } catch (error) {
        console.error("Error in getSocietyEventsController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function getEventParticipantsController(req, res) {
  try {
    const { eventId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid event ID",
      });
    }

    const event = await Event.findById(eventId);
    if (!event || event.society.toString() !== req.admin.society.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const participations = await Participation.find({ event: eventId })
      .populate("user", "name email")
      .populate({
        path: "team",
        populate: { path: "members", select: "name email" },
      })
      .lean();

    const uniqueTeams = new Map();
    const soloParticipants = [];

    for (const p of participations) {
      // TEAM EVENT
      if (p.team) {
        if (!uniqueTeams.has(p.team._id.toString())) {
          uniqueTeams.set(p.team._id.toString(), p.team);
        }
      } 
      // SOLO EVENT
      else {
        soloParticipants.push(p.user);
      }
    }

    // Fetch all submissions at once (optimization)
    const submissions = await Submission.find({ event: eventId }).lean();
    const results = [];
    
    // Add solo users
    for (const user of soloParticipants) {
      const submission = submissions.find(
        (s) => s.submittedBy?.toString() === user._id.toString()
      );

      results.push({
        type: "solo",
        user,
        submission: submission || null,
      });
    }

    // Add unique teams
    for (const team of uniqueTeams.values()) {
      const submission = submissions.find(
        (s) => s.team?.toString() === team._id.toString()
      );

      results.push({
        type: "team",
        team,
        submission: submission || null,
      });
    }

    return res.status(200).json({
      success: true,
      participants: results,
    });

  } catch (err) {
    console.error("Error in getEventParticipantsController", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getPendingUsersController(req, res) {
    try {
        const users = await User.find()
        .select("-password")
        .sort({ createdAt: -1 });
        
        // Custom status priority
        const statusPriority = {
        pending: 1,
        approved: 2,
        rejected: 3,
        };

        const sortedUsers = users.sort((a, b) => {
        return statusPriority[a.status] - statusPriority[b.status];
        });

        return res.json({
        success: true,
        count: sortedUsers.length,
        users: sortedUsers,
        });
    } catch (err) {
        console.error("Error in getPendingUsersController", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

export async function approveUserController(req, res) {
    try {
        const { id } = req.params;
        // validate userid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.status === "approved") {
            return res.status(400).json({
                success: false,
                message: "User already approved",
            });
        }

        const qrToken = nanoid(40);

        user.status = "approved";
        user.rejectionReason = null;
        user.approvedAt = new Date();
        user.qrToken = qrToken;
        user.qrGeneratedAt = new Date();

        await user.save();

        return res.json({
            success: true,
            message: "User approved successfully",
            qrToken,
        });

    } catch (error) {
        console.error("Error in approveUserController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
export async function rejectUserController(req, res) {
    try {
        const { id } = req.params;
        const { error, value } = rejectUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID",
            });
        }
        const { reason } = value;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.status === "approved") {
            return res.status(400).json({
                success: false,
                message: "Approved user cannot be rejected directly",
            });
        }

        user.status = "rejected";
        user.rejectionReason = reason || "Application rejected";
        user.qrToken = null; // maybe jsut to be safe
        user.qrGeneratedAt = null;

        await user.save();

        return res.json({
            success: true,
            message: "User rejected successfully",
        });

    } catch (err) {
        console.error("Error in rejectUserController", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
