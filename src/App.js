import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

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

			const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + list + '&tsyms=USD';
			console.log(url);

			axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + list + '&tsyms=USD')
				.then(res => {
					const crypto = res.data;
					this.setState({
						crypto: crypto,
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
