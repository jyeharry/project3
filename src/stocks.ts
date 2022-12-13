const alpha = require('alphavantage')({ key: '9CVZ2XUSITT4TUTV' })

interface Intraday5Min {
  'Meta Data': {
    '1. Information': string
    '2. Symbol': string
    '3. Last Refreshed': string
    '4. Interval': string
    '5. Output Size': string
    '6. Time Zone': string
  }
  'Time Series (5min)': {
    [key: string]: {
      '1. open': string
      '2. high': string
      '3. low': string
      '4. close': string
      '5. volume': string
    }
  }
}

interface Daily {
  'Meta Data': {
    '1. Information': string
    '2. Symbol': string
    '3. Last Refreshed': string
    '4. Output Size': string
    '5. Time Zone': string
  }
  'Time Series (Daily)': Prices & { '8. split coefficient': string }
}

interface Prices {
  [key: string]: {
    '1. open': string
    '2. high': string
    '3. low': string
    '4. close': string
    '5. adjusted close': string
    '6. volume': string
    '7. dividend amount': string
  }
}

interface Weekly extends Metadata {
  'Weekly Adjusted Time Series': Prices
}

interface Metadata {
  'Meta Data': {
    '1. Information': string
    '2. Symbol': string
    '3. Last Refreshed': string
    '4. Time Zone': string
  }
}

interface Monthly extends Metadata {
  'Monthly Adjusted Time Series': Prices
}

const Stock = {
  // get stock data for the last day
  async getIntraday(symbol: string) {
    const data = await alpha.data.intraday(symbol, 'compact', 'JSON', '5min')
    return this.formatData(data['Time Series (5min)'], '4. close')
  },

  // get historical stock data in daily format
  async getDays(symbol: string) {
    const data = await alpha.data.daily_adjusted(symbol, 'full', 'JSON')
    return this.formatData(data['Time Series (Daily)'])
  },

  // get historical stock data in weekly format
  async getWeeks(symbol: string) {
    const data = await alpha.data.weekly_adjusted(symbol, 'full', 'JSON')
    return this.formatData(data['Weekly Adjusted Time Series'])
  },

  // get historical stock data in monthly format
  async getMonths(symbol: string) {
    const data = await alpha.data.monthly_adjusted(symbol, 'full', 'JSON')
    return this.formatData(data['Monthly Adjusted Time Series'])
  },

  // formats JSON output to an object with two arrays: one for dates/time of the price snapshot and one for the closing price at that time
  formatData(data: Intraday5Min | Daily | Weekly | Monthly, priceType = '5. adjusted close') {
    const closingPrices = { dates: [], prices: [] }
    for (const [date, prices] of Object.entries(data)) {
      closingPrices.dates.unshift(date)
      closingPrices.prices.unshift(parseFloat(prices[priceType]))
    }
    return closingPrices
  },
}

export default Stock
