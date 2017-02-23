import React from 'react';

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	getInitialState: function()
	{
		return {
			page: "info",
		};
	},

	changePage: function(page)
	{
		this.setState({page});
	},

	render: function()
	{
		if(this.state.page == "info")
		{
			var content = {__html: this.state.model.info };
		}
		else if(this.state.page == "about")
		{
			var content = {__html: this.state.model.about };
		}

		var percent = Math.floor(this.state.model.funding_status / this.state.model.funding_goal * 100);
		var bar = Math.min(percent, 100);

		return (
			<div>
				<h1 className="uk-heading-primary">{this.state.model.title}</h1>

				<div className="uk-cover-container uk-light">
					<canvas width="1000" height="564"></canvas>
					<img src={this.state.model.image} alt="Projektbild" data-uk-cover />
				</div>
			</div>
		);
	},
});