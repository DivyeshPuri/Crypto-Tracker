import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.js';
import 'uikit/dist/js/uikit-icons.js';
import NumberFormat from "react-number-format";
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';
import CardDetail from './CardDetail';
import Home from './Home';
class App extends Component {

	constructor(props) {
		super(props);
		this.state= {
			crypto: [],
			crypto_list: [],
			images: {},
		};
	}

	componentDidMount() {
		//BTC,ETH,XRP,BCH,EOS,LTC,XLM,ADA,TRON,IOT
		//MTL,PIVX,PART,QTUM,SC,UBIQ,LSK,SYS,BNB,QASH,RDN*,REQ,GRS,AMB,BAT,GNT,POWR,VEN,PAY,OMG,ENJ,KNC,XLM,SALT,BNT,SUB,ARK,ZEC,STRAT
		//ZRX,ANT,QSP,NAV
		
		axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,BCH,EOS,LTC,XLM,ADA,IOT,SC,GNT,MTL,PIVX,PART,QTUM,UBQ,LSK,SYS,BNB,QASH,REQ,AMB,BAT,POWR,PAY,OMG,ENJ,KNC,XLM,SALT,BNT,SUB,ARK,ZEC,STRAT,ZRX,ANT,QSP&tsyms=USD')
		.then(res => {
			const crypto = res.data;
			this.setState({
				crypto: crypto.RAW,
			});
		})

		axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
		.then(res => {
			const crypto_list = res.data;
			this.setState({
				crypto_list: crypto_list.Data,
			});
		})
	}
	render() {
		return (
			<Router>
				<div className="App">
					<div className="container">
						<nav class="uk-navbar-container uk-light uk-flex" uk-navbar style={{"backgroundColor": "#39f"}}>
							<div class="uk-navbar-left">
								<ul class="uk-navbar-nav">
									<li class="uk-active"><a>Coin-Tracker</a></li>
								</ul>
							</div>
							<div class="uk-navbar-right">
								<ul class="uk-navbar-nav">
									<li class="uk-active"><Link to="/"><span uk-icon="home"></span></Link></li>
									<li class="uk-active"><a href="https://github.com/DivyeshPuri/Crpto-Tracker"><span uk-icon="code"></span></a></li>
									<li class="uk-active"><a href="https://getuikit.com"><span uk-icon="uikit"></span></a></li>
								</ul>
							</div>
						</nav>
						<Route exact path="/detail/:name"  component={CardDetail} />
						<Route exact path="/" component={Home} />
					</div>
					<div class="footer uk-light">
						<div className="footer-text">
							<span>Made by Divyesh ❤️</span>
						</div>
					</div>
				</div>
			</Router>	
		);
	}
}
export default App;
