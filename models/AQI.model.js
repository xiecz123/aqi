module.exports = (database, Sequelize) => {
  return database.define("aqi", {
    city: {
      type: Sequelize.STRING
    },
    localTime: {
      type: Sequelize.STRING
    },
    aqi: {
      type: Sequelize.FLOAT
    },
    co: {
      type: Sequelize.FLOAT
    },
    dew: {
      type: Sequelize.FLOAT
    },
    h: {
      type: Sequelize.FLOAT
    },
    neph: {
      type: Sequelize.FLOAT
    },
    no2: {
      type: Sequelize.FLOAT
    },
    o3: {
      type: Sequelize.FLOAT
    },
    p: {
      type: Sequelize.FLOAT
    },
    pm10: {
      type: Sequelize.FLOAT
    },
    pm25: {
      type: Sequelize.FLOAT
    },
    so2: {
      type: Sequelize.FLOAT
    },
    t: {
      type: Sequelize.FLOAT
    }
  });
};