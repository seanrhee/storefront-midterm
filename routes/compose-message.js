const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');



router.get('/:creator_id', (req, res) => {
  const creator = req.params.creator_id;
  const user = 5;

  let recipient;
  let item

  db.query(`SELECT * FROM users WHERE users.id = ${creator}`)
    .then(result => {
      recipient = result.rows[0];
      console.log(recipient);
      db.query(`SELECT * FROM items WHERE owner_id = ${creator}`)
        .then(result => {
          item = result.rows[0];

          const templateVars = {
            user,
            recipient,
            creator,
            item,
          }

          res.render('compose-message', templateVars);
        })
    })
})


module.exports = router;
