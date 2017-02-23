import React from 'react'

module.exports = React.createClass({
	render: function()
	{
		var formatter = new Intl.NumberFormat('sv-SE', {
			/*
			style: 'currency',
			currency: 'SEK',
			*/
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		});

		var value = formatter.format(this.props.value);
		return (<span>{value} {this.props.currency}</span>);
	},
});