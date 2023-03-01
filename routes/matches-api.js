const express = require('express');
const router  = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  return db.query(`
  SELECT id, user_id, name, breed, age, sex, size, spayed_or_neutered, city, description, photo_url
  FROM
  ((SELECT DISTINCT pet_one
    FROM matches
    WHERE matches.pet_one_match IS TRUE AND matches.pet_two_match IS TRUE)
  UNION
  (SELECT DISTINCT pet_two
    FROM matches
    WHERE matches.pet_one_match IS TRUE AND matches.pet_two_match IS TRUE)) AS matched
  JOIN pets ON matched.pet_one = pets.id
  `)
    .then(({ rows: matches }) => {
      res.json(
        matches.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
});


module.exports = router;
