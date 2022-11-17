const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');



router.get('/:id', (req, res) => {
  const creator = req.params.id;
  console.log(req.params);
  console.log("after")
  const user = 5;
  let recipient;
  let contactId;
  let firstName;
  let lastName;
  let itemId;
  let itemTitle;
  let itemPrice;
  let itemPhoto;

  messageQueries.getInboxDetails(user, creator)
    .then(message => {
      // console.log(message);

      contactId = message[0].creator_id;
      recipient = message[0].recipient_id;
      db.query(`SELECT first_name, users.last_name FROM users WHERE users.id = ${contactId}`)
        .then(result => {
          firstName = result.rows[0].first_name;
          lastName = result.rows[0].last_name;
          db.query(`SELECT * FROM items WHERE owner_id = ${contactId}`)
            .then(item => {
              itemId = item.rows[0].id;
              itemTitle = item.rows[0].title;
              itemPrice = item.rows[0].price_per_item;
              itemPhoto = item.rows[0].photo_url;


              const templateVars = {
                user,
                recipient,
                creator,
                contactId,
                firstName,
                lastName,
                itemId,
                itemTitle,
                itemPrice,
                itemPhoto
              }

              res.render('compose-message', templateVars);
            })
        })
    })
})


module.exports = router;
