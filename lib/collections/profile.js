


Profiles = new Mongo.Collection('profiles');
// Profiles.allow({
//   insert: function() { return true; },
//   update: function() { return true; },
//   fetch: function () {return true}
// });
// TODO permissions with profile.allow/deny


Meteor.methods({
  profileEdit: function(profileData) {
    // check(answers, Object);
    // answers = {answers: answers};

    // console.log('attr', answers);
  	// console.log('user', Meteor.user());
    var profile = _.extend(profileData, {
      userId: Meteor.user()._id,
      signed_up: true
    });

    console.log("inserting: \n", profile); 

    // console.log('current profiles', Profiles.find().count());
    
    var the_id = Profiles.upsert({userId: Meteor.user()._id}, profile);
    console.log('done inserting! ', the_id);
    return {
      _id: the_id
    };
  }

});
