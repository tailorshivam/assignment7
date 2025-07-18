import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

let todos = [];
let editingId = null;

app.get('/', (req, res) => {
  res.render('index', { todos, editingId: null });
});

app.get('/edit/:id', (req, res) => {
  editingId = parseInt(req.params.id);
  res.render('index', { todos, editingId });
});

app.post('/edit/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, priority } = req.body;

  if (!title.trim()) return res.redirect(`/edit/${id}`);

  todos = todos.map(todo =>
    todo.id === id ? { ...todo, title, priority } : todo
  );

  editingId = null;
  res.redirect('/');
});

app.post('/add', (req, res) => {
  const { title, priority } = req.body;
  if (title.trim()) {
    todos.push({ id: Date.now(), title, priority });
  }
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));