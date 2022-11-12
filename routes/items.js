const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

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
    console.log(templateVars);
    res.render('new-item', templateVars);
  })
});

router.post('/', (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }
})


module.exports = router;
