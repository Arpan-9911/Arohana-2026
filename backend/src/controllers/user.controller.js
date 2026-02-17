import Participation from "../models/participation.model.js";
import Submission from "../models/submission.model.js";

export async function getMyParticipationsController(req, res) {
    try {
        const user = req.user;

        const participations = await Participation.find({
            user: user._id,
        })
            .populate({
                path: "event",
                select: "title type minTeamSize maxTeamSize isOnlineSubmission onlineSubmissionDeadline",
            })
            .populate({
                path: "team",
                populate: {
                    path: "members",
                    select: "name email",
                },
            })
            .sort({ createdAt: -1 });

        // Attach submission info manually
        const enriched = await Promise.all(
            participations.map(async (p) => {
                let submission = null;

                if (p.team) {
                    submission = await Submission.findOne({
                        team: p.team._id,
                    }).select("url submittedAt");
                } else {
                    submission = await Submission.findOne({
                        event: p.event._id,
                        submittedBy: user._id,
                    }).select("url submittedAt");
                }

                return {
                    participationId: p._id,
                    status: p.status,
                    event: p.event,
                    team: p.team,
                    submission,
                    registeredAt: p.createdAt,
                };
            })
        );

        return res.json({
            success: true,
            count: enriched.length,
            participations: enriched,
        });

    } catch (err) {
        console.error("Error in getMyParticipationsController", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}