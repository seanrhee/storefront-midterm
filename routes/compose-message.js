const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');



router.get('/', (req, res) => {
  const templateVars = { user: req.session.user_id }

  db.query(`SELECT users.id, first_name, last_name, items.photo_url, items.owner_id, items.price_per_item, items.title
  FROM users
  JOIN items ON users.id = items.owner_id
  WHERE items.owner_id < 26
  GROUP BY users.id, items.photo_url, items.owner_id, items.price_per_item, items.title
  `)
    .then(result => {
      const photos = [];
      const sellers = [];
      const prices = [];
      const firstNames = [];
      const lastNames = [];
      const titles = [];

      // console.log(result.rows);

      for (const info of result.rows) {
        photos.push(info.photo_url);
        sellers.push(info.owner_id);
        prices.push(info.price_per_item);
        firstNames.push(info.first_name);
        lastNames.push(info.last_name);
        titles.push(info.title);
      }

      const templateVars = {
        user: req.session.user_id,
        photos,
        sellers,
        prices,
        firstNames,
        lastNames,
        titles
      }

      res.render('compose-message', templateVars);
    })
})

// router.post("/", (req, res) => {
//   const templateVars = { user: req.session.user_id }
//   console.log(req.body);
//   res.render('compose-message', templateVars);
//   // res.send('ok');
// });


router.post('/', (req, res) => {
  const userId = req.session.userId;
  console.log(req.body)
  messageQueries.createNewMessage({ ...req.body, owner_id: userId })
    .then(item => {
      res.redirect(`/items/${item.id}`); //redirect the user to show item page
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });


})

module.exports = router;
