const db = require('../connection');


// Get all messages
const getInboxDetails = (id) => {
  return db.query(`
SELECT * FROM messages
WHERE messages.recipient_id = $1
  `, [id])
  .then((data) => {
    return data.rows;
  })
};


module.exports = { getInboxDetails };
