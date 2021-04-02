var express = require('express');
var router = express.Router();
const uuid = require('uuid');

var fakeTodos = [{
  id: 'ae06181d-92c2-4fed-a29d-fb53a6301eb9',
  text: 'Learn about React Ecosystems',
  isCompleted: false,
  createdAt: new Date(),
}, {
  id: 'cda9165d-c263-4ef6-af12-3f1271af5fb4',
  text: 'Get together with friends',
  isCompleted: false,
  createdAt: new Date(Date.now() - 86400000 * 7),
}, {
  id: '2e538cc5-b734-4771-a109-dfcd204bb38b',
  text: 'Buy groceries',
  isCompleted: true,
  createdAt: new Date(Date.now() - 86400000 * 14),
}];

router.use(express.urlencoded({
  extended: true
}));

router.use(express.json());


// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// The route for getting a list of all todos
router.get('/', (req, res) => {
  res.status(200).json(fakeTodos);
});

// The route for getting a list of all todos, but with a delay
// (to display the loading component better)
router.get('/todos-delay', (req, res) => {
  setTimeout(() => res.status(200).json(fakeTodos), 2000);
});

// The route for creating new todo-list items
router.post('/', (req, res) => {
  const { text } = req.body;
  if (text) {
      const insertedTodo = {
          id: uuid(),
          createdAt: Date.now(),
          isCompleted: false,
          text,
      }
      fakeTodos.push(insertedTodo);
      console.log(fakeTodos);
      res.status(200).json(insertedTodo);
  } else {
      res.status(400).json({ message: 'Request body should have a text property' });
  }
});

router.post('/:id/completed', (req, res) => {
  const { id } = req.params;
  const matchingTodo = fakeTodos.find(todo => todo.id === id);
  const updatedTodo = {
      ...matchingTodo,
      isCompleted: true,
  }
  if (updatedTodo) {
      fakeTodos = fakeTodos.map(todo =>
          todo.id === id
              ? updatedTodo
              : todo);
      res.status(200).json(updatedTodo);
  } else {
      res.status(400).json({ message: 'There is no todo with that id' });
  }
})

// The route for deleting a todo-list item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const removedTodo = fakeTodos.find(todo => todo.id === id);
  fakeTodos = fakeTodos.filter(todo => todo.id !== id);
  res.status(200).json(removedTodo);
});

module.exports = router