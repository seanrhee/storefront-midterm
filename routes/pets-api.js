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

router.post('/:id', (req, res) => {
  console.log("POST REQUEST CALLED") 
  console.log(res.data) 
  console.log(req.params)
  const id = req.params;
  console.log("REQ BODY:", req.body, req.body.name)

    // petQueries.addPet({id: { }})
    //   .then(pet => {
    //     res.redirect(`/pets/${pet.id}`); //redirect the user to show item page
    //   })
    //   .catch(e => {
    //     console.error(e);
    //     res.send(e)
    //   })
    });



module.exports = router;
