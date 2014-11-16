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




Profiles = new Mongo.Collection('profiles');
// Profiles.allow({
//   insert: function() { return true; },
//   update: function() { return true; },
//   fetch: function () {return true}
// });
// TODO permissions with profile.allow/deny

var resetAll = function () {
  console.log('RESETTING all to false', Profiles.find({}).count());

  Profiles.update({}, {$set: {'signed_up': false}}, {multi: true});
};

Meteor.methods({
  profileEdit: function(answers) {
    check(answers, Object);
    answers = {answers: answers};

    // console.log('attr', answers);
  	// console.log('user', Meteor.user());
    var profile = _.extend(answers, {
      userId: Meteor.user()._id,
      signed_up: false
    });


    // console.log('current profiles', Profiles.find().count());
    
    var the_id = Profiles.upsert({userId: Meteor.user()._id}, profile);
    console.log('done inserting! ', the_id);
    return {
      _id: the_id
    };
  },
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
      matches.push(match);
    }
    // console.log(Profiles.find({signed_up: true}).fetch());
    console.log('result: ', matches);

    // var tom = {email: 'blah@blah.com', prevBrunches: ['id1', 'id2'], values: [1, 2, 2, 3, 2]};
    // var two = {email: 'blah@blah.com', prevBrunches: ['id1', 'id2'], values: [1, 2, 2, 3, 2]};
    // var three = {email: 'blah@blah.com', prevBrunches: ['id1', 'id2'], values: [1, 2, 2, 3, 2]};
    // var four = {email: 'blah@blah.com', prevBrunches: ['id1', 'id2'], values: [1, 2, 2, 3, 2]};
    // console.log('Special admin link');

    var matches = buildMatches(matches);
    resetAll();
    return matches;
  }
});
