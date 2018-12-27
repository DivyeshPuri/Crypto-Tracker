import React, { Component } from 'react';
import axios from 'axios';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.js';
import 'uikit/dist/js/uikit-icons.js';
import CardList from './CardList';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			crypto: [],
			crypto_list: [],
			toggle: true,
			sortedData: []
		};
	}

	componentDidMount() {
		// BTC, ETH, XRP, BCH, EOS, LTC, XLM, ADA, TRON, IOT, MTL, PIVX, PART, QTUM, SC, UBIQ, LSK, SYS,
		// BNB, QASH, RDN*, REQ, GRS, AMB, BAT, GNT, POWR, VEN, PAY, OMG, ENJ, KNC, XLM, SALT, BNT, SUB,
		// ARK, ZEC, STRAT, ZRX, ANT, QSP, NAV

		axios
			.get(
				'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,BCH,EOS,LTC,XLM,IOT,SC,GNT,MTL,PIVX,PART,QTUM,UBQ,LSK,SYS,BNB,QASH,REQ,AMB,BAT,POWR,PAY,OMG,ENJ,KNC,XLM,SALT,BNT,SUB,ARK,ZEC,STRAT,ZRX,ANT,QSP&tsyms=USD'
			)
			.then(res => {
				const crypto = res.data;
				this.setState({
					crypto: crypto.RAW
				});
			});

		axios.
			get('https://min-api.cryptocompare.com/data/all/coinlist')
			.then(res => {
				const crypto_list = res.data;
				this.setState({
					crypto_list: crypto_list.Data
				});
			});
	}

	handleClick = (e) => {
		// Not a good solution should be imprved
		const myData = this.state.crypto;
		var sorted = Object.keys(myData).sort();
		var coinlist = "";
		for (let val of sorted) {
			coinlist += val + ",";
		}
		axios
			.get(
				'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + coinlist +'&tsyms=USD'
			)
			.then(res => {
				const crypto = res.data;
				this.setState({
					sortedData: crypto.RAW,
					toggle: !this.state.toggle
				});
			});
	}

	render() {
		if (Object.keys(this.state.crypto_list).length === 0) {
			return (
				<div id="loader-container">
					<div className="uk-section">
						<div className="uk-container">
							<span data-uk-spinner={''} />
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div className="App">
				<div className="uk-align-right uk-margin-large-right uk-margin-top">
					<button className="uk-button uk-button-default" type="button">SORT BY<span uk-icon="arrow-down" /></button>
					<div className="uk-margin-remove-right" uk-dropdown="mode: click; pos: bottom-justify">
						<ul className="uk-nav uk-dropdown-nav uk-text-left">
							<li onClick={this.handleClick}><a href="#"><span uk-icon="hashtag" /> BY NAME</a></li>
							<li onClick={this.handleClick}><a href="#"><span uk-icon="hashtag" /> BY POPULARITY</a></li>
						</ul>
					</div>
				</div>
					<div className="uk-section">
						<div className="uk-container">
							{
								this.state.toggle ?
								<CardList crypto_list = {this.state.crypto_list} crypto = {this.state.crypto}></CardList>:
								<CardList crypto_list = {this.state.crypto_list} crypto = {this.state.sortedData}></CardList>
							}
						</div>
					</div>
				</div>
			);
		}
	}
}

export default Home;
