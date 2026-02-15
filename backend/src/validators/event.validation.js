import Joi from "joi";

const roundSchema = Joi.object({
    roundNumber: Joi.number().integer().min(1).required(),

    title: Joi.string().min(3).max(100).required(),

    description: Joi.string().min(5).required(),

    rules: Joi.array()
        .items(Joi.string().min(3))
        .min(1)
        .required(),

    roundDate: Joi.date().optional(),
});

export const createEventSchema = Joi.object({
    title: Joi.string().min(3).max(150).required(),

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
        .min(1)
        .required(),

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
                    "Group events must have minimum team size of at least 2"
                );
            }
        }

        return value;
    });
