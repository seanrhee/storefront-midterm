const db = require('../connection');


// Get all messages
const getInboxDetails = (id) => {
  return db.query(`
SELECT * FROM messages
JOIN users ON users.id = messages.creator_id
WHERE messages.recipient_id = $1
ORDER BY messages.created_at DESC
  `, [id])
  .then((data) => {
    return data.rows;
  })
};

const getUserDetails = (id) => {
    return db.query(`
  SELECT * FROM users
  JOIN items ON items.owner_id = users.id
  WHERE users.id = $1
    `, [id])
    .then((data) => {
      return data.rows;
    })
  };



module.exports = { getInboxDetails, getUserDetails };
