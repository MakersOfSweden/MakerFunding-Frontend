import React from 'react';

// Backbone
import ProjectModel from '../../Models/Project'

import Project from '../../Components/Project'

module.exports = class Index extends React.Component
{
	constructor(props)
	{
		super(props);

		// Load model from server
		var m = new ProjectModel({
			project_id: this.props.params.project_id,
		});
		m.fetch();

		this.state = {
			model: m,
		};
	}

	render()
	{
		var _this = this;

		const childrenWithProps = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				model: _this.state.model
			})
		);

		return (
			<div>
				<Project model={this.state.model} />
				{childrenWithProps}
			</div>
		);
	}
}