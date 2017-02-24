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
				<Projects collection={this.state.collection} />
			</div>
		);
	}
}