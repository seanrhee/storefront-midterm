const express = require('express');
const router = express.Router()
const db = require('../db/connection');
// const messageQueries = require('../db/queries/messages');


router.get('/:id', (req, res) => {
  const sender = req.params.id;
  const user = 5;

  let recipient;
  let item

  db.query(`SELECT * FROM users WHERE users.id = ${sender}`)
    .then(result => {
      recipient = result.rows[0];
      db.query(`SELECT * FROM items WHERE owner_id = ${sender}`)
        .then(result => {
          item = result.rows[0];

          const templateVars = {
            user,
            recipient,
            sender,
            item,
          }

          res.render('compose-message', templateVars);
        })
    })
})

router.post('/:id', (req, res) => {
  console.log(req.params.id);
})

module.exports = router;
