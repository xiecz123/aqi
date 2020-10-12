const express = require("express");
const router = express.Router();
const Cron = require("../controllers/cron");

// user
router.get("/start", Cron.startCron);

router.get("/stop", Cron.stopCron);

router.get("/nextDates/:nextNum", Cron.nextDates);

module.exports = router;