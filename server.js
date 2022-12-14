// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

const db = require('./db/connection')

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
const itemApiRoutes = require('./routes/items-api');
const itemsRoutes = require('./routes/items');
const favoriteRoutes = require('./routes/favorites');
const filterApiRoutes = require('./routes/filter-api');
const { user } = require('pg/lib/defaults');
const messageApiRoutes = require('./routes/messages-api');
const userMessages = require('./routes/messages');
const composeMessage = require('./routes/compose-message');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/api/items', itemApiRoutes);
app.use('/api/filter', filterApiRoutes);
app.use('/api/messages', messageApiRoutes);
app.use('/users', usersRoutes);
app.use('/items', itemsRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/messages', userMessages);
app.use('/compose-message', composeMessage);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {

  const templateVars = {
    user: req.session.user_id
  }

  res.render('index', templateVars);

});

app.post('/login', (req, res) => {
  // set user_id cookie to user.id
  req.session.user_id = 19;

  res.redirect('/');
  return;
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
  return;
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
