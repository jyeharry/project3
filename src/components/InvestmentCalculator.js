import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';

import LineChart from './LineChart';

export default class InvestmentCalculator extends Component {
  constructor() {
    super();
    this.state = {
      investment: 0,
      numOfMonths: 12,
      recurringInvestment: 0,
      multiplier: 0,
      frequency: 0,
      investmentValues: []
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this.calculateInvestmentValues = this.calculateInvestmentValues.bind(this);
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    let {
      0: {
        valueAsNumber: investment
      },
      1: {
        valueAsNumber: years
      },
      2: {
        valueAsNumber: recurringInvestment
      }
    } = e.target;
    investment = investment || 0;
    recurringInvestment = recurringInvestment || 0;
    years = years || 1;
    const numOfMonths = years * 12;
    const investmentValues = this.calculateInvestmentValues(investment, recurringInvestment, numOfMonths);
    this.setState({
      investment: investment,
      recurringInvestment: recurringInvestment,
      numOfMonths: numOfMonths,
      investmentValues: [...investmentValues],
    });

  }

  _handleSelect = (e, {value}) => {
    value = JSON.parse(value);
    this.setState({multiplier: value.multiplier, frequency: value.frequency});
  }

  // maps share prices with investment while adding recurringInvestment in order to get data needed for users chart
  calculateInvestmentValues = (investment, recurringInvestment, numOfMonths) => {
    const {prices} = this.props.chartData;
    const {multiplier, frequency} = this.state;
    let shortenedPrices = [...prices.slice(prices.length - numOfMonths)];
    return shortenedPrices.map((current, i) => {
      if (i % frequency === 0) investment += recurringInvestment * multiplier;
      if (i === 0) return investment;
      return investment *= shortenedPrices[i] / shortenedPrices[i-1];
    });
  }

  render() {
    const options = [
      { key: '0', text: 'Weekly', value: JSON.stringify({multiplier: 4, frequency: 1}) },
      { key: '1', text: 'Fortnightly', value: JSON.stringify({multiplier: 2, frequency: 1}) },
      { key: '2', text: 'Monthly', value: JSON.stringify({multiplier: 1, frequency: 1}) },
      { key: '3', text: 'Quarterly', value: JSON.stringify({multiplier: 1, frequency: 3}) },
      { key: '4', text: 'Yearly', value: JSON.stringify({multiplier: 1, frequency: 12}) },
    ];
    const investmentData = {
      quantity: this.state.numOfMonths,
      data: {
        dates: [...this.props.chartData.dates],
        prices: [...this.state.investmentValues],
      }
    };
    return (
      <div className='investmentGraph'>
        <Form className='formCalculator' onSubmit={this._handleSubmit}>
          <Form.Group>
            <Form.Input
              fluid
              type='number'
              label='Initial investment'
              placeholder='$10,000'
              width={8}
            />
            <Form.Input
              fluid
              type='number'
              label='Investment period in years'
              placeholder='20 years'
              width={8}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label='Regular investment'
              type='number'
              placeholder='$1,000'
              width={8}
            />
            <Form.Select
              fluid
              label='Investment frequency'
              placeholder='Frequency'
              options={options}
              width={8}
              onChange={this._handleSelect}
            />
          </Form.Group>
          <Form.Button type='submit'>Invest</Form.Button>
        </Form>
        <LineChart symbol={this.props.symbol} label='Investment Value $USD' chartData={investmentData}/>
      </div>
    );
  }
}
