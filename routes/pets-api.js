const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  return db.query(`
  SELECT *
  FROM pets
  ORDER BY id DESC
  `)
    .then(({ rows: pets }) => {
      res.json(
        pets.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
});


module.exports = router;
