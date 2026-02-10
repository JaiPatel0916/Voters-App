const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
            unique: true,
        },

        yearOfPassing: {
            type: String,
            required: true,
        },

        district: {
            type: String,
            enum: [
                "Nagpur",
                "Bhandara",
                "Gondia",
                "Gadchiroli",
                "Wardha",
                "Chandrapur",
            ],
            required: true,
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Prefer not to say"],
            required: true,
        },


        // Documents (Cloudinary URLs)

        aadharCard: {
            type: String,
            required: true,
        },

        marksheetOrDegree: {
            type: String,
            required: true,
        },

        passportPhoto: {
            type: String,
            required: true,
        },

        panOrMarriageCert: {
            type: String,
            required: true,
        },

        signature: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Voter", voterSchema);
