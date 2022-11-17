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


router.get('/:seller_id', (req, res) => {
  const user = req.session.user_id;
  const seller = req.params.seller_id;

  messageQueries.getChatHistory(user, seller)
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
