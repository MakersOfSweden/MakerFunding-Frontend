import Backbone from 'backbone'
import ProjectModel from '../Models/Project'

module.exports = Backbone.Collection.extend(
{
	model: ProjectModel,
	url: "/api/projects",
});