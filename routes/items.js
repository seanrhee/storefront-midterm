const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const itemQueries = require('../db/queries/items');
const messageQueries = require('../db/queries/messages');

//GET route to show user create new item page
router.get('/', (req, res) => {
  db.query(`
  SELECT category
  FROM items
  GROUP BY category
  ORDER BY category`)
    .then(result => {
      const categories = [];

      for (const category of result.rows) {

        categories.push(category.category)
      }

      const templateVars = {
        categories: categories,
        user: req.session.user_id
      }
      res.render('new-item', templateVars);
    })
});


//POST route to update the items database and store the values in req.body
router.post('/', (req, res) => {
  const userId = req.session.user_id;

  if (userId !== 19) {
    res.status(401).send("Please log in to post your ad.");
  } else {
    itemQueries.addItem({ ...req.body, owner_id: userId })
      .then(item => {
        res.redirect(`/items/${item.id}`); //redirect the user to show item page
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  };
})

//GET route to show users individual item page
router.get("/:id", (req, res) => {
  const userId = req.session.user_id;
  const productId = req.params.id;

  itemQueries.getIndividualItem(productId)
    .then((item) => {
      db.query(`
    SELECT category
    FROM items
    GROUP BY category
    ORDER BY category`)
        .then(result => {
          const categories = [];

          for (const category of result.rows) {
            categories.push(category.category)
          }

          let isFavorite = false;
          itemQueries.getSavedItems(userId)
            .then((items) => {
              for (let rows of items) {
                let itemId = rows.item_id.toString();
                if (itemId === productId) {
                  isFavorite = true;
                  break;
                }
              }

              const templateVars = {
                user: userId,
                categories: categories,
                item,
                isFavorite
              };

              res.render("item", templateVars);
            })
        })
    })
});

// post route to delete item
router.post('/:id/delete', (req, res) => {
  const userId = req.session.user_id;
  const productId = req.params.id;

  itemQueries.deleteUserItem(productId)
  .then(result => {
    res.redirect(`/users/${userId}`)
    return;
  })
})

router.get('/:id/edit', (req, res) => {
  const userId = req.session.user_id;
  const productId = req.params.id;

  itemQueries.getIndividualItem(productId)
  .then(result => {
    const templateVars = {
      user: userId,
      item: result
    }

    res.render('edit-item', templateVars)
  })
})

router.post('/:id/edit', (req, res) => {
  const userId = req.session.user_id;
  const productId = req.params.id;
  itemQueries.updateUserItem(req.body, productId, userId)
  .then(result => {
    res.redirect(`/items/${productId}`);
    return;
  })
  .catch((err) => {
    console.log(err);
  })
})

router.post('/:id', (req, res) => {
  const { user_id } = req.session;
  const { message } = req.body;
  const { id } = req.params;
  const timestamp = Date.now();

  itemQueries.getItemOwner(id)
    .then(result => {
      const owner_id = result[0].owner_id
      messageQueries.sendMessage(user_id, owner_id, message, timestamp)
        .then(result => {
          res.redirect(`/items/${id}`)
        })
    })
});

module.exports = router;
