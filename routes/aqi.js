const express = require("express");
const router = express.Router();
const Aqi = require("../controllers/aqi");

// user
router.get("/city", Aqi.getCityAqi);

// router.get("/stop", Aqi.stopCron);

// router.get("/nextDates/:nextNum", Aqi.nextDates);

module.exports = router;