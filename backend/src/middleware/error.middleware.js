import multer from "multer";

export const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                success: false,
                message: "File too large. Max size is 2MB.",
            });
        }

        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                success: false,
                message: "Invalid file type. Only images,videos and PDFs are allowed.",
            });
        }
    }
    return res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
    });
}