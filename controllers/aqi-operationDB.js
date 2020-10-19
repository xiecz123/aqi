const db = require("../models");
const postObj = db.aqi;

// 查询城市的空气污染物指标
async function queryCityAQI(city, attributes, startTime, endTime) {
  const data = await postObj.findAll({
    attributes,
    where: {
      city
    }
  })
  return data
}

// 查询数据库中某个城市在某个时间的aqi是否已经存在
async function queryCityCountByLocalTime(city, localTime) {
  const amount = await postObj.count({
    where: {
      city,
      localTime
    }
  })
  return amount
}

module.exports = {
  queryCityAQI,
  queryCityCountByLocalTime
}