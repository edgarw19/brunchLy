UserAccounts = new Mongo.Collection('UserAccounts');

var Schemas = {};

Schemas.UserAdditions = new SimpleSchema({
  associatedUserID:{
    type: String
  },
    firstName: {
      type: String,
      optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
  email: {
        type: String,
        optional: true
    },
    questionAnswers: {
        type: [Number],
        optional: true
    },


});

UserAccounts.attachSchema(Schemas.UserAdditions);

UserAccounts.allow({
  insert: function (userId, doc) {
    return true;
  }
});
