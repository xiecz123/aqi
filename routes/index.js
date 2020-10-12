const cronApi = require('./cron')
const aqiApi = require('./aqi')

function api(server) {
  server.use('/api/cron', cronApi)
  server.use('/api/aqi', aqiApi)
}

module.exports = api;
