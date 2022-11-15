const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');

router.get('/', (req, res) => {
  messageQueries.getMessages()
    .then(messages => {
      res.json({ messages });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
