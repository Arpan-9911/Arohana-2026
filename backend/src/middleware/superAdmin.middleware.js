export function requireSuperAdmin(req, res, next) {
    if (req.admin.role !== "super-admin") {
        return res.status(403).json({
            message: "Access denied. Super Admin only.",
        });
    }
    next();
}