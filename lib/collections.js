Meteor.subscribe('switchboard');

if(!Admin) Admin = {};
if(!Admin.Schemas) Admin.Schemas = {};
if(!Admin.Collections) Admin.Collections = {};

//Functions 
Date.prototype.setTimeFromString = function(timeString){
	var hrs = parseInt(timeString.substr(0,2));
	var mins = parseInt(timeString.substr(3,2));
	var a = timeString.substr(5,2);
	this.setHours(a == "PM" ? (hrs+12)%24||12 : hrs%12);
	this.setMinutes(parseInt(timeString.substr(3,2)));
	return this;
}


/**
 ** Switchboard to turn on/off various feature
 */
Admin.Collections.Switchboard = new Meteor.Collection('switchboard');
Admin.Schemas.Switchboard = {
	'feature': {
		type: String,
		unique: true,
		allowedValues: ['users', 'events', 'activities', 'media','finance']
	},
	'state': {
		type: Boolean,
	}
};
Admin.Collections.Switchboard.attachSchema(Admin.Schemas.Switchboard);

Admin.Collections.Events = new Meteor.Collection('events');
Admin.Schemas.Events = new SimpleSchema({
	'fromDate': {
		type: Date,
		autoValue: function(){
			return this.value.setTimeFromString(this.field('fromTime').value);
		},
		autoform: {
			type: "pickadate"
		}
	},
	'fromTime': {
		type: String,
		regEx: /^(1[0-2]|0[0-9]):([0-5][0-9]|60)(AM|PM)$/i,
		autoform: {
			type: "time",
			class: "timepicker"
		}
	},
	'toDate': {
		type: Date,
		autoValue: function(){
			return this.value.setTimeFromString(this.field('toTime').value);
		},
		autoform: {
			type: "pickadate",
		},
		custom: function(){
			console.log(this);
			console.log(moment(this.value).isBefore(moment(this.field('fromDate').value)));
			if(moment(this.value).isBefore(moment(this.field('fromDate').value)))
				return "beforeFromDate";
		}
	},
	'toTime': {
		type: String,
		regEx: /^(1[0-2]|0[0-9]):([0-5][0-9]|60)(AM|PM)$/i,
		custom: function(){
			var fromDate = moment(this.field('fromDate').value),
				fromTime = moment(this.field('fromTime').value, 'h:ma'),
				toDate = moment(this.field('toDate').value),
				toTime = moment(this.value, 'h:ma');
			if(fromDate.isSame(toDate) && toTime.isBefore(fromTime))
				return "beforeFromTime";
		},
		autoform: {
			type: "time",
			class: "timepicker"
		}
	},
	'name': {
		type: String,
	},
	'description': {
		type: String,
		autoform: {
			type: "textarea"
		}
	},
});
Admin.Collections.Events.attachSchema(Admin.Schemas.Events);
SimpleSchema.messages({
	'beforeFromTime': '"To time" cannot be before "From time"',
	'beforeFromDate': '"To date" cannot be before "From date"'
});

//if(Meteor.isClient)
Admin.Collections.Events.allow({
	insert: function(){
		return Roles.userIsInRole(Meteor.userId(), 'admin');
	},
	update: function(){
		return Roles.userIsInRole(Meteor.userId(), 'admin');
	},
	remove: function(){
		return Roles.userIsInRole(Meteor.userId(), 'admin');
	}
});
////////////////////////////////////////

Admin.Collections.Domains = new Meteor.Collection('domains.available');
Admin.Collections.Domains.attachSchema( new SimpleSchema({
	domain: {
		type: String
	}
}));

export {Admin};
/*end*/