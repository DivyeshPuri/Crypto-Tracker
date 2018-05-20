import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';
import icon from './bitcoin-coin.png';
import { Button, Card, Image, Container } from 'semantic-ui-react';
import { Header,} from "semantic-ui-react";

UIkit.use(Icons);

const divStyle = {
	width: '23'
  };
  

class App extends Component {

	constructor(props) {
		super(props);

		this.state= {
			crypto: [],
			crypto_list: [],
		};
	}

	componentDidMount() {
		axios.get('https://www.cryptocompare.com/api/data/coinlist/')
		.then(res => {
			const crypto_list = res.data;
			this.setState({
				crypto_list: crypto_list.Data,
			});
			var list = '';
			var count = 0;
			for (var element in crypto_list.Data){
				if(count < 40) {
					list = list + crypto_list.Data[element].Name + ',';	
				}
				count++;
			};

			const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + list + '&tsyms=USD';
			console.log(url);

			axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + list + '&tsyms=USD')
				.then(res => {
					const crypto = res.data;
					this.setState({
						crypto: crypto.DISPLAY,
					});
				})
		})
		
	}

	render() {
		
		if(Object.keys(this.state.crypto).length === 0) {
			return (<h1>Loading...</h1>)
	  	}
		else {
			return (
				<div className="App">
					<div className="App-header">
						<Header inverted as="h1">Crypto Tracker</Header>
					</div>
						<Card.Group itemsPerRow={3} centered style={{"marginLeft" : "5%", "marginRight" : "5%", marginTop: "3%",}}>
							{Object.keys(this.state.crypto).map((key) => (
								<Card style={{"width": "23%"}}
									image={logo}
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
