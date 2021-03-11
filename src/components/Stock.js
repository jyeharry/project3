import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

import Navbar from './Navbar';
import LineGraph from './LineGraph';
import LineChart from './LineChart';
import InvestmentCalculator from './InvestmentCalculator';

import Stocks from '../stocks.js';
import classes from "../css/LineGraph.module.css";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      stockData: {
        intraday: {
          dates: [],
          prices: []
        },
        day: {
          dates: [],
          prices: []
        },
        week: {
          dates: [],
          prices: []
        },
        month: {
          dates: [],
          prices: []
        },
      },
      toggledChart: {
        timePeriod: '',
        quantity: 0,
        data: {
          dates: [],
          prices: []
        }
      }
    };
    this.requestData = this.requestData.bind(this);
  }

  componentDidMount() {
    this.requestData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.symbol === this.props.match.params.symbol) return;
    this.requestData();
  }

  requestData() {
    const {symbol} = this.props.match.params;
    Promise.all([Stocks.getIntraday(symbol), Stocks.getDays(symbol), Stocks.getWeeks(symbol), Stocks.getMonths(symbol)]).then((values) => {
      this.setState({
        symbol: symbol,
        stockData: {
          intraday: {...values[0]},
          day: {...values[1]},
          week: {...values[2]},
          month: {...values[3]}
        },
        toggledChart: {
          timePeriod: '1 day',
          quantity: 100,
          data: {
            dates: [...values[0].dates],
            prices: [...values[0].prices]
          }
        }
      });
    });
  }

  _handleClick = (e) => {
    this.setState({toggledChart: {...JSON.parse(e.target.value)}});
  }

  render() {
    const {symbol, stockData, toggledChart} = this.state;
    return (
      <>
        <Navbar/>
        <div className={classes.container}>
          <h1>Stock coming soon</h1>
          {this.state.toggledChart.data.prices.length > 0 && <InteractiveChart symbol={symbol} stockData={stockData} toggledChart={toggledChart} handleClick={this._handleClick} />}
          {this.state.toggledChart.data.prices.length > 0 && <InvestmentCalculator symbol={symbol} chartData={stockData.month}/>}
        </div>
      </>
    );
  }
}

const InteractiveChart = (props) => {
  const {symbol, stockData: {intraday, day, week, month}, toggledChart, handleClick} = props;
  return (
    <div className="interactiveChart">
      <div className={classes.buttonContainer}>
        <Button value={ JSON.stringify({timePeriod: '1 day', quantity: 100, data: intraday}) } onClick={handleClick}>
          1 day
        </Button>
        <Button value={ JSON.stringify({timePeriod: '1 month', quantity: 20, data: day}) } onClick={handleClick}>
          1 month
        </Button>
        <Button value={ JSON.stringify({timePeriod: '6 months', quantity: 120, data: day}) } onClick={handleClick}>
          6 months
        </Button>
        <Button value={ JSON.stringify({timePeriod: '1 year', quantity: 240, data: day}) } onClick={handleClick}>
          1 year
        </Button>
        <Button value={ JSON.stringify({timePeriod: '5 years', quantity: 260, data: week}) } onClick={handleClick}>
          5 years
        </Button>
        <Button value={ JSON.stringify({timePeriod: '10 years', quantity: 120, data: month}) } onClick={handleClick}>
          10 years
        </Button>
        <Button value={ JSON.stringify({timePeriod: 'max', quantity: month.prices.length, data: month}) } onClick={handleClick}>
          max
        </Button>
      </div>
      <LineChart symbol={symbol} label='Share Price $USD' chartData={toggledChart}/>
    </div>
  )
}

export default Stock;
