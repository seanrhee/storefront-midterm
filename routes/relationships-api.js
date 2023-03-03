const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  return db.query(`
  SELECT *
  FROM relationships
  `)
    .then(({ rows: relationships }) => {
      res.json(
        relationships.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
});


module.exports = router;
