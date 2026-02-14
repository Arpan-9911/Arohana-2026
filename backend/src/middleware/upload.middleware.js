import fs from 'fs';
import multer from 'multer';
const uploadPath = 'uploads/aadhar_images';

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// create a multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
});

// file filter to allow images and pdfs only

const fileFilter = (req, file, cb) => {

    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, PNG and PDF file type is allowed"))
    }

}
const fileSize = 20 // mb
export const uploadAadhar = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: fileSize * 1024 * 1024
    }
})