const express = require('express');
const router = express.Router();
const messageQueries = require('../db/queries/messages');

router.get('/', (req, res) => {
  messageQueries.getMessageDetailsForInbox()
    .then(details => {
      console.log(details);
      res.json({ details });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
