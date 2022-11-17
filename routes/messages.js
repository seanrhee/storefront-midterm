const express = require('express');
const router = express.Router()
// const db = require('../db/connection');
// const messageQueries = require('../db/queries/messages');


router.get('/', (req, res) => {
  const templateVars = { user: req.session.user_id }

  res.render('messages', templateVars);
});

module.exports = router;
