import { userRegisterSchema } from "../validators/userAuth.validator.js";
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
// import { adminLoginSchema } from "../validators/adminAuthValidator.js";
export async function userRegisterController(req, res) {
    try {
        const { error, value } = userRegisterSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }

        if (!req.files?.aadhar_image || !req.files?.idcard_image) {
            return res.status(400).json({
                message: "Both Aadhaar and ID card images are required",
            });
        }

        const aadharFile = req.files.aadhar_image[0];
        const idcardFile = req.files.idcard_image[0];

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const { name, email, password } = value

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered",
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            aadharImage: `${baseUrl}/${aadharFile.path.replace(/\\/g, "/")}`,
            idCardImage: `${baseUrl}/${idcardFile.path.replace(/\\/g, "/")}`,
        })

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                status: newUser.status,
            },
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Server Error",
        });
    }
}

export async function userLoginController(req, res) {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        generateToken({
            res,
            payload: {
                id: user._id,
                type: "user",
            },
            secret: process.env.JWT_USER_SECRET,
            cookieName: "user_token",
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                status: user.status,
                rejectionReason: user.rejectionReason,
            },
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
}

export function userLogoutController(req, res) {
    res.clearCookie("user_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    return res.json({
        success: true,
        message: "User logged out successfully",
    });
}


export function userProfileController(req, res) {
    return res.status(200).json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            aadharImage: req.user.aadharImage,
            idCardImage: req.user.idCardImage,
            status: req.user.status,
            rejectionReason: req.user.rejectionReason,
            approvedAt: req.user.approvedAt,
            createdAt: req.user.createdAt,
            qrToken: req.user.qrToken,
        },
    });
}

export async function reuploadDocumentsController(req, res) {
    try {
        const user = req.user;

        if (user.status !== "rejected") {
            return res.status(400).json({
                message: "You can only reupload documents if rejected.",
            });
        }

        if (!req.files?.aadhar_image || !req.files?.idcard_image) {
            return res.status(400).json({
                message: "Both Aadhaar and ID card are required.",
            });
        }

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        // Save new files
        user.aadharImage = `${baseUrl}/${req.files.aadhar_image[0].path.replace(/\\/g, "/")}`;
        user.idCardImage = `${baseUrl}/${req.files.idcard_image[0].path.replace(/\\/g, "/")}`;

        user.status = "pending";
        user.rejectionReason = null;
        user.documentsUpdatedAt = new Date();

        await user.save();

        return res.json({
            success: true,
            message: "Documents re-submitted successfully. Awaiting approval.",
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
}
