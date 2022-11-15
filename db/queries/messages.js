const db = require('../connection');


const getIndividualMessage = (user) => {
  return db.query(`
  SELECT *
  FROM items
  WHERE id = $1`, [user])
  .then(result => { //async promise, always use a promise after
    return result.rows[0]; //an obj
  });
}

const createNewMessage = (message) => {
  
}

module.exports = { getIndividualMessage };
