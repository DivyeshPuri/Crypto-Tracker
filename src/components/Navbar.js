import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => (
	<nav className="uk-navbar-container uk-light uk-flex" uk-navbar="true" style={{ backgroundColor: '#39f' }}>
		<div className="uk-navbar-left">
			<ul className="uk-navbar-nav">
				<li className="uk-active">
					<Link to="/">Coin-Tracker</Link>
				</li>
			</ul>
		</div>
		<div className="uk-navbar-right">
			<ul className="uk-navbar-nav">
				<li className="uk-active">
					<Link to="/">
						<span uk-icon="home" />
					</Link>
				</li>
				<li className="uk-active">
					<a href="https://github.com/DivyeshPuri/Crpto-Tracker">
						<span uk-icon="code" />
					</a>
				</li>
				<li className="uk-active">
					<a href="https://getuikit.com">
						<span uk-icon="uikit" />
					</a>
				</li>
			</ul>
		</div>
	</nav>
);

export default Navbar;
