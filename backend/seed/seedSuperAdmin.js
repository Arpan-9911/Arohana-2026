import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../src/configs/db.js";
import Admin from "../src/models/admin.model.js";

await connectDB();

const seed = async () => {
    const existing = await Admin.findOne({ role: "super-admin" });

    if (existing) {
        console.log("Super Admin already exists.");
        process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
        name: "Hyperion Super Admin",
        email: "admin@hyperion.com",
        password: hashedPassword,
        role: "super-admin",
    });

    console.log("Super Admin created successfully.");
    process.exit();
};

seed();
