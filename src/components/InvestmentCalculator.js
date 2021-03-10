import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';

import LineGraph from './LineGraph';

export default class InvestmentCalculator extends Component {
  constructor() {
    super();
    this.state = {
      investment: 0,
      period: 0,
      regularInvestment: 0,
      multiplier: 0,
      frequency: 0,
      investmentValues: []
    }
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this.calculateInvestmentData = this.calculateInvestmentData.bind(this);
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const { // destructure form inputs
      0: {
        valueAsNumber: investment
      },
      1: {
        valueAsNumber: period
      },
      2: {
        valueAsNumber: regularInvestment
      }
    } = e.target;
    const investmentValues = this.calculateInvestmentData(investment, regularInvestment);
    this.setState({
      investment: investment,
      period: period,
      regularInvestment: regularInvestment,
      investmentValues: investmentValues,
    });
  }

  _handleSelect = (e) => {
    let multiplier = 0, frequency = 0;
    const {innerText: select} = e.target;
    if (select === 'Weekly') {
      multiplier = 4;
      frequency = 1;
    } else if (select === 'Fortnightly') {
      multiplier = 2;
      frequency = 1;
    } else if (select === 'Monthly') {
      multiplier = 1;
      frequency = 1;
    } else if (select === 'Quarterly') {
      multiplier = 1;
      frequency = 3;
    } else if (select === 'Yearly') {
      multiplier = 1;
      frequency = 12;
    }
    this.setState({multiplier: multiplier, frequency: frequency});
  }

  // maps share prices with investment while adding regularInvestment in order to get data needed for users chart
  calculateInvestmentData = (investment, regularInvestment) => {
    const {prices} = this.props.chartData;
    let {multiplier, frequency} = this.state;
    return prices.map((current, i) => {
      if (i === 0) return investment;
      investment *= prices[i] / prices[i-1];
      if (i % frequency === 0) investment += regularInvestment * multiplier;
      return investment;
    });
  }

  render() {
    const options = [
      { key: '0', text: 'Weekly', value: 'Weekly' },
      { key: '1', text: 'Fortnightly', value: 'Fortnightly' },
      { key: '2', text: 'Monthly', value: 'Monthly' },
      { key: '3', text: 'Quarterly', value: 'Quarterly' },
      { key: '4', text: 'Yearly', value: 'Yearly' },
    ];
    const investmentData = {
      quantity: this.state.period,
      data: {
        dates: this.props.chartData.dates,
        prices: this.state.investmentValues,
      }
    };
    return (
      <div className='investmentGraph'>
        <Form onSubmit={this._handleSubmit}>
          <Form.Group>
            <Form.Input fluid type='number' label='Initial investment' placeholder='$10,000' width={4} />
            <Form.Input fluid type='number' label='Investment period in years (max 20)' placeholder='20 years' width={4} max={20} />
          </Form.Group>
          <Form.Group>
            <Form.Input fluid label='Regular investment' type='number' placeholder='$1,000' width={4} />
            <Form.Select fluid label='Investment frequency' placeholder='Frequency' options={options} width={4} onChange={this._handleSelect} />
          </Form.Group>
          <Form.Button type='submit'>Invest</Form.Button>
        </Form>
        <LineGraph symbol={this.props.symbol} chartData={investmentData} />
      </div>
    );
  }
}
