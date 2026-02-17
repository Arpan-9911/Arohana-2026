import { adminLoginSchema } from "../validators/adminAuth.validator.js";
import bcrypt from "bcryptjs";

import Admin from "../models/admin.model.js";
import { generateToken } from "../utils/generateToken.js";
export async function adminLoginController(req, res) {

    try {
        const { error, value } = adminLoginSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        const { email, password } = value;

        const admin = await Admin.findOne({ email }).select("+password");

        if (!admin) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }        
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
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
        console.error("Error in adminLoginController", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
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

export async function checkAdminAuthController(req, res) {
    try {
        const admin = req.admin;

        return res.status(200).json({
            success: true,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role, // superadmin | societyadmin
                society: admin.society || null,
            },
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
}
