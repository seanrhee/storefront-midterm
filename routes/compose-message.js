const express = require('express');
const router = express.Router()
const db = require('../db/connection');
const messageQueries = require('../db/queries/messages');



router.get('/:creator_id', (req, res) => {
  const creator = req.params.creator_id;
  const user = 5;
  let contactId;
  let firstName;
  let lastName;

  messageQueries.getInboxDetails(user, creator)
    .then(message => {
      contactId = message[0].creator_id;
      db.query(`SELECT first_name, users.last_name FROM users WHERE users.id = ${contactId}`)
      .then(result => {
        firstName = result.rows[0].first_name;
        lastName = result.rows[0].last_name;
        
        const templateVars = {
          user,
          creator,
          contactId,
          firstName,
          lastName
        }

        res.render('compose-message', templateVars);
      })
    })
})

// router.get("/:id", (req, res) => {
//   itemQueries.getIndividualItem(req.params.id)
//     .then((item) => {
//       db.query(`
//       SELECT category
//       FROM items
//       GROUP BY category
//       ORDER BY category`)
//         .then(result => {
//           const categories = [];

//           for (const category of result.rows) {
//             categories.push(category.category)
//           }

//           const templateVars = {
//             user: req.session.user_id,
//             categories: categories,
//             item,
//           };

//           res.render("item", templateVars);
//         })
//     })


module.exports = router;
