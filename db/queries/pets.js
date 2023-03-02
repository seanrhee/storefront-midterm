const db = require('../connection');

// get pet's ID
const getPetId = (petId) => {
  console.log('getPetId called')

  return db.query(`
  SELECT *
  FROM pets
  WHERE pets.id = $1
  `, [petId])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}

// add pet into pets table
const addPet = (pet) => {
  console.log("addPet called");
  
  return db.query(
    `INSERT INTO pets (user_id,
      name,
      breed,
      age,
      sex,
      size,
      spayed_or_neutered,
      city,
      description,
      photo_url)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *`,
    [pet.user_id, pet.name, pet.breed, pet.age, pet.sex, pet.size, pet.spayed_or_neutered, pet.city, pet.description, pet.photo_url])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = { getPetId, addPet }