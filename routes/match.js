const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
    matchJob,
    getHistory
} = require("../controllers/matchController");

router.get("/history", auth, getHistory);

router.post("/:jobId", auth, matchJob);

module.exports = router;