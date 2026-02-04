const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        const isPdf = file.mimetype === "application/pdf";

        return {
            folder: "voters",
            resource_type: isPdf ? "raw" : "image",  // ✅ KEY FIX
            format: isPdf ? "pdf" : undefined,
        };
    },
});

const upload = multer({
    storage,

    // ✅ 10 MB limit
    limits: { fileSize: 10 * 1024 * 1024 },

    // ✅ Optional: extra safety for formats
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "application/pdf"];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new Error("Only JPG, PNG, PDF allowed"));
    },
});

module.exports = { upload };