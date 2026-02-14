import jwt from 'jsonwebtoken';
import Admin from "../models/admin.model.js";

export async function protectAdmin(req, res, next) {
    try {
        const token = req.cookies.admin_token;

        if (!token) {
            return res.status(401).json({
                message: "Not authorized"
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

        const admin = await Admin.findById(decodedToken.id);

        if (!admin) {
            return res.status(401).json({
                message: "Admin not found. Try again"
            });
        }

        req.admin = admin;
        next();

    } catch (error) {
        console.error("Admin Auth Middleware Error:", error);
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}