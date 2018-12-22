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

class Home extends Component {

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
		if(Object.keys(this.state.crypto_list).length === 0) {
			return (
				<div id="loader-container">
					<div class="uk-section">
  						<div class="uk-container">
							<span data-uk-spinner={''} />
						</div>
					</div>
				</div>
			)
	  	}
		else {
			return (
					<div className="App">
							<div class="uk-section">
								<div class="uk-container">
									<div id="card-container" class="uk-grid-small uk-child-width-1-6@s uk-flex-center uk-text-center" uk-grid>
										{Object.keys(this.state.crypto).map((key) => (
											<div class="card uk-card-default uk-card-hover uk-card">
											<div class="uk-card-media-top">
												<img src= { 'https://www.cryptocompare.com' + this.state.crypto_list[key].ImageUrl } alt="" />
											</div>
												<div>
													<h4 class="uk-card-title"><Link to={`/detail/${this.state.crypto_list[key].Symbol}`}>{this.state.crypto_list[key].FullName}</Link></h4>
													<p>
													<NumberFormat className="current-price" value = {parseFloat(this.state.crypto[key].USD.PRICE).toFixed(2)} prefix= "$" displayType={'text'} decimalPrecision={2} /> {' '}
														{this.state.crypto[key].USD.CHANGE24HOUR > 0 ? 
														<span className="pct-change"><NumberFormat className="pct-container" value = {parseFloat(this.state.crypto[key].USD.CHANGEPCT24HOUR).toFixed(2)} suffix= "%" displayType={'text'} decimalPrecision={2} /><span uk-icon="arrow-up"></span></span> : 
														<span className="pct-change"><NumberFormat className="pct-container" value = {parseFloat(this.state.crypto[key].USD.CHANGEPCT24HOUR).toFixed(2)} suffix= "%" displayType={'text'} decimalPrecision={2} /><span uk-icon="arrow-down"></span></span>}
													</p>
												</div>
											</div>
										))}
									</div>
								</div>
						</div>
						<div class="footer uk-light">
							<div className="footer-text">
								<span>Made by Divyesh ❤️</span>
							</div>
						</div>
					</div>
			);
		}
	}
}

export default Home;