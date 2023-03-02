const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const petQueries = require('../db/queries/pets');

router.post('/', (req, res) => {

  console.log(res);
  
    petQueries.addPet({ pet })
      .then(pet => {
        res.redirect(`/pets/${pet.id}`); //redirect the user to show item page
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  };
)

// const addPet = function (pet) {
//   return db.query(
//     `INSERT INTO pets (user_id,
//       name,
//       breed,
//       age,
//       sex,
//       size,
//       spayed_or_neutered,
//       city,
//       description,
//       photo_url)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//     RETURNING *`,
//     [pet.user_id, pet.name, pet.breed, pet.age, pet.sex, pet.size, pet.spayed_or_neutered, pet.city, pet.description, pet.photo_url])
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }
