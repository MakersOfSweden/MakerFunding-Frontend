import Backbone from 'backbone'

module.exports = Backbone.Model.extend(
{
	idAttribute: "contributor_id",
	urlRoot: "/api/contributor",
	defaults: {
		contributor_id: null,
		project_id: null,
		name: "",
		membernumber: "",
		amount: 10000,
		email: "info@makerspace.se",
		message: "",
		payment: "swish",
		privacy: "anon",
		newsletter: true,
		accepted: true,
		created_at: null,
		updated_at: null,
		deleted_at: null,
	},
});