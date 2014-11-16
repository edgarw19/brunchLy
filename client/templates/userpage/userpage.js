Template.userpage.rendered = function() {
	console.log('userpage!');
    var profile = Profiles.findOne({userId: Meteor.userId()});

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
	      responsive: true});
}
