const express = require('express');
const router  = express.Router();
const queryString = require('querystring')
const searchQueries = require('../db/queries/search');

router.get('/:query', (req, res) => {
  searchQueries.searchBar(req.params.query)
  .then(items => {
    res.json({ items })
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;