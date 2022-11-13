const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const itemQueries = require('../db/queries/items');

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

module.exports = router;
