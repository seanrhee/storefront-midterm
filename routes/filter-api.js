const express = require('express');
const router  = express.Router();
const filterQueries = require('../db/queries/filter');

router.get('/:query', (req, res) => {
  console.log('hi im here')
  console.log(req.params.query)
  filterQueries.filterBar(req.params.query)
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