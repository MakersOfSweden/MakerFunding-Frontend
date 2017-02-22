import React from 'react';
import Currency from '../Components/Currency'
import { Link } from 'react-router'
import { withRouter } from 'react-router'

module.exports = withRouter(React.createClass({
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
				<div className="uk-child-width-expand@s" data-uk-grid>
					<div className="uk-width-2-3@m">
						<div className="uk-card uk-card-default uk-card-body">
							<ul data-uk-tab>
								<li onClick={this.changePage.bind(this, "info")}><a href="#" ><span data-uk-icon="icon: heart"></span> Information</a></li>
								<li onClick={this.changePage.bind(this, "about")}><a href="#"><span data-uk-icon="icon: info"></span> Om Stockholm Makerspace</a></li>
							</ul>

							<div dangerouslySetInnerHTML={content} />
						</div>
					</div>
					<div className="uk-width-1-3@m">
						<div className="uk-card uk-card-default uk-card-body">
							<div className="uk-child-width-expand@s" data-uk-grid>
								<div className="uk-width-2-3@m">
									<h3><Currency value={this.state.model.funding_status} currency={this.state.model.currency} /></h3>
								</div>
								<div className="uk-width-1-3@m">
									<div className="uk-align-right">
										<h3>{percent}%</h3>
									</div>
								</div>
							</div>
							<progress className="uk-progress uk-margin-remove-top" value={bar} max="100"></progress>

							<p>av målet <Currency value={this.state.model.funding_goal} currency={this.state.model.currency} /></p>

							<h3>{this.state.model.num_contributors} personer</h3>
							<p>har bidragit till projektet</p>
							<Link to={"/projekt/" + this.props.params.project_id + "/bidra"} className="uk-button uk-button-primary uk-button-large"><span data-uk-icon="icon: heart" /> Bidra till projektet</Link>
						</div>
					</div>
				</div>
			</div>
		);
	},
}));