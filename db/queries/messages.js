const db = require('../connection');


// Get all messages
const getInboxDetails = (id) => {
  return db.query(`
  SELECT * FROM messages
  JOIN users ON users.id = creator_id
  WHERE messages.recipient_id = $1

  `, [id])
  .then((data) => {
    return data.rows;
  })
};


// LEFT JOIN: The LEFT JOIN keyword returns all records from the left table (table1), and the matching records from the right table (table2).

// Get message history
const getChatHistory = (id, creator_id) => {
  return db.query(`

  SELECT *
  FROM messages
  WHERE messages.recipient_id = $1 AND messages.creator_id = $2

  `, [id, creator_id])
  .then((data) => {
    return data.rows;
  })
};


// JOIN message_recipients ON message_id = messages.id

// SELECT * FROM MESSAGES
// JOIN users ON users.id = recipient_id
// JOIN message_recipients ON message_id = messages.id
// WHERE creator_id = $1

// insert into messages (creator_id, recipient_id, message, created_at, parent_message_id) values (5, 29, 'User-centric logistical system engine', '1664937644000', 20);

module.exports = { getInboxDetails, getChatHistory };
