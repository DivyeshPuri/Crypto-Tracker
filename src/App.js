import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import UIkit from 'uikit';
import 'uikit/dist/css/uikit.min.css';
import NumberFormat from "react-number-format";

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

		axios.get('https://www.cryptocompare.com/api/data/coinlist/')
		.then(res => {
			const crypto_list = res.data;
			this.setState({
				crypto_list: crypto_list.Data,
			});
		})
	}

	render() {
		if(Object.keys(this.state.crypto_list).length === 0) {
			return (
				<div>
					<div class="ui segment">
  						<div class="ui active inverted dimmer" style={{"height" : "100vh"}}>
							<div class="ui text loader">Loading</div>
						</div>
					</div>
				</div>
			)
	  	}
		else {
			return (
				<div className="App">
				<nav class="uk-navbar-container uk-light uk-flex" uk-navbar style={{"backgroundColor": "#39f"}}>
					<div class="uk-navbar-left">
						<ul class="uk-navbar-nav">
							<li class="uk-active"><a>Coin-Tracker</a></li>
						</ul>
					</div>
					<div class="uk-navbar-right">
						<ul class="uk-navbar-nav">
							<li class="uk-active"><a href="#">Why this?</a></li>
						</ul>
					</div>
				</nav>
					<div class="uk-section">
						<div class="uk-container">
							<div id="card-container" class="uk-grid-small uk-child-width-1-4@s uk-flex-center uk-text-center" uk-grid uk-height-match="target: > div > .uk-card">
								{Object.keys(this.state.crypto).map((key) => (
									<div class="uk-card uk-card-hover uk-card-body" style={{"marginBottom": "10px"}}>
									<div class="uk-card-media-top">
										<img src= { 'https://www.cryptocompare.com' + this.state.crypto_list[key].ImageUrl } alt="" />
									</div>
										<div>
											<h3 class="uk-card-title">{this.state.crypto_list[key].FullName}</h3>
											<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
										</div>
									</div>
								))}
							</div>
						</div>
				</div>
				</div>

			);
		}
	}
}

export default App;
