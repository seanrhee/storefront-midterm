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
})

//GET route to show users individual item page
app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  const longURL = req.body.longURL;
  urlDatabase[id].longURL = longURL;
  const userid = req.session.user_id;

  if (!userid) {
    return res.status(401).send("Please log in to see your tinyURLs.");
  } else if (!urlDatabase[id]) {
    return res.status(404).send("This tiny URL does not exist.");
  } else if (userid !== urlDatabase[req.params.id].userID) {
    return res.status(403).send("You are not authorized to access this tinyURL.");
  } else {
    res.redirect("/urls");
  };

});

//POST route to let users update individual item info
app.post("/items/:id", (req, res) => {


});

//POST route to let users update individual item info
app.post("/items/:id/delete", (req, res) => {


});


module.exports = router;
