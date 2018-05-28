import axios from 'axios';
import React, { Component } from 'react';
import { Card, Header } from 'semantic-ui-react';
import './App.css';


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
		axios.get('https://www.cryptocompare.com/api/data/coinlist/')
		.then(res => {
			const crypto_list = res.data;
			this.setState({
				crypto_list: crypto_list.Data,
			});
		})

		//BTC,ETH,XRP,BCH,EOS,LTC,XLM,ADA,TRON,IOT
		//MTL,PIVX,PART,QTUM,SC,UBIQ,LSK,SYS,BNB,QASH,RDN*,REQ,GRS,AMB,BAT,GNT,POWR,VEN,PAY,OMG,ENJ,KNC,XLM,SALT,BNT,SUB,ARK,ZEC,STRAT
		//ZRX,ANT,QSP,NAV
		
		axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XRP,BCH,EOS,LTC,XLM,ADA,TRON,IOT,SC,GNT,MTL,PIVX,PART,QTUM,UBQ,LSK,SYS,BNB,QASH,REQ,AMB,BAT,POWR,VEN,PAY,OMG,ENJ,KNC,XLM,SALT,BNT,SUB,ARK,ZEC,STRAT,ZRX,ANT,QSP&tsyms=USD')
		.then(res => {
			const crypto = res.data;
			this.setState({
				crypto: crypto.DISPLAY,
			});
		})
	}

	render() {
		if(Object.keys(this.state.crypto).length === 0) {
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
						<Header inverted as="h1">Crypto Tracker</Header>
					</div>
						<Card.Group itemsPerRow={3} centered style={{"marginLeft" : "5%", "marginRight" : "5%", marginTop: "3%",}} secondary>
							{Object.keys(this.state.crypto).map((key) => (
								<Card style={{"width": "18%", "height": "18%"}}
									image= { require('./images/' + key + '.svg') }
									header={key}
									meta={this.state.crypto[key].USD.PRICE}
									description={this.state.crypto[key].USD.LASTMARKET}
									extra={this.state.crypto[key].USD.LOWDAY}
								/>
							))}
						</Card.Group>
				</div>
			);
		}
	}
}

export default App;
