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
  const userMessage = req.body.message;
  const { id } = req.params;
  const timestamp = Date.now();

  messageQueries.sendMessage(user_id, id, userMessage, timestamp)
    .then(result => {
      console.log('we got the query back from the post')
      res.redirect(`/compose-message/${id}`)
    })

})

module.exports = router;
