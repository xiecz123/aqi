const cronApi = require('./cron')

function api(server) {
  server.use('/api/cron', cronApi)
}

module.exports = api;
