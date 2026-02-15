import User from "../models/user.model.js";

export async function validateQrController(req, res) {
    try {
        const { token } = req.params;

        const user = await userModel.findOne({ qrToken: token });

        if (!user) {
            return res.status(404).json({
                valid: false,
                message: "Invalid QR code",
            });
        }

        if (user.status !== "approved") {
            return res.status(403).json({
                valid: false,
                message: "User not approved",
            });
        }

        return res.json({
            message: "QR code is valid",
            valid_user: true,
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
        return res.status(500).json({
            valid: false,
            message: "Server error",
        });
    }
}