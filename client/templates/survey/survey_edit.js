Template.surveyEdit.created = function() {
  console.log('created!');	
  // Session.set('postSubmitErrors', {});
};

Template.surveyEdit.helpers({
  profile: function() {
    var ret = Profiles.findOne({userId: Meteor.userId()});
    if (!ret) {
      return {  'answers': {'C1': 5, 'C2': 5, 'C3' : 5, 
                            'O1': 5, 'O2': 5, 'O3' : 5,
                            'N1': 5, 'N2': 5, 'N3' : 5,
                            'A1': 5, 'A2': 5, 'A3' : 5,
                            'E1': 5, 'E2': 5, 'E3' : 5}};
    }
    // console.log(ret); 
    return ret;
  },
  questions: {'C1': "I have a clear set of goals that I work towards in an orderly fashion", 
              'C2': "I am comfortable making quick decisions under pressure.",
              'C3': "I make lists (in my head or in writing) to break down tasks into.", 

              'O1': "I enjoy intellectual pursuits for their own sake and are likely to derive satisfaction from theoretical discussion.", 
              'O2': "I like trying new, foreign foods.", 
              'O3': "My friends are mostly people with value systems similar to my own.", 

              'N1': "I tend to remain calm under pressure.", 
              'N2': "I find that my mood can change strongly and rapidly throughout a day.", 
              'N3': "I often feel jealous of the accomplishments of my friends and peers.", 

              'A1': "In group projects I am comfortable trusting others to stick to deadlines.", 
              'A2': "I am empathetic: when one of my friends feels something, I usually do too.", 
              'A3': "I have done things that I didn’t really want to simply because a friend asked me to.", 

              'E1': "I am comfortable smiling and getting to know strangers.", 
              'E2': "I am assertive in my beliefs and feel comfortable sharing them with others.", 
              'E3': "When I’m around other people I am naturally talkative and inquisitive." } 
});

// Template.postSubmit.helpers({
//   errorMessage: function(field) {
//     return Session.get('postSubmitErrors')[field];
//   },
//   errorClass: function (field) {
//     return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
//   }
// });

Template.surveyEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var ratings = $(e.target).find('[name=rating]');
    var grouped = [0, 0, 0, 0, 0];
    var answers = {};
    //for (var i = 0; i < ratings.length; i++) {
    ratings.each(function (i, rating) {
        grouped[Math.floor(i/3)] += $(rating).val();
    });

    grouped = grouped.map(function (x) {return x / 3.0});
    console.log('grouped', grouped);

    answers['grouped'] = grouped;

    ratings.each(function (el, rating) {
      answers[$(rating).attr('data-desc')] = $(rating).val();
    });

    // var errors = validatePost(post);
    // if (errors.title || errors.url)
    //   return
      // return Session.set('postSubmitErrors', errors);
    
    console.log('answers:', answers);
    Meteor.call('profileEdit', answers, function(error, result) {
      // display the error to the user and abort
      if (error)
        return throwError(error.reason);
      
      console.log('reroute', result);
      Router.go('userpage', {_id: result._id});
    });
  }
});
