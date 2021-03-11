import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';

import LineGraph from './LineGraph';
import LineChart from './LineChart';

export default class InvestmentCalculator extends Component {
  constructor() {
    super();
    this.state = {
      investment: 0,
      numOfMonths: 12,
      regularInvestment: 0,
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
        valueAsNumber: regularInvestment
      }
    } = e.target;
    const numOfMonths = years * 12;
    const investmentValues = this.calculateInvestmentValues(investment, regularInvestment, numOfMonths);
    this.setState({
      investment: investment,
      regularInvestment: regularInvestment,
      numOfMonths: numOfMonths,
      investmentValues: [...investmentValues],
    });

  }

  _handleSelect = (e, {value}) => {
    value = JSON.parse(value);
    this.setState({multiplier: value.multiplier, frequency: value.frequency});
  }

  // maps share prices with investment while adding regularInvestment in order to get data needed for users chart
  calculateInvestmentValues = (investment, regularInvestment, numOfMonths) => {
    const {prices} = this.props.chartData;
    const {multiplier, frequency} = this.state;
    let newPrices = [...prices.slice(prices.length - numOfMonths)];
    return newPrices.map((current, i) => {
      if (i % frequency === 0) investment += regularInvestment * multiplier;
      if (i === 0) return investment;
      return investment *= newPrices[i] / newPrices[i-1];
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
        <Form onSubmit={this._handleSubmit}>
          <Form.Group>
            <Form.Input
              fluid
              type='number'
              label='Initial investment'
              placeholder='$10,000'
              width={4}
            />
            <Form.Input
              fluid
              type='number'
              label='Investment period in years (max 20)'
              placeholder='20 years'
              width={4}
              max={20}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              fluid
              label='Regular investment'
              type='number'
              placeholder='$1,000'
              width={4}
            />
            <Form.Select
              fluid
              label='Investment frequency'
              placeholder='Frequency'
              options={options}
              width={4}
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
