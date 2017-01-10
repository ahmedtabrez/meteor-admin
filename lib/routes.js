setTitle = function(){
	var title = '';
	if(Router.current().data)
		var title = Router.current().data().title;
	if(title)
		title = title + ' - Admin';
	else 
		title = 'Admin';
	document.title = title;
	//Bug: This is leaving the non-admin routes with the title "Admin". 
}

Router.route('/admin', {
	name: 'admin.home',
	after: setTitle
});
Router.route('/admin/switchboard', {
	name: 'admin.switchboard',
	data:  {
		title: 'Switchboard'
	},
	after: setTitle
});
Router.route('/admin/events', {
	name: 'admin.events',
	data:  {
		title: 'Events',
		adminEvents: {
			past: function(){
				return Admin.Collections.Events.find({
					fromDate: {$lt: new Date()}, 
					toDate: {$lt: new Date()}
				}, {sort: {fromDate: -1}});
			},
			current: function(){
				return Admin.Collections.Events.find({
					fromDate: {$lt: new Date()}, 
					toDate: {$gt: new Date()}
				}, {sort: {fromDate: -1}})
			},
			future: function(){
				return Admin.Collections.Events.find({
					fromDate: {$gt: new Date()}, 
					toDate: {$gt: new Date()}
				}, {sort: {fromDate: -1}})
			}			
		}
	},
	after: setTitle
});

Router.route('/admin/events/add', {
	name: 'admin.events.add',
	data:  {
		title: 'Add Event'
	},
	after: setTitle
});

Router.route('/admin/events/edit', {
	name: 'admin.events.edit',
	data:  {
		title: 'Edit Event'
	},
	after: setTitle
});

Router.route('/admin/finance', {
	name: 'admin.finance',
	data:  {
		title: 'Finance'
	},
	after: setTitle
});

Router.route('/admin/domains', {
	name: 'admin.domains',
	data:  {
		title: 'Domains',
		domains: function(){return Admin.Collections.Domains.find();}
	},
	after: setTitle
});