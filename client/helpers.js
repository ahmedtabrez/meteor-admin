import { Admin } from '../lib/collections.js';
window.Admin = Admin;

Template.registerHelper('isFeatureOn', function(feature){
	var s = Admin.Collections.Switchboard.find({feature: feature}, {state: 1}).fetch()[0]; //get switch
	if(s)
		return s.state;
});

Template.registerHelper('currentRouteIs', function (route) { 
  return Router.current().route.getName() === route; 
});