const express = require('express');
const router = express.Router()
const messageQueries = require('../db/queries/messages');


router.get('/', (req, res) => {
  const user = req.session.user_id;
  const templateVars = { user }

  messageQueries.getInboxDetails(user)
    .then(result => { })
  res.render('messages', templateVars);
});

module.exports = router;
