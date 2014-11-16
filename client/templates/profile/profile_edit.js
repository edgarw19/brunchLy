Template.profileEdit.created = function() {
  console.log('created!');	
  // Session.set('postSubmitErrors', {});
};

Template.profileEdit.helpers({
  profile: function() {
    console.log('id', Meteor.userId());
    var ret = Profiles.findOne({userId: Meteor.userId()});
    if (!ret) {
      return {'answers': {'dangerous_thoughts': 5, 'rioting_thoughts': 5}};
    }
    return ret;
  }
});

// Template.postSubmit.helpers({
//   errorMessage: function(field) {
//     return Session.get('postSubmitErrors')[field];
//   },
//   errorClass: function (field) {
//     return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
//   }
// });

Template.profileEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log('this is', this);
    
    var ratings = $(e.target).find('[name=rating]');
    var answers = {};
    ratings.each(function (el, rating) {
      answers[$(rating).attr('data-desc')] = $(rating).val();
    });

    // var errors = validatePost(post);
    // if (errors.title || errors.url)
    //   return
      // return Session.set('postSubmitErrors', errors);
    
    console.log('answers', answers);
    Meteor.call('profileEdit', answers, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      console.log('reroute', result);
      Router.go('homePage', {_id: result._id});  
    });
  }
});
