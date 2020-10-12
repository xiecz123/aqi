const db = require("../models");
const postObj = db.aqi;

exports.getCityAqi = async (request, result) => {
  const { city, pollutant, startTime, endTime } = request.query
  const attributes = pollutant.split(',')
  attributes.push('localTime')
  if (city) {
    const res = await queryCityAQI(city, attributes, startTime, endTime)
    result.send({
      code: 20000,
      data: res
    })
  }
}

async function queryCityAQI(city, attributes, startTime, endTime) {
  const data = await postObj.findAll({
    attributes,
    where: {
      city
    }
  })
  return data
}