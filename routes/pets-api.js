const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const petQueries = require('../db/queries/pets');

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

router.get('/:id', (req, res) => {
  console.log("REQ PARAMS:", req.params)
  const petId = req.params.id;

  petQueries.getPetId(petId)
  .then(pets => {
    res.json({ pets });
  })
  .catch(err => {
    res
    .status(500)
    .json({ error: err.message });
  })
});


module.exports = router;
