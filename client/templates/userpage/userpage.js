
Template.userpage.events({
  'click #brunch-signup': function(e) {
    var profile = Profiles.findOne({userId: Meteor.userId()});
  	Profiles.update({_id: profile._id}, {$set: {'signed_up': !profile.signed_up}});
  },
  'click #admin-special': function(e) {
  	console.log('TO BE MATCHED: ', Profiles.find({signed_up: true}).fetch());
  	var matches = Meteor.call('makeMatches', function (err, data) {
  		console.log('done with matches', err, data);
  	});
  }
});

Template.userpage.signed_up = function() {
    var profile = Profiles.findOne({userId: Meteor.userId()});
    return profile.signed_up;
};

Template.userpage.rendered = function() {
    var profile = Profiles.findOne({userId: Meteor.userId()});
    console.log('profile: ', profile);

	var labels = ["Conscientiousness", "Openness to experience", "Neuroticism", "Agreeableness", "Extraversion"];
	var data = profile.answers.grouped;
	var data = {
		labels: labels,
		datasets: [{
			label: "Your profile",
			fillColor: "rgba(255,173,118,0.3)",
			strokeColor: "rgba(255,173,118,1)",
			pointColor: "rgba(255,173,118,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(255,173,118,1)",
			data: data
		}]
	};

	// get line chart canvas
	var radar = document.getElementById('radar').getContext('2d');
	// // draw line chart
	console.log('have', radar);
	new Chart(radar).Radar(data,{
		pointLabelFontSize: 15,
	      responsive: true});
}

Template.userpage.isAdmin = function() {
  console.log('user', Meteor.user());
  return Meteor.user().username == 'admin';
}
