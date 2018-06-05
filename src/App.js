import axios from 'axios';
import React, { Component } from 'react';
import { Button, Card, Image, Header } from 'semantic-ui-react'
import './App.css';
import { Icon } from 'semantic-ui-react';
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
		
		axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,BCH,EOS,LTC,XLM,ADA,TRON,IOT,SC,GNT,MTL,PIVX,PART,QTUM,UBQ,LSK,SYS,BNB,QASH,REQ,AMB,BAT,POWR,VEN,PAY,OMG,ENJ,KNC,XLM,SALT,BNT,SUB,ARK,ZEC,STRAT,ZRX,ANT,QSP&tsyms=USD')
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


	differenceNum(firstNum, secondNum) {
		if (firstNum - secondNum > 0) {
			return true;
		}
		else {
			return false;
		}
	}


	render() {
		if(Object.keys(this.state.crypto_list).length === 0) {
			return (
				<div>
					<div class="ui segment">
  						<div class="ui active inverted dimmer" style={{"height" : "100vh"}}>
							<div class="ui text loader">Loading</div>
						</div>
						<p></p>
					</div>
				</div>
			)
	  	}
		else {
			return (
				<div className="App">
					<div className="App-header">
						<h1 className="header-content">Crypto-Tracker</h1>
					</div>
						<Card.Group itemsPerRow={3} centered style={{"marginLeft" : "5%", "marginRight" : "5%", marginTop: "3%",}} secondary>
							{Object.keys(this.state.crypto).map((key) => (
								<Card>
									<Card.Content>
										<Image className="image" size='tiny' src= { 'https://www.cryptocompare.com' + this.state.crypto_list[key].ImageUrl } />
											<Card.Header>{this.state.crypto_list[key].FullName}</Card.Header>
											<Card.Meta><NumberFormat value = {parseFloat(this.state.crypto[key].USD.PRICE).toFixed(2)} prefix= "$" displayType={'text'} decimalPrecision={2} />
												{this.state.crypto[key].USD.CHANGE24HOUR > 0 ? 
												<span className="pct-change"><NumberFormat value = {parseFloat(this.state.crypto[key].USD.CHANGEPCT24HOUR).toFixed(2)} prefix= "%" displayType={'text'} decimalPrecision={2} /><Icon disabled name='arrow up' /></span> : 
												<span className="pct-change"><NumberFormat value = {parseFloat(this.state.crypto[key].USD.CHANGEPCT24HOUR).toFixed(2)} prefix= "%" displayType={'text'} decimalPrecision={2} /><Icon disabled name='arrow down' /></span>}
											</Card.Meta>
											<Card.Description>{this.state.crypto[key].USD.MARKET}</Card.Description>
									</Card.Content>
								</Card>
							))}
						</Card.Group>
				</div>

			);
		}
	}
}

export default App;
