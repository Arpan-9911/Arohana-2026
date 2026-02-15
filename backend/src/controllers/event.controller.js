import mongoose from "mongoose";
import Event from "../models/events.model.js";

/* ------------------------------ Create Event ------------------------------ */
export async function createEvent(req, res) {
  try {
    const event = await Event.create(req.body);

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

/* ------------------------------ Delete Event ------------------------------ */
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
