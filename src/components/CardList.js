import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

class CardList extends Component {

	render() {
		if (Object.keys(this.props.crypto_list).length === 0) {
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
                <div
                    id="card-container"
                    className="uk-grid-small uk-child-width-* uk-child-width-1-6@s uk-text-center"
                    uk-grid="true"
                >
                    {Object.keys(this.props.crypto).map((key, index) => (
                        <div
                            className="card uk-card-default uk-card-hover uk-card uk-margin-large-bottom"
                            key={index}
                        >
                            <div className="uk-card-media-top uk-margin-bottom">
                                <img
                                    src={
                                        'https://www.cryptocompare.com' +
                                        this.props.crypto_list[key].ImageUrl
                                    }
                                    className="crypto-logo"
                                    alt=""
                                />
                            </div>
                            <div>
                                <h4 className="uk-card-title">
                                    <Link to={`/detail/${this.props.crypto_list[key].Symbol}`}>
                                        {this.props.crypto_list[key].FullName}
                                    </Link>
                                </h4>
                                <p>
                                    <NumberFormat
                                        className="current-price"
                                        value={parseFloat(this.props.crypto[key].USD.PRICE).toFixed(2)}
                                        prefix="$"
                                        displayType={'text'}
                                        decimalScale={2}
                                    />{' '}
                                    {this.props.crypto[key].USD.CHANGE24HOUR > 0 ? (
                                        <span className="pct-change">
                                            <NumberFormat
                                                className="pct-container"
                                                value={parseFloat(
                                                    this.props.crypto[key].USD.CHANGEPCT24HOUR
                                                ).toFixed(2)}
                                                suffix="%"
                                                displayType={'text'}
                                                decimalScale={2}
                                            />
                                            <span uk-icon="arrow-up" />
                                        </span>
                                    ) : (
                                        <span className="pct-change">
                                            <NumberFormat
                                                className="pct-container"
                                                value={parseFloat(
                                                    this.props.crypto[key].USD.CHANGEPCT24HOUR
                                                ).toFixed(2)}
                                                suffix="%"
                                                displayType={'text'}
                                                decimalScale={2}
                                            />
                                            <span uk-icon="arrow-down" />
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
			);
		}
	}
}

export default CardList;
