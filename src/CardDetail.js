import React, { Component } from 'react';
import axios from 'axios';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import moment from 'moment';

class CardDetail extends Component {

    constructor(props) {
		super(props);
		this.state= {
			plot: [],
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
                    d: moment(data.Data[date].time*1000).format('MMM DD YYYY'),
                    p: data.Data[date].close.toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
                    x: count, 
                    y: data.Data[date].close
                });
                count++;
            }
			this.setState({
				plot: sortedData,
            });
		})
    }

  render() {
      console.log(this.state.plot);
    return (
        <div>
            <h1>Card Detail</h1>
            <div>
                <AreaChart width={600} height={400} data={this.state.plot}
                    margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                    <CartesianGrid vertical={false} horizontal={false} strokeDasharray="3 3"/>
                    <XAxis dataKey="d"/>
                    <YAxis dataKey="y"/>
                    <Tooltip/>
                    <Area type='curveLinear' dataKey='y' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
            </div>
        </div>
    );
  }
}

export default CardDetail;