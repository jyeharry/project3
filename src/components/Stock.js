import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

import Navbar from './Navbar';
import LineGraph from './LineGraph';
import Stocks from '../stocks.js';

import classes from "../css/LineGraph.module.css";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      prevSymbol: '',
      priceData: {
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
  }

  componentDidMount() {
    console.log('Stock.js did mount/////////////////////');
    const {symbol} = this.props.match.params;
    this.setState({symbol: symbol});
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('start of componentDidUpdate method in Stock.js');
    const {symbol} = this.props.match.params;
    console.log('prevState.symbol:', prevState.symbol);
    console.log('this.state.symbol:', this.state.symbol);
    console.log('this.props.match.params.symbol:', symbol);
    console.log(prevState.symbol !== symbol);
    // if a new stock was searched, get the new stocks data
    if (prevState.symbol !== symbol) {
      Promise.all([Stocks.getIntraday(symbol), Stocks.getDays(symbol), Stocks.getWeeks(symbol), Stocks.getMonths(symbol)]).then((values) => {
      console.log('-----------------------------------------------------stock.js did update');
      console.log(values[0].dates);
        this.setState({
          symbol: symbol,
          priceData: {
            intraday: values[0],
            day: values[1],
            week: values[2],
            month: values[3]
          },
          toggledChart: {
            timePeriod: '1 day',
            quantity: 100,
            data: {
              dates: values[0].dates,
              prices: values[0].prices
            }
          }
        });
      });
    }
  }

  _handleClick = (e) => {
    console.log(JSON.parse(e.target.value));
    this.setState({toggledChart: JSON.parse(e.target.value)});
  }

  Graph = () => {
    const {symbol, prevSymbol, priceData: {intraday, day, week, month}, toggledChart} = this.state;
    // this check is to prevent the graph from rerendering multiple times as the component updates. now it just disappears until it has the data it needs
    if (symbol !== prevSymbol && toggledChart.data.prices.length > 0) {
      return (
        <div>
          <div className={classes.buttonContainer}>
            <Button value={ JSON.stringify({timePeriod: '1 day', quantity: 100, data: intraday}) } onClick={this._handleClick}>
              1 day
            </Button>
            <Button value={ JSON.stringify({timePeriod: '1 month', quantity: 20, data: day}) } onClick={this._handleClick}>
              1 month
            </Button>
            <Button value={ JSON.stringify({timePeriod: '6 months', quantity: 120, data: day}) } onClick={this._handleClick}>
              6 months
            </Button>
            <Button value={ JSON.stringify({timePeriod: '1 year', quantity: 240, data: day}) } onClick={this._handleClick}>
              1 year
            </Button>
            <Button value={ JSON.stringify({timePeriod: '5 years', quantity: 260, data: week}) } onClick={this._handleClick}>
              5 years
            </Button>
            <Button value={ JSON.stringify({timePeriod: '10 years', quantity: 120, data: month}) } onClick={this._handleClick}>
              10 years
            </Button>
            <Button value={ JSON.stringify({timePeriod: 'max', quantity: month.prices.length, data: month}) } onClick={this._handleClick}>
              max
            </Button>
          </div>
          <LineGraph symbol={symbol} data={toggledChart}/>
        </div>
      );
    } else {
      return (
        <h3>Loading...</h3>
      );
    }
  }

  render() {
    return (
      <div className={classes.container}>
        <Navbar/>
        <h1>Stock coming soon</h1>
        {this.Graph()}
      </div>
    );
  }
}

export default Stock;
