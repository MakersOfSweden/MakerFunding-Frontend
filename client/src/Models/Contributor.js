import Backbone from 'backbone'

module.exports = Backbone.Model.extend(
{
	idAttribute: "contributor_id",
	urlRoot: function() {
		return config.apiBasePath + "/project/" + this.get("project_id") + "/contribute";
	},
	defaults: {
		contributor_id: null,
		project_id: null,
		name: "",
		membernumber: "",
		amount: 500,
		email: "",
		message: "",
		privacy: "anon",
		newsletter: false,
		payment_type: "card",
		payment_data: null,
		created_at: null,
		updated_at: null,
		deleted_at: null,
	},
});