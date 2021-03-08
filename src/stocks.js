const alpha = require('alphavantage')({key: '9CVZ2XUSITT4TUTV'});

const Stock = {
  getIntraday(symbol) {
    return alpha.data.intraday(symbol, 'compact', 'JSON', '5min').then((data) => {
      // let prices = [];
      // for (let date in data["Time Series (5min)"]) {
      //   prices.push(data["Time Series (5min)"][date]["4. close"]);
      // }
      // return prices.reverse();
      return data["Time Series (5min)"];
    }).catch((err) => console.log(err));
  },

  getDaysCompact(symbol) {
    return alpha.data.daily_adjusted(symbol, 'compact', 'JSON').then((data) => {
      return data["Time Series (Daily)"];
    });
  },

  getXDays(symbol, numOfDays) {
    return this.getDaysCompact(symbol).then((data) => {
      const closingPrices = { dates: [], prices: [] };
      for (const [date, prices] of Object.entries(data)) {
        if (numOfDays-- === 0) break;
        closingPrices.dates.unshift(date);
        closingPrices.prices.unshift(parseFloat(prices["4. close"]));
      }
      return closingPrices;
    }).catch((err) => console.log(err));
  },

  get100Days(symbol) {
    // return alpha.data.intraday(symbol, 'compact');
  },

  get180Days(symbol) {

  },

  get52Weeks(symbol) {

  },

  get156Weeks(symbol) {

  },

  get60Months(symbol) {

  },

  get120Months(symbol) {

  },

  get240Months(symbol) {

  },

}

export default Stock;
