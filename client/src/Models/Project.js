import Backbone from 'backbone'

module.exports = Backbone.Model.extend(
{
	idAttribute: "project_id",
	urlRoot: config.apiBasePath + "/project",
	defaults: {
			project_id: null,
			active: true,
			image: "",
			title: "",
			description: "",
			brief: "",
			about: "",
			funding_goal: 0,
			funding_status: 0,
			currency: "SEK",
			num_contributors: 0,
			enddate: null,
			created_at: null,
			updated_at: null,
			deleted_at: null,
	},
});