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
    values: [5, 2, 3, 4, 5]
    , prevBrunches: []
  });

  Dummies.insert({
        email: "joe",
    values: [1, 3, 3, 4, 5]
        , prevBrunches: []
  });

  Dummies.insert({
        email: "kai",
    values:[1, 3, 3, 4, 5]
        , prevBrunches: []
  });
    Dummies.insert({
        email: "liz",
    values:[1, 3, 3, 4, 5]
          , prevBrunches: []
  });
    Dummies.insert({
        email: "taylor",
    values: [1, 4, 3, 4, 5]
          , prevBrunches: []
  });
    Dummies.insert({
        email: "potato",
    values:[1, 2, 3, 4, 1]
          , prevBrunches: []
  });
      Dummies.insert({
        email: "john",
    values:[1, 3, 3, 4, 5]
          , prevBrunches: []
  });
}


console.log("ALWAYS RUNNING");