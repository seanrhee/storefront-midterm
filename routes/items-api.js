const express = require('express');
const router  = express.Router();
const itemQueries = require('../db/queries/items');

router.get('/', (req, res) => {
  itemQueries.getItems()
    .then(items => {
      res.json({ items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.get('/:category', (req, res) => {
  itemQueries.getCategory(req.params.category.toUpperCase())
  .then(items => {
    res.json({ items });
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  })
})

module.exports = router;
