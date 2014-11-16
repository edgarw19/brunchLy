Deps.autorun(function(){
  if (Meteor.userId()) {
    var profile = Profiles.find({userId: Meteor.userId()});
    if (profile.count() > 0) {
      Router.go('/userpage');
    } else {
      Router.go('/survey');
    }
  }
});

Template.homePage.events({
  'click #makeProfileButton': function(evt) {


    // console.log($('.dropdown-toggle')); 
    // $('.dropdown-toggle').trigger('click'); 
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    var a = function() {
      $('.dropdown-toggle').attr('aria-expanded', true); 
      $('#login-dropdown-list').addClass('open')
    }
   a(); 
   evt.preventDefault(); 


   return false;

  }

});  

