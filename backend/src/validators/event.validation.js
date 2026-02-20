import Joi from "joi";

const roundSchema = Joi.object({
    roundNumber: Joi.number().integer().min(1),

    title: Joi.string().min(3).max(100),

    description: Joi.string().min(5),

    rules: Joi.array()
        .items(Joi.string().min(3))
        .optional(),

    roundDate: Joi.date().optional(),
});

export const createEventSchema = Joi.object({
    title: Joi.string().min(3).max(150).required(),

    location: Joi.string().min(1).required(),

    description: Joi.string().min(10).required(),

    type: Joi.string()
        .valid("solo", "group")
        .required(),

    minTeamSize: Joi.number()
        .integer()
        .min(1)
        .required(),

    maxTeamSize: Joi.number()
        .integer()
        .min(Joi.ref("minTeamSize"))
        .required(),

    generalInstructions: Joi.array()
        .items(Joi.string().min(3))
        .optional(),

    rounds: Joi.array()
        .items(roundSchema)
        .optional(),

    isOnlineSubmission: Joi.boolean().required(),

    onlineSubmissionDeadline: Joi.when("isOnlineSubmission", {
        is: true,
        then: Joi.date().required(),
        otherwise: Joi.forbidden(),
    }),

    eventDate: Joi.date().required(),
})
    .custom((value, helpers) => {
        // if solo min max teamsize must be 1
        if (value.type === "solo") {
            if (value.minTeamSize !== 1 || value.maxTeamSize !== 1) {
                return helpers.message(
                    "Solo events must have minTeamSize and maxTeamSize equal to 1"
                );
            }
        }
        // if group min team size must be at least 2
        if (value.type === "group") {
            if (value.minTeamSize < 2) {
                return helpers.message(
                    "Group events must have minimum team size of at least 1"
                );
            }
        }

        return value;
    });

export const createTeamSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .pattern(/^[a-zA-Z0-9\s_-]+$/)
        .required()
        .messages({
            "string.empty": "Team name is required",
            "string.min": "Team name must be at least 3 characters",
            "string.max": "Team name must not exceed 50 characters",
            "string.pattern.base":
                "Team name can only contain letters, numbers, spaces, _ and -",
        }),
});
export const joinTeamSchema = Joi.object({
    teamCode: Joi.string()
        .trim()
        .length(8)
        .pattern(/^[A-Z0-9]+$/)
        .required()
        .messages({
            "string.empty": "Team code is required",
            "string.length": "Team code must be exactly 8 characters",
            "string.pattern.base":
                "Team code must contain only uppercase letters and numbers",
        }),
});

export const submissionSchema = Joi.object({
    url: Joi.string()
        .uri()
        .pattern(/^https:\/\/(drive\.google\.com)\/.+$/)
        .required()
        .messages({
            "string.empty": "Submission URL is required",
            "string.uri": "Must be a valid URL",
            "string.pattern.base": "Only Google Drive links are allowed",
        }),
});

export const updateEventSchema = Joi.object({
    title: Joi.string().min(3).max(150),

    location: Joi.string().min(1),

    description: Joi.string().min(10),

    type: Joi.string().valid("solo", "group"),

    minTeamSize: Joi.number().integer().min(1),

    maxTeamSize: Joi.number()
        .integer()
        .min(Joi.ref("minTeamSize")),

    generalInstructions: Joi.array()
        .items(Joi.string().min(3)),

    rounds: Joi.array()
        .items(roundSchema),

    isOnlineSubmission: Joi.boolean(),

    onlineSubmissionDeadline: Joi.when("isOnlineSubmission", {
        is: true,
        then: Joi.date().required(),
        otherwise: Joi.optional(),
    }),

    registrationDeadline: Joi.date(),
    whatsappGroupLink: Joi.string().uri(),
    eventDate: Joi.date(),
}).custom((value, helpers) => {

        // If type is being updated, validate team size logic only if both present
        if (value.type === "solo") {
            if (
                (value.minTeamSize && value.minTeamSize !== 1) ||
                (value.maxTeamSize && value.maxTeamSize !== 1)
            ) {
                return helpers.message(
                    "Solo events must have minTeamSize and maxTeamSize equal to 1"
                );
            }
        }

        if (value.type === "group") {
            if (value.minTeamSize && value.minTeamSize < 2) {
                return helpers.message(
                    "Group events must have minimum team size of at least 2"
                );
            }
        }
        if (
            value.minTeamSize &&
            value.maxTeamSize &&
            value.maxTeamSize < value.minTeamSize
        ) {
            return helpers.message(
                "maxTeamSize must be greater than or equal to minTeamSize"
            );
        }

        return value;
    });