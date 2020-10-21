const { Op } = require("sequelize");
const db = require("../models");
const postObj = db.aqi;

// 查询城市的空气污染物指标
async function queryCityAQI(cityArr, attributes, indexArr) {
  let attr = {
    exclude: ['createdAt', 'updatedAt']
  }
  if (typeof attributes === 'object') {
    attr = attributes
  }

  let where = {}

  if (indexArr) {
    let operatorMap = {
      '>': Op.gt,
      '<': Op.lt
    }

    const key = operatorMap[indexArr[1]]

    where[indexArr[0]] = {
      [key]: Number(indexArr[2])
    }
  }
  const data = await postObj.findAll({
    attributes: attr,
    where: {
      city: {
        [Op.in]: cityArr,
      },
      ...where
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