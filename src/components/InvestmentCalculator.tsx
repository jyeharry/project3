import React, { Component, useState } from 'react'
import { Form } from 'semantic-ui-react'
import { LineChart } from './LineChart'

interface Investment {
  investment: number
  numOfMonths: number
  recurringInvestment: number
  multiplier: number
  frequency: number
  investmentValues: number[]
}

const calculateInvestmentValues = (
  investment: number,
  recurringInvestment: number,
  numOfMonths: number,
  prices: number[],
  multiplier: number,
  frequency: number,
) => {
  const shortenedPrices = [...prices.slice(prices.length - numOfMonths)]
  return shortenedPrices.map((_, i) => {
    if (i === 0) return investment
    if (i % frequency === 0) investment += recurringInvestment * multiplier
    return (investment *= shortenedPrices[i] / shortenedPrices[i - 1])
  })
}

export const InvestmentCalculator = ({ symbol, chartData }: any) => {
  const [investment, setInvestment] = useState<Investment>({
    investment: 0,
    numOfMonths: 12,
    recurringInvestment: 0,
    multiplier: 0,
    frequency: 0,
    investmentValues: [],
  })

  const options = [
    {
      key: '0',
      text: 'Weekly',
      value: JSON.stringify({ multiplier: 4.33, frequency: 1 }),
    },
    {
      key: '1',
      text: 'Fortnightly',
      value: JSON.stringify({ multiplier: 2.16, frequency: 1 }),
    },
    {
      key: '2',
      text: 'Monthly',
      value: JSON.stringify({ multiplier: 1, frequency: 1 }),
    },
    {
      key: '3',
      text: 'Quarterly',
      value: JSON.stringify({ multiplier: 1, frequency: 3 }),
    },
    {
      key: '4',
      text: 'Yearly',
      value: JSON.stringify({ multiplier: 1, frequency: 12 }),
    },
  ]

  const investmentData = {
    quantity: investment.numOfMonths,
    data: {
      dates: [...chartData.dates],
      prices: [...investment.investmentValues],
    },
  }

  return (
    <div className="investmentGraph">
      <Form
        className="formCalculator"
        onSubmit={(e: any) => {
          e.preventDefault()

          let {
            0: { valueAsNumber: investmentTarget },
            1: { valueAsNumber: years },
            2: { valueAsNumber: recurringInvestment },
          } = e.target

          investmentTarget ||= 0
          recurringInvestment ||= 0
          years ||= 1

          const numOfMonths = years * 12
          const investmentValues = calculateInvestmentValues(
            investmentTarget,
            recurringInvestment,
            numOfMonths,
            chartData.prices,
            investment.multiplier,
            investment.frequency,
          )

          setInvestment({
            ...investment,
            investment: investmentTarget,
            recurringInvestment: recurringInvestment,
            numOfMonths: numOfMonths,
            investmentValues: [...investmentValues],
          })
        }}
      >
        <Form.Group>
          <Form.Input
            fluid
            type="number"
            label="Initial investment"
            placeholder="$10,000"
            width={8}
          />
          <Form.Input
            fluid
            type="number"
            label="Investment period in years"
            placeholder="20 years"
            width={8}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            fluid
            label="Regular investment"
            type="number"
            placeholder="$1,000"
            width={8}
          />
          <Form.Select
            fluid
            label="Investment frequency"
            placeholder="Frequency"
            options={options}
            width={8}
            onChange={(e: any, { value }: any) => {
              value = JSON.parse(value)
              setInvestment({
                ...investment,
                multiplier: value.multiplier,
                frequency: value.frequency,
              })
            }}
          />
        </Form.Group>
        <Form.Button type="submit">Invest</Form.Button>
      </Form>
      <LineChart
        symbol={symbol}
        label="Investment Value $USD"
        chartData={investmentData}
      />
    </div>
  )
}

