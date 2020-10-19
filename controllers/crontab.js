const CronJob = require('cron').CronJob
const request = require('../utils/request')
const db = require("../models");
const postObj = db.aqi;
const { TOKEN, CITYS } = require('../constants/index')
const operationDB = require('./aqi-operationDB')
const logger = require('../logs');

const CRON_CONFIG = {
    reply: '每隔1小时运行一次',
    /**
     * 定时任务
     *     ┌─────────────── second (optional)
     *     │ ┌───────────── minute
     *     │ │ ┌─────────── hour
     *     │ │ │  ┌──────── day of month
     *     │ │ │  │ ┌────── month
     *     │ │ │  │ │ ┌──── day of week
     *     │ │ │  │ │ │
     *     │ │ │  │ │ │
     *     * * *  * * *      // */
    time: '0 0 */1 * * *',
    // time: '0 */1 * * * *',
  }

exports.crontab = () => {
  logger.info('重新运行cron了')
  const job = new CronJob(
    CRON_CONFIG.time,
    async () => {
      for (const city of CITYS) {
        await setCityAQI(city)
      }
    },
    () => { },
    false,
    undefined,
    undefined,
    true
    )
  return job
}


// numOfSycles 循环次数，最多4次
async function setCityAQI(city, numOfSycles = 5) {
  if (numOfSycles === 0) return;
  numOfSycles--
  try {
    const data = await fetchCityAQI(city)
    const currentMinutes = (new Date).getMinutes()
    
    if (data.localTime) {
      const amount = await operationDB.queryCityCountByLocalTime(city, data.localTime)
      // 如果数据库中有相同的数据，1分钟后再次查询
      if (amount > 0) {
        logger.info('当前时间' + new Date + '已有重复数据')
        // 整点过20分钟以内的请求才会重新请求
        if (60 - currentMinutes > 40) {
          logger.info('一分钟后再次查询，还剩' + numOfSycles + '次查询')
          setTimeout(() => {
            setCityAQI(city, numOfSycles)
          }, 1000 * 60)
        }
        return;
      }
    }

    // Save Post object to db
    const createBack = await postObj.create(data)
  } catch (error) {
    console.log(error)
  }
}

// 从waqi提供的api中查询数据
async function fetchCityAQI(city) {
  if (!city) {
    return
  }
  try {
    const res = await request.get(`https://api.waqi.info/feed/${city}/?token=${TOKEN}`)
    if (res.status === 'ok') {
      const { idx, aqi, time: { s }, iaqi: { co, dew, h, neph, no2, o3, p, pm10, pm25, so2, t } } = res.data
      const post = {
        city: city,
        localTime: s,
        idx: idx,
        aqi: aqi, 
        co: co ? co.v : null,
        dew: dew ? dew.v : null,
        h: h ? h.v : null,
        neph: neph ? neph.v : null,
        no2: no2 ? no2.v : null,
        o3: o3 ? o3.v : null,
        p: p ? p.v : null,
        pm10: pm10 ? pm10.v : null,
        pm25: pm25 ? pm25.v : null,
        so2: so2 ? so2.v : null,
        t: t ? t.v : null
      }
      return post
    } else {
      throw new Error('request status error, city name is ' + city )
    }
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
};