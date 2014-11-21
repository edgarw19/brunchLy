// // array of user IDs 
// origUserList = [123, 234, 345, 456, 567, 678]; 

// // array of arrays of matched people 
// matchedUserList = [[234, 345], [], [], [], [], []]; 

process.env.MAIL_URL = 'smtp://joannajw:brunchlysendgrid@smtp.sendgrid.net:587';

console.log(Profiles.findOne()); 

var sendEmails = function (origUserList, matchedUserList) { 

    
    var apologySubject = "[Brunchly] Sorry!";
    var apologyBody = "All our users have been matched this week. You'll get priority next week :)";

    // var maxEmails = origUserList.length; 
    var maxEmails = 200; 

    for (var i = 0; i < Math.min(maxEmails, origUserList.length); i++) {

        var userEmail = getEmail(origUserList[i]);
        var emailSubject = apologySubject; 
        var emailBody = apologyBody; 

        if (matchedUserList[i][0] !== null) {
            var matchedBrunchers = matchedUserList[i]; 

            emailBody = "You've been matched! Go grab brunch this weekend with your new friends! \n_______\n\n";
            emailBody += "Introducing your fellow brunchers: \n\n";
            emailSubject = "[Brunchly] You've been matched!";
            for (var j = 0; j < matchedBrunchers.length; j++) {
              emailBody += getName(matchedBrunchers[j]) + " [" + getEmail(matchedBrunchers[j]) + "]\n"
              emailBody += "About Me: " + getAboutMe(matchedBrunchers[j]);
              emailBody += "\n\n"
            }   
        }

        emailBody += "_______\n\nSome restaurants we'd recommend: \n";
        var restaurants = Restaurants.find().fetch();
        restaurants = shuffle(restaurants);
        for (var i = 0; i < 3; i++){
          emailBody += grabRestaurantDescription(restaurants[i]);
        }
      
        Email.send({
            from: "brunch@brunchly.com",
            to: userEmail,
            subject: emailSubject,
            text: emailBody

        });

        console.log(userEmail, emailSubject, emailBody, "\n"); 

    }   
}

var getEmail = function(user) {
    return user.email; 
}

var shuffle = function(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


var getAboutMe = function(user){
  return user.aboutMe;
}

var getName = function(user){
  return user.firstName + " " + user.lastName;
}

var getFirstName = function(user) {
  return user.firstName; 
}

var grabRestaurantDescription = function(restaurant) {
  var restDescription = "Name: " + restaurant.name + "\n";
  restDescription += "Type: " + restaurant.type + "\n";
  restDescription += "Address: " + restaurant.address + "\n";
  restDescription += "Phone: " + restaurant.phone + "\n\n\n";
  return restDescription; 
}






















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
  return peopleToBrunchWith;

};














var resetAll = function () {
  console.log('RESETTING all to false', Profiles.find({}).count());

  Profiles.update({}, {$set: {'signed_up': false}}, {multi: true});
};

Meteor.methods({
  makeMatches: function() {
    var profiles = Profiles.find({signed_up: true}).fetch();
    var matches = [];
    for (var i = 0; i < profiles.length; i++) {
      var match = {};
      match['values'] = profiles[i].answers.grouped;

      var user = Meteor.users.findOne({_id: profiles[i].userId});
      console.log('USER: ', user);
      console.log('EMAILS', user.emails);
      match['email'] = user.emails[0].address;
      match['prevBrunches'] = [];
      match['firstName'] = profiles[i].firstName;
      match['lastName'] = profiles[i].lastName;
      match['aboutMe'] = profiles[i].aboutMe;
      matches.push(match);
    }
    // console.log(Profiles.find({signed_up: true}).fetch());
    console.log('result: ', matches);

    // var tom = {email: 'blah@blah.com', prevBrunches: ['id1', 'id2'], values: [1, 2, 2, 3, 2]};
    // var two = {email: 'blah@blah.com', prevBrunches: ['id1', 'id2'], values: [1, 2, 2, 3, 2]};
    // var three = {email: 'blah@blah.com', prevBrunches: ['id1', 'id2'], values: [1, 2, 2, 3, 2]};
    // var four = {email: 'blah@blah.com', prevBrunches: ['id1', 'id2'], values: [1, 2, 2, 3, 2]};
    // console.log('Special admin link');

    var outputMatches = buildMatches(matches);
    sendEmails(matches, outputMatches);
    resetAll();
    return outputMatches;
  }
});