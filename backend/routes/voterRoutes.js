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
    { name: "panOrMarriageCert", maxCount: 1 }, // optional
    { name: "signature", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log("BODY:", req.body);
      console.log("FILES:", req.files);

      // ✅ Validate required files
      if (
        !req.files?.aadharCard ||
        !req.files?.marksheetOrDegree ||
        !req.files?.passportPhoto ||
        !req.files?.signature
      ) {
        return res.status(400).json({
          msg: "Required files are missing",
        });
      }

      const voter = await Voter.create({
        name: req.body.name,
        phone: req.body.phone,
        yearOfPassing: req.body.yearOfPassing,
        district: req.body.district,
        gender: req.body.gender,

        // ✅ Safe file access
        aadharCard: req.files?.aadharCard?.[0]?.path,
        marksheetOrDegree: req.files?.marksheetOrDegree?.[0]?.path,
        passportPhoto: req.files?.passportPhoto?.[0]?.path,

        // ✅ FIX: optional PAN (important)
        panOrMarriageCert:
          req.files?.panOrMarriageCert?.[0]?.path || null,

        signature: req.files?.signature?.[0]?.path,
      });

      res.status(200).json(voter);
    } catch (err) {
      console.error("ERROR:", err);

      // ✅ Duplicate phone handling
      if (err.code === 11000) {
        return res.status(400).json({
          msg: "This phone number is already registered",
        });
      }

      res.status(500).json({
        error: err.message,
      });
    }
  }
);

// ✅ Get all voters (protected route)
router.get("/all", auth, async (req, res) => {
  try {
    const voters = await Voter.find();
    res.json(voters);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;