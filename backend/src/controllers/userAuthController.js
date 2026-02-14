// import { adminLoginSchema } from "../validators/adminAuthValidator.js";

export function userLoginController(req, res) {

    try {
        res.json({ message: 'User login successful', data: req.body });
        // const { error } = adminLoginSchema.validate(req.body);

    } catch (error) {

    }

}

export function userLogoutController(req, res) {
    res.json({ message: 'Admin logout successful' });
}