import React from 'react';
import Receipt from '../../Components/Receipt'

module.exports = class Receipt extends React.Component
{
	render()
	{
		return (
			<Receipt model={this.props.model} />
		);
	}
}