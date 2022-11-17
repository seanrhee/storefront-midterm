const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');



router.get('/:seller_id', (req, res) => {
  const seller = req.params.seller_id;
  const user = req.session.user_id;

  messageQueries.getInboxDetails(user)
  .then(messages => {
    console.log(messages);

      const templateVars = {
        user,
        seller
      }

      res.render('compose-message', templateVars);
    })
})


module.exports = router;
