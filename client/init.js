//Client
Meteor.startup(function(){
	Session.setDefault('admin.eventsLimit', 5);
	AutoForm.setDefaultTemplate('materialize');
});