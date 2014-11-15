
Template.userProfile.helpers({
  userData: Meteor.user()
});


Template.userProfile.events({
  'click #submit_profile_btn': function(evt) {
    evt.preventDefault();
    var first_name = $('#profile_first_name').val()
    ,last_name = $('#profile_last_name').val()
    ,email = $('#profile_email').val()
    ,email_lower_case = email.toLowerCase()
    ;
    var associatedAccount = UserAccounts.findOne({associatedUserID: Meteor.user()._id});
    if (typeof(associatedAccount) == "undefined") {    
      UserAccounts.insert({
        associatedUserID: Meteor.user()._id,
        firstName:first_name,
        lastName:last_name,
        email:email_lower_case,
      }, function(error, user_id){
        console.log(error);
      })
    }
    else {
      UserAccounts.update({_id: associatedAccount._id}, {$set:{
      firstName:first_name,
      lastName:last_name,
      email:email_lower_case,
      
      }})
   }
 }
});