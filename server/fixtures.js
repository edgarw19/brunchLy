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

if (Restaurants.find().count === 0) {
  Restaurants.insert({
    name: 'Thai Village',
    type: 'Thai',
    address: '235 Nassau St, Princeton, NJ 08540',
    phone: '(609) 683-3896'
  });

  Restaurants.insert({
    name: 'Naked Pizza',
    type: 'Italian',
    address: '180 Nassau St, Princeton, NJ 08542',
    phone: '(609) 924-4700'
  });

  Restaurants.insert({
    name: 'EPS Corner',
    type: 'Chinese',
    address: '238 Nassau St, Princeton, NJ 08542',
    phone: '(609) 921-2388'
  });

  Restaurants.insert({
    name: 'Cheeburger Cheeburger',
    type: 'American',
    address: '182 Nassau St, Princeton, NJ 08542',
    phone: '(609) 921-0011'
  });

  Restaurants.insert({
    name: 'Mehek',
    type: 'Indian',
    address: '164 Nassau St, Princeton, NJ 08542',
    phone: '(609) 279-9191'
  });

  Restaurants.insert({
    name: 'Mamoun\'s',
    type: 'Middle Eastern',
    address: '58 Easton Ave, New Brunswick, NJ 08901',
    phone: '(732) 640-0794'
  });
}

// if (Dummies.find().count() === 0) {
//   Dummies.insert({
//     email: "joannajw@princeton.edu",
//     values: [5, 2, 3, 4, 5]
//     , prevBrunches: []
//   });

//   Dummies.insert({
//     email: "edgarw@princeton.edu",
//     values: [5, 2, 3, 4, 5]
//     , prevBrunches: []
//   });

//   Dummies.insert({
//     email: "yichengs@princeton.edu",
//     values: [5, 2, 3, 4, 5]
//     , prevBrunches: []
//   });
  // Dummies.insert({
  //   email: "joanna.j.wang@princeton.edu",
  //   values: [1, 1, 1, 1, 1]
  //   , prevBrunches: []
  // });

// D
//     email: "bob",
//     values: [5, 2, 3, 4, 5]
//     , prevBrunches: []
//   });

  // Dummies.insert({
  //       email: "joe",
  //   values: [1, 3, 3, 4, 5]
  //       , prevBrunches: []
  // });

  // Dummies.insert({
  //       email: "kai",
  //   values:[1, 3, 3, 4, 5]
  //       , prevBrunches: []
  // });
  //   Dummies.insert({
  //       email: "liz",
  //   values:[1, 3, 3, 4, 5]
  //         , prevBrunches: []
  // });
  //   Dummies.insert({
  //       email: "taylor",
  //   values: [1, 4, 3, 4, 5]
  //         , prevBrunches: []
  // });
  //   Dummies.insert({
  //       email: "potato",
  //   values:[1, 2, 3, 4, 1]
  //         , prevBrunches: []
  // });
  //     Dummies.insert({
  //       email: "john",
  //   values:[1, 3, 3, 4, 5]
  //         , prevBrunches: []
  // });
  //       Dummies.insert({
  //       email: "tim",
  //   values:[1, 3, 3, 4, 5]
  //         , prevBrunches: []
  // });
// }


// console.log("ALWAYS RUNNING");