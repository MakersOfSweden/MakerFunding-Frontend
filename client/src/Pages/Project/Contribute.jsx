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
			project_id: this.props.model.get("project_id"),
			project_title: this.props.model.get("title"),
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