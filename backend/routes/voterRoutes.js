const express = require("express");
const auth = require("../middleware/auth");

const { upload } = require("../middleware/upload");
const Voter = require("../models/Voter");

const router = express.Router();

router.post(
    "/register",
    upload.fields([
        { name: "aadharCard", maxCount: 1 },
        { name: "marksheetOrDegree", maxCount: 1 },
        { name: "passportPhoto", maxCount: 1 },
        { name: "panOrMarriageCert", maxCount: 1 },
        { name: "signature", maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const voter = await Voter.create({
                name: req.body.name,
                phone: req.body.phone,
                yearOfPassing: req.body.yearOfPassing,
                district: req.body.district,

                aadharCard: req.files.aadharCard[0].path,
                marksheetOrDegree: req.files.marksheetOrDegree[0].path,
                passportPhoto: req.files.passportPhoto[0].path,
                panOrMarriageCert: req.files.panOrMarriageCert[0].path,
                signature: req.files.signature[0].path,
            });

            res.json(voter);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

router.get("/all", auth, async (req, res) => {
    const voters = await Voter.find();
    res.json(voters);
});


module.exports = router;
