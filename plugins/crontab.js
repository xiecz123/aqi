const CronJob = require('cron').CronJob
const request = require('../utils/request')
const db = require("../models");
const postObj = db.aqi;
const { TOKEN, CITYS } = require('../constants/index')
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

async function setCityAQI(city) {
  try {
    const data = await fetchCityAQI(city)
    // const dbData = await queryCityAQI(city, data.localTime)
    // if (dbData && dbData.length > 0) {
    //   return;
    // }

    // Save Post object to db
    const createBack = await postObj.create(data)
  } catch (error) {
    console.log(error)
  }
}

async function queryCityAQI(city, localTime) {
  const data = await postObj.findAll({
    where: {
      city,
      localTime
    }
  })
  return data
}

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
      throw new Error('request status error')
    }
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
};