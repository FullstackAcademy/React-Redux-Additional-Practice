const express = require('express');
const app = express();
const path = require('path');
const { pgClient, syncAndSeed } = require('./seed');

app.listen(3000, () => console.log('listening on port 3000'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.json());

app.get('/', (req, res, next) => {
  try {
    res.sendFile('index.html');
  } catch (error) {
    next(error);
  }
});

app.get('/users', async (req, res, next) => {
  try {
    const { rows } = await pgClient.query('SELECT * FROM users;');
    res.send(rows);
  } catch (error) {
    next(error);
  }
});

app.post('/users', async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const { rows } = await pgClient.query(
      'INSERT INTO users(firstname, lastname, email) VALUES ($1, $2, $3) RETURNING *;',
      [firstName, lastName, email]
    );
    res.send(rows[0]);
  } catch (error) {
    next(error);
  }
});

syncAndSeed();
