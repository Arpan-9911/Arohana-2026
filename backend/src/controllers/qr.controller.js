import User from "../models/user.model.js";

export async function validateQrController(req, res) {
    try {
        const { token } = req.params;

        const user = await User.findOne({ qrToken: token });

        if (!user) {
            return res.status(404).json({
                success: false,
                valid: false,
                message: "Invalid QR code",
            });
        }

        if (user.status !== "approved") {
            return res.status(403).json({
                success: false,
                valid: false,
                message: "User not approved",
            });
        }

        return res.json({
            success: true,
            message: "QR code is valid",
            valid: true,
            user: {
                name: user.name,
                email: user.email,
                status: user.status,
                approvedAt: user.approvedAt,
                aadharImage: user.aadharImage,
                idCardImage: user.idCardImage,
            },
        });

    } catch (err) {
        console.error("Error in validateQrController", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}