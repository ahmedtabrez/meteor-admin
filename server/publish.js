Meteor.publish('switchboard', function () {
	var switchboard = Admin.Collections.Switchboard.find({
		'state': true
	},{'feature':true});

	_(switchboard).each(function(){
		this.switchboard
	})

	return switchboard;
});

Meteor.publish('events.past', function(limit){
	return Admin.Collections.Events.find({
		fromDate: {$lt: new Date()}, 
		toDate: {$lt: new Date()}
	}, {limit: limit, sort: {fromDate: -1}});
});
Meteor.publish('events.current', function(limit){
	return Admin.Collections.Events.find({
		fromDate: {$lt: new Date()}, 
		toDate: {$gt: new Date()}
	}, {sort: {fromDate: -1}})
});
Meteor.publish('events.future', function(limit){
	return Admin.Collections.Events.find({
		fromDate: {$gt: new Date()}, 
		toDate: {$gt: new Date()}
	}, {sort: {fromDate: -1}})
});

Meteor.publish('domains.available', function(){
	if(Roles.userIsInRole(this.userId, 'admin'))
		return Admin.Collections.Domains.find({});
});




/*.insert(
	`insert into players (firstname, lastname) values ('Tabrez', 'Ahmed')`,
    [ { table: 'players' } ]
);*/