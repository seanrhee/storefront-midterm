const express = require('express');
const router = express.Router();
const messageQueries = require('../db/queries/messages');

router.get('/', (req, res) => {
  const user = req.session.user_id;

  messageQueries.getInboxDetails(user)
    .then(messages => {
      res.json({ messages });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:id', (req, res) => {
  const user = req.session.user_id;
  // const user = req.params.id;

  messageQueries.getUserDetails(user)
    .then(page => {
      res.json({ page });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.page });
    });
});

module.exports = router;
