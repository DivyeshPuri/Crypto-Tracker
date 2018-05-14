import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state= {
      crypto: [],
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
            <span>{this.state.crypto[key]}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
