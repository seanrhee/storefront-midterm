const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');


router.get('/', (req, res) => {
  const user = req.session.user_id;

  messageQueries.getInboxForUser(user)
    .then(messages => {
      const ids = [];
      const fullNames = [];
      const photos = [];
      const prices = [];
      const sellerMessages = [];
      const buyers = [];
      const sellers = [];
      const dates = [];

      for (const info of messages) {
        ids.push(info.message_id);
        fullNames.push(info.full_name);
        prices.push(info.price_per_item);
        photos.push(info.photo_url);
        sellerMessages.push(info.message);
        buyers.push(info.buyer_id);
        sellers.push(info.seller_id);
        dates.push(info.date_sent);
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
