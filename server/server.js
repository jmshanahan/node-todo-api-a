// const timestamp = require('unix-timestamp');

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

require('./db/mongoose');

const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save().then(doc => res.send(doc), err => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => res.status(400).send(err)
  );
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id)
    .then(todo => {
      if (!todo) res.status(404).send();
      else {
        res.send({ todo });
      }
    })
    .catch(err => res.status(400).send(err));
  return res;
});
app.listen(port, () => console.log(`Strted on port ${port}`));

module.exports = { app };
