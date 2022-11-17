const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');



router.get('/:creator_id', (req, res) => {
  const creator = req.params.creator_id;
  // const user = req.session.user_id;
  const user = 5;

  messageQueries.getInboxDetails(user, creator)
  .then(messages => {
    console.log(messages);

      const templateVars = {
        user,
        creator
      }

      res.render('compose-message', templateVars);
    })
})



module.exports = router;
