const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, db) => {
    if (err) {
      return console.log('Unable to connect to mongo server');
    }
    // const db = client.db('TodoApp');
    console.log(`connected to mongo server`);
    // db.collection('Todos')
    //   .deleteMany({ text: 'Eat lunch' })
    //   .then(result => console.log(result));

    db.collection('Todos')
      .findOneAndUpdate(
        { _id: new ObjectID('5b3cd326badfb023bf9c821a') },
        {
          $set: {
            completed: true
          }
        },
        { returnOrigial: false }
      )
      .then(result => console.log(result));
    // db.close();
  }
);
