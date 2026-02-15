import fs from 'fs';
import multer from 'multer';
import path from 'path';
const uploadPath = 'uploads/aadhar_images';

// ensure the upload directory exists
const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// create a multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = "uploads/temp";

        if (file.fieldname === "aadhar_image") {
            folder = "uploads/users/aadhar";
        }

        if (file.fieldname === "idcard_image") {
            folder = "uploads/users/idcards";
        }

        if (file.fieldname === "banner_image") {
            folder = "uploads/events/banners";
        }

        ensureDir(folder);
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },
});

// file filter to allow images and pdfs only

const fileFilter = (req, file, cb) => {
    const mimeType = file.mimetype;

    if (
        mimeType.startsWith("image/") ||
        mimeType.startsWith("video/") ||
        mimeType === "application/pdf"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Only images, videos, and PDF files are allowed."));
    }
};

const fileSize = 20 // mb
export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: fileSize * 1024 * 1024
    }
})