const alpha = require('alphavantage')({key: '9CVZ2XUSITT4TUTV'});

const Stock = {
  // get stock data for the last day
  getIntraday(symbol) {
    return alpha.data.intraday(symbol, 'compact', 'JSON', '5min').then((data) => {
      return this.formatData(data["Time Series (5min)"], "4. close");
    }).catch((err) => console.log(err));
  },

  // get historical stock data in daily format
  getDays(symbol) {
    return alpha.data.daily_adjusted(symbol, 'full', 'JSON').then((data) => {
      return this.formatData(data["Time Series (Daily)"]);
    }).catch((err) => console.log(err));
  },

  // get historical stock data in weekly format
  getWeeks(symbol) {
    return alpha.data.weekly_adjusted(symbol, 'full', 'JSON').then((data) => {
      return this.formatData(data["Weekly Adjusted Time Series"]);
    }).catch((err) => console.log(err));
  },

  // get historical stock data in monthly format
  getMonths(symbol) {
    return alpha.data.monthly_adjusted(symbol, 'full', 'JSON').then((data) => {
      return this.formatData(data["Monthly Adjusted Time Series"]);
    }).catch((err) => console.log(err));
  },

  // formats JSON output to an object with two arrays: one for dates/time of the price snapshot and one for the closing price at that time
  formatData(data, priceType="5. adjusted close") {
    const closingPrices = { dates: [], prices: [] };
    for (const [date, prices] of Object.entries(data)) {
      closingPrices.dates.unshift(date);
      closingPrices.prices.unshift(parseFloat(prices[priceType]));
    }
    return closingPrices;
  }
}

export default Stock;
