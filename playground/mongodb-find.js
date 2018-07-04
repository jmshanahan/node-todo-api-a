const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, db) => {
    if (err) {
      return console.log('Unable to connect to mongo server');
    }
    // const db = client.db('TodoApp');
    console.log(`connected to mongo server`);
    _id = new ObjectID('5b3caefed4224f1b6359e9b4');
    db.collection('Todos')
      .find()
      .count()
      .then(
        count => {
          console.log('Todoos');
          console.log(JSON.stringify(count, undefined, 2));
        },
        err => {
          console.log('Unable to fetch todos', err);
        }
      );

    // db.close();
  }
);
