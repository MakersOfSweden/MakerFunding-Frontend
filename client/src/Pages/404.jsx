import React from 'react';
import { Link } from 'react-router'

module.exports = class Error404 extends React.Component
{
	render()
	{
		return (
			<div>
				<h1>404</h1>
				<p>Sidan du försöker visa kan inte hittas.</p>
				<Link to="/">Gå till startsidan</Link>
			</div>
		);
	}
}