// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const { Pool } = require('pg');

const PORT = process.env.PORT || 8080;
const app = express();

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm',
  port: '5432'
});

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: [")J@NcRfUjWnZr4u7"]
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const itemRoutes = require('./routes/items');
const { user } = require('pg/lib/defaults');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
// Note: mount other resources here, using the same pattern above
app.use('/items', itemRoutes);
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  pool.query(`
  SELECT category
  FROM items
  GROUP BY category
  ORDER BY category`)
  .then(result => {
    const categories = [];

    for (const category of result.rows) {
      console.log(category)
      categories.push(category.category)
    }

    console.log(categories);

    const templateVars = {
      categories: categories,
      user: req.session.user_id
    }
    console.log(templateVars);
    res.render('index', templateVars);
  })
});

app.post('/login', (req, res) => {
  // set user_id cookie to user.id
  req.session.user_id = 5;

  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1`, [5])
  .then(result => {
    console.log(result.rows[0]);

    if (result.rows[0].id === req.session.user_id) {
      res.redirect('/');
      return;
    }

    return console.log('this aint right');
  });
})

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
  return;
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
