import React from 'react'
import { Line } from 'react-chartjs-2'

interface LineChartProps {
  symbol: string
  label: string
  chartData: {
    quantity: number
    data: { dates: string[]; prices: number[] }
  }
}

export const LineChart = ({
  symbol,
  label,
  chartData: {
    quantity,
    data: { dates, prices },
  },
}: LineChartProps) => {
  // remove data from the arrays until we are left with 'quantity' most recent dates and prices
  dates.splice(0, dates.length - quantity)
  prices.splice(0, prices.length - quantity)

  const borderColor =
    prices[0] < prices[prices.length - 1]
      ? 'rgba(97, 177, 90, 1)'
      : 'rgba(255, 99, 132, 1)'

  const backgroundColor =
    prices[0] < prices[prices.length - 1]
      ? 'rgba(97, 177, 90, 0.2)'
      : 'rgba(255, 99, 132, 0.2)'

  const chartData = {
    labels: [...dates],
    datasets: [
      {
        label: label,
        lineTension: 0.5,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 2,
        data: [...prices],
      },
    ],
  }

  return (
    <div>
      <Line
        data={chartData}
        options={{
          tooltips: {
            enabled: true,
            mode: 'x',
            intersect: false,
            callbacks: {
              label: (tooltipItem: any, data: any) => {
                return (
                  '$' +
                  parseFloat(tooltipItem.value).toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })
                )
              },
            },
          },
          title: {
            display: true,
            text: symbol,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  drawBorder: true,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  drawBorder: true,
                },
                ticks: {
                  // format large numbers into their abbreviated forms ie 1000 = 1k
                  callback: function (value: any) {
                    const suffixes = [
                      '',
                      ' k',
                      ' M',
                      ' G',
                      ' T',
                      ' P',
                      ' E',
                      ' Z',
                      ' Y',
                      ' * 10^27',
                      ' * 10^30',
                      ' * 10^33',
                    ]
                    let suffixIndex = 0
                    while ((value /= 1000) >= 1) {
                      suffixIndex++
                    }
                    return (
                      '$' + (value * 1000).toFixed(2) + suffixes[suffixIndex]
                    )
                  },
                },
              },
            ],
          },
        }}
      />
    </div>
  )
}

