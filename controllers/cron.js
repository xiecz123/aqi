const db = require("../models");
const { crontab } = require('./crontab')
const logger = require('../logs');

const job = crontab()
job.start()
logger.info('成功启动定时任务')

exports.startCron = (request, result) => {
  job.start()
  result.send({
    code: 20000,
    data: '成功启动定时任务'
  })
}

exports.nextDates = (request, result) => {
  const { nextNum } = request.params || 5
  const nextDates = job.nextDates(nextNum)
  result.send({
    code: 20000,
    data: nextDates
  })
}

exports.stopCron = (request, result) => {
  job.stop()
  result.send({
    code: 20000,
    data: '成功关闭定时任务'
  })
}


