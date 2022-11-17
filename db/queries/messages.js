const db = require('../connection');


// Get all messages
const getInboxDetails = (id) => {
  return db.query(`
  SELECT * FROM messages
  JOIN users ON users.id = seller_id
  JOIN items ON users.id = owner_id
  WHERE seller_id != $1
  ORDER BY date_sent DESC
  `, [id])
  .then((data) => {
    return data.rows;
  })
}

module.exports = { getInboxDetails };
