
if (Meteor.isClient) {
  Template.login.events({

    'submit #login-form' : function(e, t){

      console.log("### submit")
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#login-username').value, 
          email = t.find('#login-email').value,
          password = t.find('#login-password').value;

          // console.log(username, email, password); 
      // trim email
      email = email.replace(/^\s*|\s*$/g, "");

      //   // If validation passes, supply the appropriate fields to the
      //   // Meteor.loginWithPassword() function.
      //   Meteor.loginWithPassword(email, password, function(err){
      //   if (err) {}
      //     // The user might not have been found, or their passwword
      //     // could be incorrect. Inform the user that their
      //     // login attempt has failed. 
      //   else {}
      //     // The user has been logged in.
      // });
         return false; 
      }
  });
}