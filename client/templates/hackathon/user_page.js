
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
    console.log(first_name + " this is first name");
    var associatedAccount = UserAccounts.findOne({associatedUserID: Meteor.user()._id});
            console.log("THIS IS THE ID" + Meteor.user()._id);
    console.log("THI SIS THE ASSOCIATED ACCOUNT:" + associatedAccount);
    if (associatedAccount) {
      console.log("ALREADY THERE");
      
      UserAccounts.insert({
        associatedUserID: Meteor.user()._id,
        firstName:first_name,
        lastName:last_name,
        email:email_lower_case,
      })
    }
    else {
        console.log("NOT THERE");
     UserAccounts.update({_id: associatedAccount._id}, {
      firstName:first_name,
      lastName:last_name,
      email:email_lower_case,
      
    })
   }
 }
});