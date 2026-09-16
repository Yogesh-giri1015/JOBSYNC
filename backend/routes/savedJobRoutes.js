const express = require("express");

const router = express.Router();

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, saveJob);

router.get("/", protect, getSavedJobs);

router.delete("/:id", protect, removeSavedJob);

module.exports = router;