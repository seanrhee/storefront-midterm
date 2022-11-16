const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');


router.get('/', (req, res) => {
  const user = req.session.user_id;

  messageQueries.getInboxForUser(user)
  .then(messages => {

      const photos = [];
      const sellers = [];
      const prices = [];
      const fullNames = [];
      const sellerMessages = [];

      for (const info of messages) {
        photos.push(info.photo_url);
        sellers.push(info.owner_id);
        prices.push(info.price_per_item);
        fullNames.push(info.full_name);
        sellerMessages.push(info.message);
      }

      const templateVars = {
        user,
        photos,
        sellers,
        prices,
        fullNames,
        sellerMessages
      }

      res.render('messages', templateVars);
    })
});

module.exports = router;
