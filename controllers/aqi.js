const db = require("../models");
const postObj = db.aqi;
const { crontab } = require('../plugins/crontab')

const job = crontab()
job.start()
console.log('成功启动定时任务')

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


