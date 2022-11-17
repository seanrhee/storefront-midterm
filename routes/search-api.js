const express = require('express');
const router  = express.Router();
const queryString = require('querystring')
const searchQueries = require('../db/queries/search');

router.get('/:query', (req, res) => {
  console.log('hi im here')
  console.log(req.params.query)
  searchQueries.searchBar(req.params.query)
  .then(items => {
    console.log('item got from api')
    res.json({ items })
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  });
});

module.exports = router;