const { ObjectID } = require('mongodb');
const { Todo } = require('./../server/models/todo');
require('./../server/db/mongoose');

const id = '5b3e1669d698d89f330c67ea';
ObjectID.isValid(id);
// Note find returns an empty array [] nothing is found
// Where as findOne and findById return null if nothing is found
Todo.find({
  _id: id
}).then(todos => console.log('Todos', todos));

Todo.findOne({
  _id: id
}).then(todo => console.log('Todo ', todo));

Todo.findById(id).then(todo => console.log('Todo by id', todo));
