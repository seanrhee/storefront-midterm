const express = require('express');
const router = express.Router()

router.get('messages', (req, res) => {
  res.render('inbox');
})

router.get('/', (req, res) => {
  pool.query(`
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
    res.render('index', templateVars);
  })
});

module.exports = router;
