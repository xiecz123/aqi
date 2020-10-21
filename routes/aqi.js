const express = require("express");
const router = express.Router();
const Aqi = require("../controllers/aqi");

// 可查询的城市列表
router.get("/cityList", Aqi.getCityList);

// 获取城市aqi
router.get("/city", Aqi.getCityAqi);


// router.get("/stop", Aqi.stopCron);

// router.get("/nextDates/:nextNum", Aqi.nextDates);

module.exports = router;