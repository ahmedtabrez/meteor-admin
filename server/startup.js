Meteor.startup(() => {
	if (Roles.getUsersInRole('admin').count() == 0) {
		Meteor.users.remove({username:'admin'}); 
		Roles.addUsersToRoles(Accounts.createUser({
				username: 'admin',
				password : 'admin',
				profile  : {
					name: {
						first: 'Administrator'
					}
				}
			}),
		'admin');
	}
});