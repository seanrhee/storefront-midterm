const db = require('../connection');

const getMessageDetailsForInbox = () => {
  return db.query(`
  SELECT messages.id as message_id, CONCAT(first_name, ' ', last_name) as full_name, items.photo_url, items.owner_id, items.price_per_item, messages.message
  FROM users
  JOIN items ON users.id = items.owner_id
  JOIN messages ON users.id = messages.seller_id
  WHERE items.owner_id < 26
  GROUP BY messages.id, users.first_name, users.last_name, items.photo_url, items.owner_id, items.price_per_item, messages.message;
  `)
}


module.exports = { getMessageDetailsForInbox };
