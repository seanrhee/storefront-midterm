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
  select *
  from pets as pets where pets.id
  not in (select other_pet as id from relationships where current_pet = $1)
  `, [req.params.id])
    .then(({ rows: pets }) => {
      res.json(
        pets
      );
    });
});
module.exports = router;
