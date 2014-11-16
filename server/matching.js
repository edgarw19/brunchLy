<<<<<<< HEAD
// var WEDNESDAY = 4;
// var FRIDAY = 5

// var day_delay = 86400000;
// var min_delay = 60000;



=======
// var THURSDAY = 5;

// var day_delay = 86400000;
// var minute_delay = 60000;

// function convertValuesToArray(p) {
//   var values = [];
//   values.push(p.key1);
//   values.push(p.key2);
//   values.push(p.key3);
//   values.push(p.key4);
//   values.push(p.key5);
//   return values;
// }
// function calculatePersonalityDifference(p1, p2){
//   var p1_values = convertValuesToArray(p1);
//   var p2_values = convertValuesToArray(p2);
//   var size = p1_values.length;
//   var meanSquaredDifference = 0;
//   for (var i = 0; i < size; i++){
//     var difference = p1_values[i] - p2_values[i];
//     difference = difference*difference;
//     meanSquaredDifference += difference;
//   }
//   return meanSquaredDifference;
// }

// function getPrevBrunches(p){
//   return p.prevBrunches;
// }

// function buildMatches(brunchers){
//   var MAX = 1000;
//   var totalBrunchers = brunchers.length;
//   var numPeopleToBrunchWith = 2;
//   var individualScores = [];
//   var individualPrevBrunches = [];//array of user_ids
//   var peopleToBrunchWith = new Array(totalBrunchers);
//   var peopleAlreadyMatched = [];
//   //set up values array
//   for (var i = 0; i < totalBrunchers; i++){
//     individualScores.push(convertValuesToArray[brunchers[i]]);
//     individualPrevBrunches.push(getPrevBrunches(brunchers[i]));
//   }

//   for (var i = 0; i < totalBrunchers; i++){
//       peopleToBrunchWith[i] = new Array(numPeopleToBrunchWith);
//   }
//   //set up msd matrix
//   var differencesBetweenScores = new Array(totalBrunchers);
//   for (i = 0; i < totalBrunchers; i++){
//     differencesBetweenScores[i] = new Array(totalBrunchers);
//   } 
//   //calculate msd between all pairs of people
//   for (i = 0; i < totalBrunchers; i++){
//     for (var j = 0; j < totalBrunchers; j++){
//       var msd = calculatePersonalityDifference(individualScores[i], individualScores[j]);
//       differencesBetweenScores[i][j] = msd;
//       differencesBetweenScores[j][i] = msd;
//     }
//   }


//   for (i = 0; i < totalBrunchers; i++){
//       var secondMin = MAX;
//       var firstMin = MAX;
//       var secondPos = 0;
//       var firstPos = 0;
//       if (peopleAlreadyMatched.indexOf(i) >= 0) continue;
//     for (j = 0; j < totalBrunchers; j++){
//       if (i == j) continue;
//       var currentMSD = differencesBetweenScores[i][j];
//       if (individualPrevBrunches[i].indexOf(brunchers[j]._id) < 0) {
//         if (currentMSD <= firstMin){
//           var tempValue = firstMin;
//           var tempPos = firstPos;
//           firstMin = currentMSD;
//           firstPos = j;
//           secondMin = temp;
//           secondPos = temp;
//         }
//         else if (currentMSD < secondMin){
//           secondMin = currentMSD;
//           secondPos = j;
//         }
//       }
//     }
//     var posOfPeopleToBrunchWith = [];
//     posOfPeopleToBrunchWith.push(firstPos);
//     posOfPeopleToBrunchWith.push(secondPos);
//     if ((firstMin != MAX) && (secondMin != MAX)){
//       for (var x = 0; x < numPeopleToBrunchWith; x++) {
//         var personToBrunchWith = brunchers[posOfPeopleToBrunchWith[x]];
//         peopleToBrunchWith[i][x] = personToBrunchWith;
//         peopleToBrunchWith[posOfPeopleToBrunchWith[x]][0] = brunchers[i];
//         peopleAlreadyMatched.push(posOfPeopleToBrunchWith[x]);
//       }

//       peopleToBrunchWith[firstPos][1] = brunchers[secondPos];
//       peopleToBrunchWith[secondPos][1] = brunchers[firstPos];
//       peopleAlreadyMatched.push(i);
//     }
//     else {
//       peopleToBrunchWith[i][0] = null;
//     }
//   }
//   console.log("FINISHED MATCHING");

// }

// buildMatches(Dummies.find().fetch());

>>>>>>> 7434f520c3c758b19f72be174f1be62285cf75f8
// Meteor.setInterval(match, day_delay)

// function match() {
// 	var curr_date = new Date();
<<<<<<< HEAD
// 	if (curr_date.getDay() = WEDNESDAY ) {
// 		console.log('match success');
// 	}
// }
=======
// 	if (curr_date.getDay() == THURSDAY ) {
// 		//run func here
// 	}
// }
>>>>>>> 7434f520c3c758b19f72be174f1be62285cf75f8
