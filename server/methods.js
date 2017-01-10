Meteor.methods({
  switch: function(feature, state) {
    console.log(feature, state);
    if(!Roles.userIsInRole(Meteor.user(), 'admin'))
      throw new Meteor.Error("Forbidden", 403);
    Admin.Collections.Switchboard.upsert({
      feature: feature
    },{ 
      $set: {
        state: state
      }
    });
  },
  addTransaction : function (date, from, to, fromAccount, toAccount, type){

  }
});
