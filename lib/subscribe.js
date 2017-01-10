Deps.autorun(function() {
	Meteor.subscribe('events.past', Session.get('admin.eventsLimit'));
	Meteor.subscribe('events.current');
	Meteor.subscribe('events.future');
});
Meteor.subscribe('domains.available');

