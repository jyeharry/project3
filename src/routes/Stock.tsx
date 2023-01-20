import { useState } from 'react'
import { InvestmentCalculator } from '@components/InvestmentCalculator'
import { Stocks } from '../stocks'
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { StockData, ToggledChart } from 'types'
import { InteractiveChart } from '@components/InteractiveChart'

export const stockLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<{
  stockData: StockData
  toggledChart: ToggledChart
}> => {
  const symbol = params.symbol!.toUpperCase()
  const [intraday, day, week, month] = await Promise.all([
    Stocks.getIntraday(symbol),
    Stocks.getDays(symbol),
    Stocks.getWeeks(symbol),
    Stocks.getMonths(symbol),
  ])

  return {
    stockData: {
      symbol,
      intraday,
      day,
      week,
      month,
    },
    toggledChart: {
      timePeriod: '1 day',
      quantity: 100,
      data: {
        dates: intraday.dates,
        prices: intraday.prices,
      },
    },
  }
}

export const Stock = () => {
  const { stockData, toggledChart } = useLoaderData() as {
    stockData: StockData
    toggledChart: ToggledChart
  }

  const [toggledChartState, setToggledChart] =
    useState<ToggledChart>(toggledChart)

  return (
    <div>
      {toggledChartState.data.prices.length > 0 && (
        <InteractiveChart
          symbol={stockData.symbol}
          stockData={stockData}
          toggledChart={toggledChartState}
          handleClick={(e: any) => {
            setToggledChart({ ...JSON.parse(e.target.value) })
          }}
        />
      )}
      {toggledChartState.data.prices.length > 0 && (
        <InvestmentCalculator
          symbol={stockData.symbol}
          chartData={stockData.month}
        />
      )}
    </div>
  )
}
