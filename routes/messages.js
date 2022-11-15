const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');
const itemQueries = require('../db/queries/items');



router.get('/', (req, res) => {
  db.query(`SELECT users.id, first_name, last_name, items.photo_url, items.owner_id, items.price_per_item, messages.message
  FROM users
  JOIN items ON users.id = items.owner_id
  JOIN messages ON users.id = messages.seller_id
  WHERE items.owner_id < 26
  GROUP BY users.id, items.photo_url, items.owner_id, items.price_per_item, messages.message
  `)
    .then(result => {
      const photos = [];
      const sellers = [];
      const prices = [];
      const firstNames = [];
      const lastNames = [];
      const messages = [];

      console.log(result.rows);

      for (const info of result.rows) {
        photos.push(info.photo_url);
        sellers.push(info.owner_id);
        prices.push(info.price_per_item);
        firstNames.push(info.first_name);
        lastNames.push(info.last_name);
        messages.push(info.message);
      }

      const templateVars = {
        user: req.session.user_id,
        photos,
        sellers,
        prices,
        firstNames,
        lastNames,
        messages
      }

      res.render('messages', templateVars);
    })
});

module.exports = router;
