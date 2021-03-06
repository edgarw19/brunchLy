Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
   notFoundTemplate: 'notFound',
  waitOn: function(){return Meteor.subscribe('posts');}
});


Router.route('/posts/:_id', {
  name: 'postPage',
  data: function(){ return Posts.findOne(this.params._id);}
});

Router.route('/submit', {name: 'postSubmit'})
Router.route('/', {name: 'homePage'});
Router.route('/userProfile', {name: 'userProfile'});
Router.onBeforeAction('dataNotFound', {only: 'postPage'});

Router.route('/survey', {
  name: 'surveyEdit',
  // TODO put this back?
  waitOn: function() { 
    return Meteor.subscribe('profile');
  }
  // data: function() { return Profiles.findOne(Meteor.user()._id); }
});

Router.route('/signup', {
  name: 'signup'
});

Router.route('/userpage', {
  name: 'userpage',
  waitOn: function() { 
    return [Meteor.subscribe('profile'), Meteor.subscribe('allUsers')];
  }
});