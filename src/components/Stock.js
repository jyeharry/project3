import React, {Component} from 'react';

import Navbar from './Navbar';
import LineGraph from './LineGraph';
import Stocks from '../stocks.js';

class Stock extends Component {
  constructor() {
    super();
    this.state = {
      symbol: '',
      chartData: [],
      dates: [],

    };
  }

  componentDidMount() {
    const {symbol} = this.props.match.params;
    this.setState({symbol: symbol})
    // Stocks.getIntraday(symbol).then((data) => {
    //   this.setState({chartData: data});
    //   console.log(data);
    // });
  }

  render() {
    return (
      <div>
        <Navbar/>
        <h1>Stock coming soon</h1>
        <LineGraph/>
      </div>
    );
  }
}

const ChartInfo = (props) => {
  if (props.prices === null) return (<div>Loading...</div>);
  return props.prices.map((price, i) => (<p key={i}>{price}</p>));
}

export default Stock;
