const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');
// const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'labber',
//   password: 'labber',
//   host: 'localhost',
//   database: 'midterm',
//   port: '5432'
// });

router.get('/', (req, res) => {
  db.query(`

  SELECT message FROM messages`)
  .then(result => {
    const messages = [];

    for (const message of result.rows) {
      console.log(message);
      messages.push(message.message);
    }

    console.log(messages);

    const templateVars = {
      messages: messages,
      user: req.session.user_id
    }

    res.render('messages', templateVars);
  })
});

// router.get('/', (req, res) => {
//   db.query(`
//   SELECT category
//   FROM items
//   GROUP BY category
//   ORDER BY category`)
//     .then(result => {
//       const categories = [];

//       for (const category of result.rows) {
//         console.log(category)
//         categories.push(category.category)
//       }

//       console.log(categories);

//       const templateVars = {
//         categories: categories,
//         user: req.session.user_id
//       }
//       res.render('new-item', templateVars);
//     })
// });

module.exports = router;
