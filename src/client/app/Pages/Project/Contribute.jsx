import React from 'react';
import ContributorForm from '../../Components/ContributorForm'

// Backbone
import ContributorModel from '../../Models/Contributor'

module.exports = class Contribute extends React.Component
{
	constructor(props)
	{
		super(props);

		var m = new ContributorModel;
		m.set({
			project_id: 1337, // TODO: Hardcoded
			project_title: "MEEP MEEP", // TODO: Hardcoded
		});

		this.state = {
			model: m,
		};
	}

	render()
	{
		return (
			<div>
				<ContributorForm model={this.state.model} />
			</div>
		);
	}
}