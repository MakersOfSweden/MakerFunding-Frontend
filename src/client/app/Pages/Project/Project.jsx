import React from 'react';
import ProjectInfo from '../../Components/ProjectInfo'

module.exports = class Project extends React.Component
{
	render()
	{
		return (
			<ProjectInfo model={this.props.model} />
		);
	}
}