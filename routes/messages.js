const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');

router.get('/', (req, res) => {
  const user = req.session.user_id;

  db.query(`
  SELECT * FROM users WHERE users.id = ${user}`)
    .then(result => {
      const userInfo = result.rows[0];
      messageQueries.getInboxDetails(user)
        .then(result => { })

      const templateVars = {
        user,
        userInfo
      }

      res.render('messages', templateVars);
    })
});

module.exports = router;
