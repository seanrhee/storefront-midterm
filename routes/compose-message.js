const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');



router.get('/', (req, res) => {
  const user = req.session.user_id;

  messageQueries.getChatHistoryWithUser(user)
  .then(messages => {
    const ids = [];
    const fullNames = [];
      const photos = [];
      const prices = [];
      const sellerMessages = [];
      const buyers = [];
      const sellers = [];
      const dates = [];
      const titles = [];

      for (const info of messages) {
        ids.push(info.message_id);
        fullNames.push(info.full_name);
        prices.push(info.price_per_item);
        photos.push(info.photo_url);
        sellerMessages.push(info.message);
        buyers.push(info.buyer_id);
        sellers.push(info.seller_id);
        dates.push(info.date_sent);
        titles.push(info.title);
      }

      const templateVars = {
        user,
        photos,
        sellers,
        prices,
        fullNames,
        sellerMessages,
        dates,
        titles
      }

      res.render('compose-message', templateVars);
    })
})

router.get('/:seller_id', (req, res) => {
  const seller = req.params.seller_id;
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
      const titles = [];

      for (const info of messages) {
        ids.push(info.message_id);
        fullNames.push(info.full_name);
        prices.push(info.price_per_item);
        photos.push(info.photo_url);
        sellerMessages.push(info.message);
        buyers.push(info.buyer_id);
        sellers.push(info.seller_id);
        dates.push(info.date_sent);
        titles.push(info.title);
      }

      const templateVars = {
        user,
        photos,
        sellers,
        prices,
        fullNames,
        sellerMessages,
        dates,
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


// router.post('/', (req, res) => {
//   const userId = req.session.userId;
//   console.log(req.body)
//   messageQueries.createNewMessage({ ...req.body, owner_id: userId })
//     .then(item => {
//       res.redirect(`/items/${item.id}`); //redirect the user to show item page
//     })
//     .catch(e => {
//       console.error(e);
//       res.send(e)
//     });


// })

module.exports = router;
