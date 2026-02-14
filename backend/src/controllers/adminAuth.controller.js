import { adminLoginSchema } from "../validators/adminAuth.validator.js";
import bcrypt from "bcryptjs";

import Admin from "../models/admin.model.js";
import { generateToken } from "../utils/generateToken.js";
export async function adminLoginController(req, res) {

    try {
        const { error, value } = adminLoginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }

        const { email, password } = value;

        const admin = await Admin.findOne({ email }).select("+password");

        if (!admin) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }        
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }

        generateToken({
            res,
            payload: {
                id: admin._id,
                role: admin.role,
                type: "admin",
            },
            secret: process.env.JWT_ADMIN_SECRET,
            cookieName: "admin_token",
        });
        return res.status(200).json({
            success: true,
            message: "Login successful",
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            },
        });
    } catch (error) {
        console.error("Admin Login Error:", error);
        return res.status(500).json({
            message: "Server Error"
        });
    }

}

export function adminLogoutController(req, res) {
    res.clearCookie("admin_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return res.status(200).json({
        success: true,
        message: "Admin logged out successfully",
    });
}