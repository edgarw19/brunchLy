

Template.homePage.events({
  'click #makeProfileButton': function(evt) {

    // console.log('click'); 

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