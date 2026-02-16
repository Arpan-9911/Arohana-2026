import mongoose from "mongoose";
import Event from "../models/events.model.js";

export async function getAllEventsController(req, res) {
    try {
        const events = await Event.find()
            .select("-__v")
            .populate("society", "name") // only fetch society name
            .sort({ eventDate: 1 }); // chronology samjhoo aapp

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

export async function getEventByIdController(req, res) {
    try {
        const { id } = req.params;

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
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}