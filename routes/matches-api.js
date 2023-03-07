const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/', (req, res) => {
  return db.query(`
  SELECT *
  FROM matches
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

router.get('/:id', (req, res) => {
  return db.query(`
  SELECT id, user_id, name, breed, age, sex, size, spayed_or_neutered, city, description, photo_url
  FROM
  ((SELECT DISTINCT pet_one
    FROM matches
    WHERE matches.pet_one_match IS TRUE AND matches.pet_two_match IS TRUE AND pet_two = $1)
  UNION
  (SELECT DISTINCT pet_two
    FROM matches
    WHERE matches.pet_one_match IS TRUE AND matches.pet_two_match IS TRUE AND pet_one = $1)) AS matched
  JOIN pets ON matched.pet_one = pets.id
  `,
  [Number(req.params.id)])
    .then(({ rows: matches }) => {
      res.json(
        matches.reduce(
          (previous, current) => ({ ...previous, [current.id]: current }),
          {}
        )
      );
    });
});

router.put('/', (req, res) => {
  console.log(req.body);
  return db.query(`
  with updated as (
    UPDATE matches
    SET pet_two_match = TRUE
    WHERE (pet_one = $2 AND pet_two = $1)
    returning *
    )
    INSERT INTO matches (pet_one, pet_two) SELECT $1, $2
    WHERE NOT EXISTS (SELECT * FROM matches WHERE
      (pet_one = $1 AND pet_two = $2) OR (pet_one = $2 AND pet_two = $1))`,
  [Number(req.body.pet_one), Number(req.body.pet_two)])
    .then(({ rows: matches }) => {
      setTimeout(() => {
        res.status(204).json({matches});
      }, 1000);
    })
    .catch(error => console.log(error));
});

router.delete("/", (req, res) => {
  return db.query(`
  DELETE FROM matches WHERE (pet_one = $1 AND pet_two = $2) OR (pet_one = $2 AND pet_two = $1)`,
  [Number(req.body.pet_id), Number(req.body.other_id)])
    .then(() => {
      setTimeout(() => {
        res.status(204).json({});
      }, 1000);
    });
});

module.exports = router;
