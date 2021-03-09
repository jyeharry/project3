import React, {Component} from 'react';

import Navbar from './Navbar';
import LineGraph from './LineGraph';
import Stocks from '../stocks.js';

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      prevSymbol: '',
      dates: [],
      prices: [],
    };
  }

  componentDidMount() {
    console.log('Stock.js did mount ----------------------------------------');
    const {symbol} = this.props.match.params;
    this.setState({symbol: symbol});
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('');
    console.log('start of componentDidUpdate method in Stock.js ////////////////////////////////////////////////////////');
    console.log('this.state.symbol:', this.state.symbol);
    console.log('prevState.symbol:', prevState.symbol);
    console.log('end of componentDidUpdate method in Stock.js ////////////////////////////////////////////////////////');
    const {symbol} = this.props.match.params;
    if (prevState.symbol !== symbol) {
      Stocks.getXMonths(symbol, 240).then((data) => {
        this.setState({symbol: symbol, prevSymbol: prevState.symbol, dates: data.dates, prices: data.prices});
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar/>
        <h1>Stock coming soon</h1>
        {this.state.symbol !== this.state.prevSymbol && this.state.prices.length > 0 && <LineGraph symbol={this.state.symbol} dates={this.state.dates} prices={this.state.prices}/>}
      </div>
    );
  }
}

export default Stock;
