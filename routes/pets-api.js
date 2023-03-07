const express = require('express');
const router = express.Router();
const db = require('../db/connection');



router.get('/:id', (req, res) => {
  return db.query(`
  SELECT pets.*
  FROM pets
  JOIN users
  ON users.id = pets.user_id
  WHERE users.id = $1
  `, [req.params.id])
    .then(({ rows: pets }) => {
      res.json(
        pets);
    });
});

router.get('/', (req, res) => {
  return db.query(`
  SELECT *
  FROM pets
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


router.post('/users', (req, res) => {
  console.log("hello", req.body);
  return db.query(`
  SELECT *
  FROM pets
  JOIN users
  ON users.id = pets.user_id
  WHERE users.email = $1
  `, [req.body.id])
    .then(({ rows: pets }) => {
      console.log('POST', pets);
      res.json(
        pets
      );
    });
});


router.get('/explore/:id', (req, res) => {
  return db.query(`
  SELECT pets.* FROM pets
  LEFT JOIN relationships ON pets.id = relationships.current_pet
  WHERE pets.id != $1
  OR relationships.interact = false
  UNION
  SELECT pets.* FROM pets
  LEFT JOIN relationships ON pets.id = relationships.other_pet
  WHERE pets.id != $1
  OR relationships.interact = false
  LIMIT 25
  `, [req.params.id])
    .then(({ rows: pets }) => {
      res.json(
        pets
      );
    });
});
module.exports = router;
