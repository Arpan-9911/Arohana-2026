import Joi from "joi";

export const adminLoginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Invalid email format",
            "string.empty": "Email is required",
        }),

    password: Joi.string()
        .min(6)
        .required()
        .messages({
            "string.min": "Password must be at least 6 characters",
            "string.empty": "Password is required",
        }),
});
export const createSocietySchema = Joi.object({
    societyName: Joi.string()
        .min(3)
        .max(50)
        .required(),

    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({
            "string.empty": "Description is required",
            "string.min": "Description must be at least 10 characters",
        }),

    adminName: Joi.string()
        .min(3)
        .max(50)
        .required(),

    adminEmail: Joi.string()
        .email()
        .required(),

    adminPassword: Joi.string()
        .min(6)
        .required(),
});