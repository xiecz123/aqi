const TOKEN = '6a51c75e0b6cb5c9e31122ec5327396984cc6ec1'

const WORLD = {
    Asia: {
      India: {
        city: ['Mumbai', 'Delhi']
      },
      Japan: {
        city: ['Tokyo', 'Osaka', 'Yokohama', 'Nagasaki']
      },
      'South Korea': {
          city: ['Seoul', 'Busan']
      },
      China: {
        city: ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
      },
      Thailand: {
        city: ['Bangkok', 'Chiang Mai', 'Pattaya']
      },
      Singapore: {
        city: ['Singapore']
      },
      Iran: {
        city: ['Tehran']
      },
      Pakistan: {
        city: ['Islamabad']
      }
    },
    Europe: {
      Finland: {
        city: ['Helsinki']
      },
      Russia: {
        city: ['Moscow', 'Petersburg']
      },
      Germany: {
        city: ['Berlin', 'Hamburg', 'Munich']
      },
      Switzerland: {
        city: ['Zurich', 'Geneva']
      },
      'United Kingdom': {
        city: ['London', 'Birmingham', 'Liverpool']
      },
      'The Netherlands': {
        city: ['Amsterdam']
      },
      Italy: {
        city: ['Rome', 'Milan']
      },
      France: {
        city: ['Paris', 'Marseille']
      }
    },
    'South America': {
      Venezuela: {
        city: ['Caracas']
      },
      Brazil: {
        city: ['Sao Paulo']
      },
      Argentina: {
        city: ['Buenos Aires']
      },
      Colombia: {
        city: ['Bogotá']
      },
      Uruguay: {
        city: ['Montevideo']
      },
      Peru: {
        city: ['Lima']
      }
    },
    'North America': {
      Canada: {
        city: ['Toronto', 'Vancouver']
      },
      'United States': {
        city: ['New York', 'Los Angeles', 'Chicago', 'Houston']
      },
      Mexico: {
        city: ['Mexico']
      },
      Cuba: {
        city: ['Havana']
      }
    },
    Oceania: {
      Australia: {
        city: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane']
      },
      'New Zealand': {
        city: ['Wellington', 'Auckland']
      },
      'Fiji': {
        city: ['Suva']
      }
    },
    Africa: {
      Congo: {
        city: ['Brazzaville']
      },
      Egypt: {
        city: ['Cairo']
      },
      'South Africa': {
        city: ['Cape Town']
      },
      Algiers: {
        city: ['Algiers']
      }
      // Angola: {
      //   city: ['Luanda']
      // }
    }
}

const CITYS = Object.keys(WORLD).map(continent => {
  return Object.keys(WORLD[continent]).map(country => WORLD[continent][country].city)
}).flat(2)

module.exports = {
  TOKEN,
  CITYS
}
