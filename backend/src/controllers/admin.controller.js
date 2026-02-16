import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import Society from "../models/society.model.js";
import Admin from '../models/admin.model.js';
import Event from "../models/events.model.js";
import { createSocietySchema } from '../validators/adminAuth.validator.js';
import { createEventSchema } from '../validators/event.validation.js';

export async function createSocietyController(req, res) {
    try {
        // validate request body
        const { error, value } = createSocietySchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        const { societyName, description, adminName, adminEmail, adminPassword } = value;
        // check if society with the same name already exists
        const existingSociety = await Society.findOne({ name: societyName });
        if (existingSociety) {
            return res.status(400).json({
                message: "Society with this name already exists"
            });
        }
        // check if admin email is already registered
        const existingAdmin = await Admin.findOne({ email: value.adminEmail });
        if (existingAdmin) {
            return res.status(400).json({
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
                id: newSociety._id,
                name: newSociety.name,
            },
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
            },
        });        // return success response with society details
    } catch (error) {
        console.error("Create Society Error:", error);
        return res.status(500).json({
            message: "Server Error"
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

        if (req.body.rounds) {
            req.body.rounds = JSON.parse(req.body.rounds);
        }

        if (req.body.generalInstructions) {
            req.body.generalInstructions = JSON.parse(req.body.generalInstructions);
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
        return res.status(500).json({
            success: false,
            message: error.message
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
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
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
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export async function getPendingUsersController(req, res) {
    try {
        const users = await User.find({ status: "pending" })
            .select("-password")
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            count: users.length,
            users,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export async function approveUserController(req, res) {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.status === "approved") {
            return res.status(400).json({
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
        console.error(error)
        return res.status(500).json({ message: "Server Error" });
    }
}
export async function rejectUserController(req, res) {
    try {
        const { reason } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.status === "approved") {
            return res.status(400).json({
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
        return res.status(500).json({
            message: err.message,
        });
    }
}
