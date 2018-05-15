import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state= {
      crypto: [],
      crypto_list: [],
    };
  }

  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
    .then(res => {
      const crypto = res.data;
      this.setState({
        crypto: crypto,
      });
    })

    axios.get('https://www.cryptocompare.com/api/data/coinlist/')
    .then(res => {
      const crypto_list = res.data;
      console.log(crypto_list);
      this.setState({
        crypto_list: crypto_list,
      });
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        {Object.keys(this.state.crypto).map((key) => (
          <div>
            <span>{key}</span>
            <span>{this.state.crypto[key].USD}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
