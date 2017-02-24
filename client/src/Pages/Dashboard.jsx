import React from 'react';

// Backbone
import ProjectCollection from '../Collections/Project'

import Projects from '../Components/Projects'

module.exports = class Dashboard extends React.Component
{
	constructor(props)
	{
		super(props);

		var c = new ProjectCollection;
		c.fetch();

		this.state = {
			collection: c,
		};
	}

	render()
	{
		return (
			<div>
				<h2>Välkommen till MakerFunding.se</h2>
				<p>Det här är en sida av makers för makers. Sidan drivs av ideellt av Stockholm Makerspace.</p>

				<Projects collection={this.state.collection} />
			</div>
		);
	}
}