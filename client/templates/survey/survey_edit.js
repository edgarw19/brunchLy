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
  questions: {'C1': "If I want to achieve my dream job, I know exactly how I'm going to do it.", 
              'C2': "If I have 10 seconds to decide whether or not I'm gonna make this 10meter dive, I'll decide in 10 seconds.",
              'C3': "I don't need a notepad. Because I can visualize all I need to write down!", 

              'O1': "I like talking about philosophy and other brainy things.", 
              'O2': "New spicy Mediterranean food? I'm down.", 
              'O3': "My friends like many of the same things I like.", 

              'N1': "Last minute free-throw to decide the game? No pressure for me.", 
              'N2': "Sometimes I wake up pretty happy but by the end of the day, I don't feel like talking to anyone.", 
              'N3': "I will be the best. NOBODY can be better than me!", 

              'A1': "I definitely trust Bobby to finish the part of the project he's assigned.", 
              'A2': "When my friend talks about her existential crisis, I'm pretty good at consoling her.", 
              'A3': "If you ask me to eat that cheesecake 5 times, I'll probably cave in the fifth time.", 

              'E1': "I am comfortable smiling and getting to know strangers.", 
              'E2': "I am assertive in my beliefs and feel comfortable sharing them with others.", 
              'E3': "When I’m around other people I am naturally talkative and inquisitive." },

  // questions: [{tag: 'C1', text: 'I have a clear set of goals that I work towards in an orderly fashion'}, 
  //             {tag: 'C2', text: "I am comfortable making quick decisions under pressure."},
  //             {tag: 'C3', text: "I make lists (in my head or in writing) to break down tasks into."}, 

  //             {tag: 'O1', text: "I enjoy intellectual pursuits for their own sake and are likely to derive satisfaction from theoretical discussion."}, 
  //             {tag: 'O2', text: "I like trying new, foreign foods."}, 
  //             {tag: 'O3', text: "My friends are mostly people with value systems similar to my own."}, 

  //             {tag: 'N1', text: "I tend to remain calm under pressure."}, 
  //             {tag: 'N2', text: "I find that my mood can change strongly and rapidly throughout a day."}, 
  //             {tag: 'N3', text: "I often feel jealous of the accomplishments of my friends and peers."}, 

  //             {tag: 'A1', text: "In group projects I am comfortable trusting others to stick to deadlines."}, 
  //             {tag: 'A2', text: "I am empathetic: when one of my friends feels something, I usually do too."}, 
  //             {tag: 'A3', text: "I have done things that I didn’t really want to simply because a friend asked me to."}, 

  //             {tag: 'E1', text: "I am comfortable smiling and getting to know strangers."}, 
  //             {tag: 'E2', text: "I am assertive in my beliefs and feel comfortable sharing them with others."}, 
  //             {tag: 'E3', text: "When I’m around other people I am naturally talkative and inquisitive."}], 

restaurantTypes: [{text: 'Thai'}, 
                  {text: 'American'}, 
                  {text: 'Middle Eastern'}, 
                  {text: 'Indian'}, 
                  {text: 'Italian'}, 
                  {text: 'Chinese'}]
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

    grouped = grouped.map(function (x) {
      var avg = parseFloat((x/3.0).toPrecision(2));
      return avg
    });
    console.log('grouped', grouped);

    answers['grouped'] = grouped;

    ratings.each(function (el, rating) {
      answers[$(rating).attr('data-desc')] = $(rating).val();
    });2

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
