import { createSocietySchema } from '../validators/adminAuth.validator.js';
import Society from "../models/society.model.js";
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model.js';
export async function createSocietyController(req, res) {
    try {
        // validate request body

        const { error, value } = createSocietySchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        }
        const { societyName, description, adminName, adminEmail, adminPassword } = value;
        // check if society with the same name already exists
        const existingSociety = await Society.findOne({ name: societyName });
        if (existingSociety) {
            return res.status(400).json({
                message: "Society with this name already exists"
            });
        }
        // check if admin email is already registered
        const existingAdmin = await Admin.findOne({ email: value.adminEmail });
        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin with this email already exists"
            });
        }
        // create new society
        const newSociety = await Society.create({
            name: societyName,
            description: description,
        });
        // hash password for the new admin
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);
        // create new admin for the society
        const newAdmin = await Admin.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: "society-admin",
            society: newSociety._id,
        });
        return res.status(201).json({
            success: true,
            message: "Society and Society Head created successfully",
            society: {
                id: newSociety._id,
                name: newSociety.name,
            },
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email,
            },
        });        // return success response with society details
    } catch (error) {
        console.error("Create Society Error:", error);
        return res.status(500).json({
            message: "Server Error"
        });
    }
}