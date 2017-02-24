// Load jQuery and UIkit
import $ from 'jquery'; 
import UIkit from 'uikit'

// React
import React from 'react';
import ReactDOM from 'react-dom';
import {
		Link,
		Router,
		browserHistory,
} from 'react-router'

class App extends React.Component
{
	render()
	{
		return (
			<div>
				<nav className="uk-navbar-container uk-margin" data-uk-navbar>
					<div className="uk-background-secondary uk-light" style={{width: "100%"}}>
						<div className="uk-navbar-left">
							<a href="/" className="uk-navbar-item uk-logo"><img src="/images/logo.png" alt="MakerFunding.se logo" style={{maxWidth: "250px"}} /></a>
							<ul className="uk-navbar-nav">
								<li><Link to="/"><span data-uk-icon="icon: nut"></span>&nbsp;&nbsp;Projekt</Link></li>
								<li><Link to="/villkor"><span data-uk-icon="icon: copy"></span>&nbsp;&nbsp;Användarvillkor</Link></li>
								<li><Link to="/om-makerfunding"><span data-uk-icon="icon: info"></span>&nbsp;&nbsp;Om MakerFunding.se</Link></li>
							</ul>
						</div>
					</div>
				</nav>

				<div className="uk-container uk-margin-top uk-margin-bottom">
					{this.props.children}
				</div>

				<div>
					<footer className="uk-padding-remove-horizontal">
						<div className="uk-dark uk-background-secondary uk-padding">
							<p className="uk-margin-remove-bottom">MakerFunding.se är en crowdfundingsida som drivs ideellt av Stockholm Makerspace. Copyright &copy; 2017 Stockholm Makerspace</p>
						</div>
					</footer>
				</div>
			</div>
		);
	}
}

const rootRoute = {
	childRoutes: [
		{
			path: "/",
			component: App,
			indexRoute: {
				component: require("./Pages/Dashboard"),
			},
			childRoutes: [
				{
					path: "villkor",
					component: require("./Pages/Terms"),
				},
				{
					path: "om-makerfunding",
					component: require("./Pages/About"),
				},
				{
					path: "projekt/:project_id",
					component: require("./Pages/Project/Index"),
					indexRoute: {
						component: require("./Pages/Project/Project"),
					},
					childRoutes: [
						{
							path: "bidra",
							component: require("./Pages/Project/Contribute"),
						},
						{
							path: "tack",
							component: require("./Pages/Project/Receipt"),
						},
					],
				},
				{
					path: "*",
					component: require("./Pages/404"),
				},
			],
		},
	]
};

ReactDOM.render((
	<Router history={browserHistory} routes={rootRoute} />
), document.getElementById("app"));