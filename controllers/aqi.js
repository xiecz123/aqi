const operationDB = require('./aqi-operationDB')
const { CITYS } = require('../constants')
const { Op } = require("sequelize");

// 可查询的城市列表
exports.getCityList = async (request, result) => {
  result.send({
    code: 20000,
    cityList: CITYS
  })
}



// 查询城市aqi等其他指标
exports.getCityAqi = async (request, result) => {
  const { citys, pollutant, index } = request.query
  const cityArr = citys.split(',')
  const compareCity = citys.split(',')
  const finalCityArr = []

  // 判断输入的城市是否正确
  if (citys) {
    CITYS.forEach(item => {
      const index = compareCity.indexOf(item)
      if (index !== -1) {
        finalCityArr.push(item)
        compareCity.splice(index, 1)
      }
    })

    if (cityArr.length !== finalCityArr.length) {
      result.send({
        code: 20000,
        data: {
          error: '请输入citys字段中的城市进行查询',
          citys: CITYS,
          matchCitys: finalCityArr
        }
      })
      return;
    }
  }

  let attributes = undefined
  if (pollutant) { 
    attributes = pollutant.split(',')
    attributes.push('city')
    attributes.push('localTime')
  }

  if (finalCityArr && finalCityArr.length > 0) {
    // 判断查询条件中是否包含'>'或者'<'操作符
    const operators = ['>', '<']
    let operator = ''
    if (index) { 
      operators.some(str => {
        if (index.includes(str)) {
          operator = str
        }
      })
    }

    // 获取指标数组
    const splitArr = operator ? index.split(operator) : ''
    let indexArr = ''
    if (splitArr) {
      indexArr = [
        splitArr[0],
        operator,
        splitArr[1],
      ]
    }

    const res = await operationDB.queryCityAQI(finalCityArr, attributes, indexArr)
    const data = {}
    finalCityArr.forEach(cityName => {
      data[cityName] = res.filter(row => row.city === cityName)
    })
    result.send({
      code: 20000,
      data: data
    })
  }
}