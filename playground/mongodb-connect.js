const { MongoClient } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, db) => {
    if (err) {
      return console.log('Unable to connect to mongo server');
    }
    // const db = client.db('TodoApp');
    console.log(`connected to mongo server`);

    db.collection('Todos').insertOne(
      {
        text: 'Eat lunch',
        completed: false
      },
      (err, result) => {
        if (err) {
          return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
      }
    );
    // db.collection('Users').insertOne(
    //   {
    //     name: 'Joseph',
    //     age: 55,
    //     location: 'Ireland'
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log('Unable to insert todo', err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    //   }
    // );
    db.close();
  }
);
