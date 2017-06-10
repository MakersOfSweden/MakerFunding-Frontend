import React from 'react'
import BackboneReact from 'backbone-react-component'

import { Link } from 'react-router'
import Currency from '../Components/Currency'

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	renderEntity: function(row, i)
	{
		var percent = Math.floor(row.funding_status / row.funding_goal * 100);
		var bar = Math.min(percent, 100);

		return (
			<div key={row.project_id} className="projectBrief">
				<div className="projectImage uk-cover-container uk-light">
					<Link to={"/projekt/" + row.project_id}>
						{row.status == "funded" ?
							<div className="funded_wrapper">
								<img src="/images/funded.png" className="funded" />
							</div>
						: ""}
						<img src={row.image} alt="Projektbild" />
					</Link>
				</div>
				<div className="uk-card uk-card-default uk-card-body">
					<Link to={"/projekt/" + row.project_id}><h4 className="uk-margin-remove">{row.title}</h4></Link>

					<p>{row.brief}</p>
					<progress className="uk-progress uk-margin-remove-top" value={bar} max="100"></progress>

					<div className="uk-child-width-expand@s" data-uk-grid>
						<div className="uk-width-1-3@m">
							<div className="uk-align-left">
								<h4>{percent}%</h4>
								<p>finansierat</p>
							</div>
						</div>
						<div className="uk-width-1-3@m">
							<div className="">
								<h4><Currency value={row.funding_goal} currency="kr" /></h4>
								<p>mål</p>
							</div>
						</div>
						<div className="uk-width-1-3@m">
							<div className="uk-align-right">
								<h4>{row.num_contributors}</h4>
								<p>uppbackare</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},

	render: function()
	{
		return (
			<div>
				<div className="uk-child-width-expand@s" data-uk-grid>
					{this.state.collection.map(this.renderEntity)}
				</div>
			</div>
		);
	},
});