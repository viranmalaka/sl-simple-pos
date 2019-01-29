
// copied from  -> https://medium.com/@art.longbottom.jr/concurrent-testing-with-mongoose-and-jest-83a27ceb87ee
const mongoose = require('mongoose');

// Load models since we will not be instantiating our express server.
require('./models/item');
require('./models/order');
require('./models/user');

beforeAll(function(done) {
  /*
    Define clearDB function that will loop through all 
    the collections in our mongoose connection and drop them.
  */
  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].deleteMany(function() {});
    }
    return done();
  }

  /*
    If the mongoose connection is closed, 
    start it up using the test url and database name
    provided by the node runtime ENV
  */
  if (mongoose.connection.readyState === 0) {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      'mongodb://localhost:27017/simple-pos-test-db', { useNewUrlParser: true }, 
      function(err) {
        if (err) {
          throw err;
        }
        return clearDB();
      }
    );
  } else {
    return clearDB();
  }
});

// afterEach(function(done) {
//   return done();
// });

afterAll(done => {
  mongoose.disconnect();
  return done();
});