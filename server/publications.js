 Meteor.publish('posts', function(){
   return Posts.find();
 })

// Meteor.publish('userAccounts', function(){
//   return UserAccounts.find();
// })
Meteor.publish('profile', function() {
  return Profiles.find({});
});