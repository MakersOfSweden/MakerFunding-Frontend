import React from 'react';
import { Link, withRouter } from 'react-router'

module.exports = withRouter(React.createClass({
	mixins: [Backbone.React.Component.mixin],

	back: function()
	{
		this.props.model.fetch();
		this.props.router.push("/projekt/" + this.state.model.project_id);
	},

	render: function()
	{
		return (
			<div className="uk-margin-top uk-margin-bottom">
				<h2>Tack för ditt bidrag</h2>

				<p>Kvitton kommer att mailas ut manuellt efter att projektet har nått sitt mål.</p>

				<p>Om du har bidragit från ditt företag och behöver en faktura att bokföra, kontakta ekonomi@makerspace.se</p>

				<button onClick={this.back} className="uk-button uk-button-primary">Tillbaka till projektet</button>
			</div>
		);
	}
}));