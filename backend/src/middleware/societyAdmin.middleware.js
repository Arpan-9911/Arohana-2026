export function requireSocietyAdmin(req, res, next) {
    if (req.admin.role !== "society-admin") {
        return res.status(403).json({
            message: "Access denied. Society Admin only.",
        });
    }

    next();
}
