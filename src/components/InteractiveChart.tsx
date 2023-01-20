import React from 'react'
import { Button } from 'semantic-ui-react'
import { LineChart } from './LineChart'
import { StockData, ToggledChart } from 'types'

interface InteractiveChartProps {
  symbol: string
  stockData: StockData
  toggledChart: ToggledChart
  handleClick: (e: React.MouseEvent<HTMLElement>) => void
}

export const InteractiveChart = ({
  symbol,
  stockData: { intraday, day, week, month },
  toggledChart,
  handleClick,
}: InteractiveChartProps) => {
  return (
    <div className="interactiveChart">
      <div className="buttonContainer">
        <Button
          value={JSON.stringify({
            timePeriod: '1 day',
            quantity: 100,
            data: intraday,
          })}
          onClick={handleClick}
        >
          1 day
        </Button>
        <Button
          value={JSON.stringify({
            timePeriod: '1 month',
            quantity: 20,
            data: day,
          })}
          onClick={handleClick}
        >
          1 month
        </Button>
        <Button
          value={JSON.stringify({
            timePeriod: '6 months',
            quantity: 120,
            data: day,
          })}
          onClick={handleClick}
        >
          6 months
        </Button>
        <Button
          value={JSON.stringify({
            timePeriod: '1 year',
            quantity: 240,
            data: day,
          })}
          onClick={handleClick}
        >
          1 year
        </Button>
        <Button
          value={JSON.stringify({
            timePeriod: '5 years',
            quantity: 260,
            data: week,
          })}
          onClick={handleClick}
        >
          5 years
        </Button>
        <Button
          value={JSON.stringify({
            timePeriod: '10 years',
            quantity: 120,
            data: month,
          })}
          onClick={handleClick}
        >
          10 years
        </Button>
        <Button
          value={JSON.stringify({
            timePeriod: 'max',
            quantity: month.prices.length,
            data: month,
          })}
          onClick={handleClick}
        >
          max
        </Button>
      </div>
      <LineChart
        symbol={symbol}
        label="Share Price $USD"
        chartData={toggledChart}
      />
    </div>
  )
}
