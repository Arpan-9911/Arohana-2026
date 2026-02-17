import Joi from "joi";

export const rejectUserSchema = Joi.object({
    reason: Joi.string()
        .trim()
        .min(5)
        .max(300)
        .required()
        .messages({
            "string.empty": "Rejection reason is required",
            "string.min": "Reason must be at least 5 characters",
            "string.max": "Reason must not exceed 300 characters",
        }),
});
