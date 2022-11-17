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
};


// LEFT JOIN: The LEFT JOIN keyword returns all records from the left table (table1), and the matching records from the right table (table2).

// Get message history with a seller
const getChatHistory = (id, seller_id) => {
  return db.query(`

  SELECT * FROM messages
  FULL JOIN users ON users.id = seller_id
  JOIN items ON users.id = owner_id
  WHERE buyer_id = $1 and seller_id = $2
  ORDER BY date_sent DESC
  `, [id, seller_id])
  .then((data) => {
    return data.rows;
  })
};

module.exports = { getInboxDetails, getChatHistory };


// SELECT * FROM messages
// FULL JOIN users ON users.id = seller_id
// JOIN items ON users.id = owner_id
// WHERE buyer_id = $1 and seller_id = $2
// ORDER BY date_sent DESC
