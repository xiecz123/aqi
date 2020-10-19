const operationDB = require('./aqi-operationDB')

exports.getCityAqi = async (request, result) => {
  const { city, pollutant, startTime, endTime } = request.query
  const attributes = pollutant.split(',')
  attributes.push('localTime')
  if (city) {
    const res = await operationDB.queryCityAQI(city, attributes, startTime, endTime)
    result.send({
      code: 20000,
      data: res
    })
  }
}