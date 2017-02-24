import React from 'react';
import { Link, withRouter } from 'react-router'
import CurrencyInput from 'react-currency-input';
import Currency from './Currency';

module.exports = withRouter(React.createClass({
	mixins: [Backbone.React.Component.mixin],

	getInitialState: function()
	{
		return {
			page: "form",
			accepted: false,
			submitEnabled: false,
			error_name: false,
			error_amount: false,
			error_email: false,
		};
	},

	onChangeAmount: function(maskedValue, value)
	{
		this.getModel().set({
			amount: value
		});

		this.recalcSubmit();
	},

	onChangeTerms: function(event)
	{
		this.setState({
			accepted: event.target.checked
		});

		this.recalcSubmit();
	},

	onChange: function(event)
	{
		var s = {};

		if(event.target.type == "checkbox")
		{
			s[event.target.name] = event.target.checked;
		}
		else
		{
			s[event.target.name] = event.target.value;
		}

		this.getModel().set(s);

		this.recalcSubmit();
	},

	validate: function(name)
	{
		console.log("Validate: " + name);

		if(name == "name" && this.state.model.name.length < 5)
		{
			this.setState({error_name: true});
		}

		if(name == "email" && this.state.model.email.length < 5)
		{
			this.setState({error_email: true});
		}

		if(name == "amount" && this.state.model.amount <= 0 || this.state.model.amount.length == 0)
		{
			this.setState({error_amount: true});
		}

		this.recalcSubmit();
	},

	onBlur: function(event)
	{
		console.log("Blur: " + event.target.name);
		this.validate(event.target.name);
	},

	recalcSubmit: function()
	{
		var _this = this;
		setTimeout(function()
		{
			var submitEnabled = true;

			if(_this.state.accepted !== true)
			{
				submitEnabled = false;
			}

			if(_this.state.model.email.length < 5)
			{
				submitEnabled = false;
			}
			else
			{
				_this.setState({error_email: false});
			}

			if(_this.state.model.name.length < 5)
			{
				submitEnabled = false;
			}
			else
			{
				_this.setState({error_name: false});
			}

			if(_this.state.model.amount <= 0 || _this.state.model.amount.length == 0)
			{
				submitEnabled = false;
			}
			else
			{
				_this.setState({error_amount: false});
			}

			_this.setState({submitEnabled});
		});
	},

	submit: function(event)
	{
		var _this = this;

		// Prevent the form from being submitted
		event.preventDefault();

		if(this.state.model.payment_type == "card")
		{
			var handler = StripeCheckout.configure({
				key: config.stripeKey,
				image: config.stripeImage,
				locale: "auto",
				token: function(token)
				{
					_this.sendDataToServer(token);
				}
			});

			// Open Checkout with further options:
			handler.open({
				name: "Crowdfunding",
				description: this.state.model.project_title,
				email: this.state.model.email,
				currency: "SEK",
				amount: this.state.model.amount * 100,
			});
		}
		else
		{
			this.setState({page: "swish"});
		}
	},

	sendDataToServer: function(stripe_token)
	{
		// Save Stripe token, if any
		if(stripe_token !== undefined)
		{
			this.getModel().set({payment_data: stripe_token});
		}

		// Send the data to our server
		var _this = this;
		this.getModel().save(null, {
			error: function()
			{
				alert("Något gick fel när betalningen skulle bekräftas. Vanligen kontrollera ditt kontoutdrag och kontakta info@makerspace.se");
			},
			success: function()
			{
				// Go to thank you page
				setTimeout(function() {
					_this.props.router.push("/");
					_this.props.router.push("/projekt/" + _this.props.params.project_id + "/tack");
				}, 0);

			},
		});

	},

	confirmSwish: function()
	{
		this.sendDataToServer();
	},

	cancel: function()
	{
		this.setState({
			page: "form"
		});
	},

	render: function()
	{
		if(this.state.page == "form")
		{
			return (
				<form className="uk-form-horizontal uk-margin-top uk-margin-bottom">
					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Namn / företag *</label>
						<div className="uk-form-controls">
							<input className={this.state.error_name ? "uk-input uk-form-danger" : "uk-input"} type="text" name="name" placeholder="Anders Andersson" onChange={this.onChange} onBlur={this.onBlur} value={this.state.model.name} />
						</div>
					</div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Belopp *</label>
						<div className="uk-form-controls">
							<CurrencyInput ref="amount" className={this.state.error_amount ? "uk-input uk-form-danger" : "uk-input"} name="amount" onChange={this.onChangeAmount} onBlur={this.onBlur} value={this.state.model.amount} decimalSeparator="," thousandSeparator=" " precision="0" suffix=" SEK" />
						</div>
					</div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">E-postadress *</label>
						<div className="uk-form-controls">
							<input className={this.state.error_email ? "uk-input uk-form-danger" : "uk-input"} type="text" name="email" placeholder="anders@example.com" onChange={this.onChange} onBlur={this.onBlur} value={this.state.model.email}  />
						</div>
					</div>

					<div className="uk-margin">
						<label className="uk-form-label" htmlFor="form-stacked-text">Meddelande</label>
						<div className="uk-form-controls">
							<textarea className="uk-textarea" rows="5" name="message" placeholder="Meddelande" onChange={this.onChange} value={this.state.model.message}  ></textarea>
						</div>
					</div>

					<div className="uk-margin">
						<div className="uk-form-label">Betalningssätt</div>
						<div className="uk-form-controls">
							<label><input className="uk-radio" type="radio" name="payment_type" value="card"  checked={this.state.model.payment_type == "card"}  onChange={this.onChange} /> Kortbetalning</label><br />
							<label><input className="uk-radio" type="radio" name="payment_type" value="swish" checked={this.state.model.payment_type == "swish"} onChange={this.onChange} /> Swish</label>
						</div>
					</div>

					<div className="uk-margin">
						<div className="uk-form-label">Sekretess</div>
						<div className="uk-form-controls">
							<label><input className="uk-radio" type="radio" name="privacy" value="anon"   checked={this.state.model.privacy == "anon"}   onChange={this.onChange} /> Jag vill vara anonym</label><br />
							<label><input className="uk-radio" type="radio" name="privacy" value="public" checked={this.state.model.privacy == "public"} onChange={this.onChange} /> Jag godkänner att mitt namn publiceras</label>
						</div>
					</div>

					<div className="uk-margin">
						<div className="uk-form-label">Nyhetsbrev</div>
						<div className="uk-form-controls">
							<label><input className="uk-checkbox" type="checkbox" name="newsletter" checked={this.state.model.newsletter} onChange={this.onChange} /> Jag vill ha nyhetsbrev från Stockholm Makerspace</label><br />
						</div>
					</div>

					<div className="uk-margin">
						<div className="uk-form-label">Användarvillkor</div>
						<div className="uk-form-controls">
							<label><input className="uk-checkbox" type="checkbox" name="accepted" checked={this.state.accepted} onChange={this.onChangeTerms} /> Jag godkänner <Link to="/villkor" target="_blank">användarvillkoren</Link> för MakerFunding.se och är införstådd med att jag skänker pengar till föreningen Stockholm Makerspace,  org. Nr 802467-7026.</label><br />
						</div>
					</div>

					<div className="uk-clearfix">
						<div className="uk-float-left">
							<Link to={"/projekt/" + this.props.params.project_id} className="uk-button uk-button-danger" disabled={!this.state.accepted}><span data-uk-icon="icon: arrow-left" /> Avbryt</Link>
						</div>

						<div className="uk-float-right">
							<button className="uk-button uk-button-primary" disabled={!this.state.submitEnabled} onClick={this.submit}>Gå vidare till betalning <span data-uk-icon="icon: arrow-right" /></button>
						</div>
					</div>

				</form>
			);
		}
		else if(this.state.page == "swish")
		{
			return (
				<div className="uk-margin-top uk-margin-bottom">
					<div className="" data-uk-grid>
						<div className="uk-text-center uk-width-auto@m">
							<img src="/images/swish.png" alt="Swish logotyp" />
						</div>

						<div className="uk-width-expand@m">
							<h2>Betala med Swish</h2>

							<p>Ta fram din enhet med Swish-appen installerad och betala <Currency value={this.state.model.amount} currency="SEK" /> till telefonnummer <a href="tel:+46705661884">070 566 18 84</a></p>
							<p>Swish-numret tillhör Stockholm Makerspaces ordförande Erik Cederberg.</p>

							<p>Tryck på ”bekräfta betalning” nedan när betalningen har gått igenom.</p>

							<div className="uk-width-auto@m">
								<div className="uk-float-left">
									<button onClick={this.cancel} className="uk-button uk-button-danger"><span data-uk-icon="icon: arrow-left" /> Avbryt</button>
								</div>

								<div className="uk-float-right uk-margin-bottom">
									<button onClick={this.confirmSwish} className="uk-button uk-button-primary">Bekräfta betalning <span data-uk-icon="icon: arrow-right" /></button>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
}));