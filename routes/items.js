const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const itemQueries = require('../db/queries/items');

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
        console.log(category)
        categories.push(category.category)
      }

      console.log(categories);

      const templateVars = {
        categories: categories,
        user: req.session.user_id
      }
      res.render('new-item', templateVars);
    })
});


//POST route to update the items database and store the values in req.body
router.post('/', (req, res) => {
  const userId = req.session.userId;
  console.log(req.body)

  itemQueries.addItem({ ...req.body, owner_id: userId })
    .then(item => {
      res.send(item);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });

  if (!userId) {
    res.status(401).send("Please log in to post new item.");
  } else {
    res.redirect(`/${id}`); //redirect the user to show item page
  };
})

//GET route to show users individual item page
router.get("/:id", (req, res) => {
  const item = itemQueries.getIndividualItem(req.params.id)

  db.query(`
  SELECT category
  FROM items
  GROUP BY category
  ORDER BY category`)
    .then(result => {
      const categories = [];

      for (const category of result.rows) {
        console.log(category)
        categories.push(category.category)
      }

      const templateVars = {
        categories: categories,
        item: item
      };

      res.render("item", templateVars);
    })
});

// //POST route to let users update individual item info
// app.post("/items/:id", (req, res) => {


// });

// //POST route to let users update individual item info
// app.post("/items/:id/delete", (req, res) => {


// });


module.exports = router;
