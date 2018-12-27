import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './Navbar';
import CardDetail from './CardDetail';
import Home from './Home';
import Footer from './Footer';

import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.js';
import 'uikit/dist/js/uikit-icons.js';
import '../styles/App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<div className="container">
						<Navbar />
						<Route exact path="/detail/:name" component={CardDetail} />
						<Route exact path="/" component={Home} />
					</div>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
