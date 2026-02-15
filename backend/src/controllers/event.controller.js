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

        return res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: event
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function deleteEvent(req, res) {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid event ID"
            });
        }

        const event = await Event.findByIdAndDelete(id);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
