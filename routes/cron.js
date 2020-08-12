const express = require("express");
const router = express.Router();
const Aqi = require("../controllers/aqi");

// user
router.get("/start", Aqi.startCron);

router.get("/stop", Aqi.stopCron);

router.get("/nextDates/:nextNum", Aqi.nextDates);

module.exports = router;