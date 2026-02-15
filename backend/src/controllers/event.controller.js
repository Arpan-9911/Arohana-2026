import mongoose from "mongoose";
import Event from "../models/events.model.js";
import { createEventSchema } from "../validators/event.validation.js";

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
