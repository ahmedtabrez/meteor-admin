function toast (msg, color){
	if($('.toast').length > 0) // If any toasts are already on screen, dismiss them first.
		$('.toast').fadeOut("fast", function(){
			$(this).remove();
			Materialize.toast(msg, 1500, color);
		});
	else 
		Materialize.toast(msg, 1500, color);
}


Template.adminEventsAdd.onRendered(function(){
  $('.timepicker').pickatime({
    autoclose: false,
    twelvehour: true,
    default: new Date()
  });
});

Template.adminNav.onRendered(function() {
	$('.button-collapse').sideNav({
		edge: 'left'
	});
	$('.side-nav').children().click(function(e){
		if($(window).width() <= 992)
			$('.button-collapse').sideNav('hide');
	});
});

Template.adminSwitchboard.events({
	'change input.switch': function(event){
		event.target.disabled = 'disabled'; // Disable to prevent additional clicks
		var state = event.target.checked;
		console.log(event.target.dataset.feature);
		var feature = event.target.dataset.feature;
		if(!Meteor.status().connected) {
			event.target.checked = !state;
			toast("Error - Not connected", "grey");
			event.target.disabled = false; // Enable it back
			return;
		}
		Meteor.call('switch', feature, state, function(error){
			if(error){
				event.target.checked = !state;
				toast(error, "red");
			}
			else
				toast("Successfully switched" + (state?" ON ":" OFF ") + feature + ".", "green")
			event.target.disabled = false; // Enable it back
		});
	}
});
