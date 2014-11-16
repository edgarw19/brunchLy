
var convertValuesToArray = function(p) {
//   var values = [];
//   values.push(p.key1);
//   values.push(p.key2);
//   values.push(p.key3);
//   values.push(p.key4);
//   values.push(p.key5);
  console.log(p);
  return p.values;
}
var calculatePersonalityDifference = function(p1, p2){
  var p1_values = p1;
  var p2_values = p2;
  var size = p1_values.length;
  var meanSquaredDifference = 0;
  for (var i = 0; i < size; i++){
    var difference = p1_values[i] - p2_values[i];
    difference = difference*difference;
    meanSquaredDifference += difference;
  }
  return meanSquaredDifference;
}

var getPrevBrunches = function(p){
  return p.prevBrunches;
}

var buildMatches = function (brunchers){
  var MAX = Number.MAX_VALUE;
  var totalBrunchers = brunchers.length;
  var numPeopleToBrunchWith = 2;
  var individualScores = [];
  var individualPrevBrunches = [];//array of user_ids
  var peopleToBrunchWith = new Array(totalBrunchers);
  var peopleAlreadyMatched = [];
  //set up values array
  for (i = 0; i < totalBrunchers; i++){
    individualScores.push(convertValuesToArray(brunchers[i]));
    individualPrevBrunches.push(getPrevBrunches(brunchers[i]));
  }

  for (i = 0; i < totalBrunchers; i++){
      peopleToBrunchWith[i] = new Array(numPeopleToBrunchWith);
  }
  //set up msd matrix
  var differencesBetweenScores = new Array(totalBrunchers);
  for (i = 0; i < totalBrunchers; i++){
    differencesBetweenScores[i] = new Array(totalBrunchers);
  } 
  //calculate msd between all pairs of people
  for (i = 0; i < totalBrunchers; i++){
    for (var j = 0; j < totalBrunchers; j++){
      var msd = calculatePersonalityDifference(individualScores[i], individualScores[j]);
      differencesBetweenScores[i][j] = msd;
      differencesBetweenScores[j][i] = msd;
    }
  }


  for (i = 0; i < totalBrunchers; i++){
      var secondMin = MAX;
      var firstMin = MAX;
      var secondPos = 0;
      var firstPos = 0;
      if (peopleAlreadyMatched.indexOf(i) >= 0) continue;
    for (j = 0; j < totalBrunchers; j++){
      if (i == j) continue;
      var currentMSD = differencesBetweenScores[i][j];
      if (individualPrevBrunches[i].indexOf(brunchers[j]._id) < 0 && peopleAlreadyMatched.indexOf(j) < 0) {
        if (currentMSD <= firstMin){
          var tempValue = firstMin;
          var tempPos = firstPos;
          firstMin = currentMSD;
          firstPos = j;
          secondMin = tempValue;
          secondPos = tempPos;
        }
        else if (currentMSD < secondMin){
          secondMin = currentMSD;
          secondPos = j;
        }
      }
    }
    var posOfPeopleToBrunchWith = [];
    posOfPeopleToBrunchWith.push(firstPos);
    posOfPeopleToBrunchWith.push(secondPos);
    if ((firstMin != MAX) && (secondMin != MAX)){
      for (var x = 0; x < numPeopleToBrunchWith; x++) {
        var personToBrunchWith = brunchers[posOfPeopleToBrunchWith[x]];
        peopleToBrunchWith[i][x] = personToBrunchWith;
        peopleToBrunchWith[posOfPeopleToBrunchWith[x]][0] = brunchers[i];
        peopleAlreadyMatched.push(posOfPeopleToBrunchWith[x]);
      }

      peopleToBrunchWith[firstPos][1] = brunchers[secondPos];
      peopleToBrunchWith[secondPos][1] = brunchers[firstPos];
      peopleAlreadyMatched.push(i);
    }
    else {
            peopleToBrunchWith[i][0] = null;
    }
  }
  console.log(peopleToBrunchWith);
  console.log("FINISHED MATCHING");

};









Template.userpage.events({
  'click #brunch-signup': function(e) {
    var profile = Profiles.findOne({userId: Meteor.userId()});
  	Profiles.update({_id: profile._id}, {$set: {'signed_up': !profile.signed_up}});
  },
  'click #admin-special': function(e) {
  	Meteor.call('resetAll');

 //  	var tom = {email: 'blah@blah.com', prevBrunches: ['id1', 'id2'], values: [1, 2, 2, 3, 2]};
	// buildMatches([
	// }])
  	console.log('Special admin link');
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
