import React, { Component } from 'react';
import axios from 'axios';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import moment from 'moment';
import NumberFormat from "react-number-format";

class CardDetail extends Component {

	constructor(props) {
		super(props);
		this.state= {
			plot: [],
			coin: []
		};
	}

	componentDidMount() {
		axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${this.props.match.params['name']}&tsym=USD&limit=30`)
		.then(res => {
			const data = res.data;
			let sortedData = [];
			let count = 0;
			for (let date in data.Data){
				sortedData.push({
					day: moment(data.Data[date].time*1000).format('MMM DD YYYY'),
					p: data.Data[date].close.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
					x: count, 
					Price: data.Data[date].close
				});
				count++;
			}
			this.setState({
				plot: sortedData,
			});
		})
		
		axios.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.props.match.params['name']}&tsyms=USD`)
		.then(res => {
			const data = res.data;
			this.setState({
				coin: data.RAW[this.props.match.params['name']],
			});
		})
	}

  render() {
	  console.log(this.state.coin);
	  if(Object.keys(this.state.coin).length === 0) {
		  return (
			<div id="loader-container">
					<div class="uk-section">
  						<div class="uk-container">
							<span data-uk-spinner={''} />
						</div>
					</div>
				</div>
		  );
	  }
	  else {
		return (
			<div className="uk-container uk-text-lead uk-text-left text-primary">
				<div uk-grid="true" className="uk-grid-large uk-child-width-expand@s uk-margin-large-top">
					<div className="uk-width-1-2@s">
						<h1 className='text-primary'>
							{this.state.coin['USD'].FROMSYMBOL}
							{this.state.coin['USD'].CHANGE24HOUR > 0 ? 
								<span className="uk-text-lead uk-text-success"><NumberFormat className="pct-container" value = {parseFloat(this.state.coin['USD'].CHANGEPCT24HOUR).toFixed(2)} suffix= "% )" prefix=" ( " displayType={'text'} decimalPrecision={2} /></span> : 
								<span className="uk-text-lead uk-text-danger"><NumberFormat className="pct-container" value = {parseFloat(this.state.coin['USD'].CHANGEPCT24HOUR).toFixed(2)} suffix= "% )" prefix=" ( " displayType={'text'} decimalPrecision={2} /></span>}
						</h1>
						<div uk-grid="true" className="uk-margin-large-top uk-grid-large uk-child-width-expand@s">
							<div className="uk-width-1-2@s">
								<div classname="uk-text-left">
									<span>Current Price:</span>
									<h3><NumberFormat className="pct-container" value = {parseFloat(this.state.coin['USD'].PRICE).toFixed(2)} prefix="$ " displayType={'text'} decimalPrecision={2} /></h3>
								</div>
								<div classname="uk-text-left">
									<span>Volume 24h:</span>
									<h3><NumberFormat className="pct-container" value = {parseFloat(this.state.coin['USD'].VOLUME24HOUR).toFixed(2)} displayType={'text'} decimalPrecision={2} /></h3>
								</div>
							</div>
							<div className="uk-width-1-2@s">
								<div classname="uk-text-left">
									<span>Market Cap:</span>
									<h3><NumberFormat className="pct-container" value = {parseFloat(this.state.coin['USD'].MKTCAP).toFixed(2)} displayType={'text'} decimalPrecision={2} /></h3>
								</div>
								<div classname="uk-text-left">
									<span>Volume 1h:</span>
									<h3><NumberFormat className="pct-container" value = {parseFloat(this.state.coin['USD'].VOLUMEHOUR).toFixed(2)} displayType={'text'} decimalPrecision={2} /></h3>
								</div>
							</div>
						</div>
					</div>
					<div className="uk-width-1-2@s uk-text-small">
						<AreaChart width={600} height={400} data={this.state.plot}
							margin={{top: 10, right: 30, left: 0, bottom: 0}}>
							<CartesianGrid vertical={false} horizontal={false} strokeDasharray="3 3"/>
							<XAxis dataKey="day"/>
							<YAxis dataKey="Price"/>
							<Tooltip/>
							<Area type='curveLinear' dataKey='Price' stroke='rgb(51, 153, 255)' fill='rgb(51, 153, 255)' />
						</AreaChart>
					</div>
				</div>
			</div>
		);
	  }
  }
}

export default CardDetail;