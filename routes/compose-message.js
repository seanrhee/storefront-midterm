const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');

router.get('/:id', (req, res) => {
  const { user_id } = req.session;
  const sender = req.params.id;

  db.query(`SELECT * FROM users WHERE users.id = ${sender}`)
    .then(result => {
      const recipient = result.rows[0];

      const templateVars = {
        user: user_id,
        recipient,
        sender,
      }

      res.render('compose-message', templateVars);
    })
})

router.post('/:id', (req, res) => {
  const { user_id } = req.session;
  const {message } = req.body;
  const { id } = req.params;
  const timestamp = Date.now();

  messageQueries.sendMessage(user_id, id, message, timestamp)
    .then(result => {
      res.redirect(`/compose-message/${id}`)
    })
})

module.exports = router;
