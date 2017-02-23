import React from 'react';
import { Link } from 'react-router'

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function()
	{
		return (
			<div className="uk-margin-top uk-margin-bottom">
				<h1>Tack för ditt bidrag</h1>
				<p>Spaghettimonstret har välsignat dig!</p>

				<Link to={"/projekt/" + this.state.model.project_id} className="uk-button uk-button-primary">Tillbaka till projektet</Link>
			</div>
		);
	}
});