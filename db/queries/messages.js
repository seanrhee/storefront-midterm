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

const sendMessage = (sender, recipient, message, timestamp) => {
  console.log('send message called');
  console.log(message)
  return db.query(`
  INSERT INTO messages (creator_id, recipient_id, message, created_at)
  VALUES ($1, $2, $3, $4);
  `, [sender, recipient, message, timestamp]).then(result => {
    console.log("query sent");
    return result.rows;
  })
}

module.exports = { getInboxDetails, getUserDetails, sendMessage };
