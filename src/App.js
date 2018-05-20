import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';

UIkit.use(Icons);

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
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<div class="uk-grid uk-container-center uk-margin-large-left" >
					{Object.keys(this.state.crypto).map((key) => (
						<div class="uk-card uk-card-default uk-width-1-4 uk-margin-left uk-margin-large-top" data-uk-grid-margin>
							<div class="uk-card-header">
								<div class="uk-grid-small uk-flex-middle" uk-grid>
									<div class="uk-width-auto">
										Symbol here: {this.state.crypto[key].USD.TOSYMBOL}
									</div>
									<div class="uk-width-expand">
										<h3 class="uk-card-title uk-margin-remove-bottom">{key}</h3>
										<p class="uk-text-meta uk-margin-remove-top">{this.state.crypto[key].USD.LOWDAY}</p>
									</div>
								</div>
							</div>
							<div class="uk-card-body">
								<p>{this.state.crypto[key].USD.VOLUME24HOUR}</p>
							</div>
							<div class="uk-card-footer">
								<a href="#" class="uk-button uk-button-text">{this.state.crypto[key].USD.PRICE}</a>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default App;
