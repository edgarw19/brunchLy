if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Introducing Telescope',
    url: 'http://sachagreif.com/introducing-telescope/'
  });

  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });

  Posts.insert({
    title: 'The Meteor Book',
    url: 'http://themeteorbook.com'
  });
}

if (Dummies.find().count() === 0) {
  Dummies.insert({
    email: "bob",
    values: [1,2,3,4,5, 6]
    , prevBrunches: []
  });

  Dummies.insert({
        email: "joe",
    values: [2,3,4,5,6,7]
        , prevBrunches: []
  });

  Dummies.insert({
        email: "kai",
    values: [2,3,4,52,6,125]
        , prevBrunches: []
  });
    Dummies.insert({
        email: "liz",
    values: [2,3,4,52,6,7]
          , prevBrunches: []
  });
    Dummies.insert({
        email: "taylor",
    values: [2,3,4,52,35,7]
          , prevBrunches: []
  });
    Dummies.insert({
        email: "potato",
    values: [2,15,4,52,6,7]
          , prevBrunches: []
  });
}


console.log("ALWAYS RUNNING");