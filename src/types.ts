export interface StockData {
  symbol: string
  intraday: StockValues
  day: StockValues
  week: StockValues
  month: StockValues
}

export interface StockValues {
  dates: string[]
  prices: number[]
}

export interface ToggledChart {
  timePeriod: string
  quantity: number
  data: StockValues
}

export interface LoadedStockData {
  stockData: StockData | null
  toggledChart: ToggledChart | null
}

