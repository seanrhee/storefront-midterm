const db = require('../connection');

// Gets all messages from database
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

// Gets user information for message recipients
const getUserDetails = (id) => {
    return db.query(`
  SELECT * FROM messages
  JOIN users ON creator_id = users.id
  WHERE users.id = $1 OR recipient_id = $1
    `, [id])
    .then((data) => {
      return data.rows;
    })
  };

  // Inserts a new message into the messages table
const sendMessage = (sender, recipient, message, timestamp) => {
  return db.query(`
  INSERT INTO messages (creator_id, recipient_id, message, created_at)
  VALUES ($1, $2, $3, $4);
  `, [sender, recipient, message, timestamp]).then(result => {
    return result.rows;
  })
}

module.exports = { getInboxDetails, getUserDetails, sendMessage };
