const expect = require('expect');
const request = require('supertest');
const { describe, it, beforeEach } = require('mocha');
const { app } = require('./../server');
const { Todo } = require('./../models/todo');

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      const todos = [
        {
          text: 'First test todo'
        },
        { text: 'Second test todo' }
      ];
      Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test to do test';
    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({ text })
          .then(todoss => {
            expect(todoss.length).toBe(1);
            expect(todoss[0].text).toBe(text);
            return done();
          })
          .catch(e => done(e));
        return res;
      });
  });
  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find()
          .then(todoss => {
            expect(todoss.length).toBe(2);
            return done();
          })
          .catch(e => done(e));
        return res;
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});
