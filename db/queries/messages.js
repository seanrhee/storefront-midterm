const db = require('../connection');

const getDetailsForInbox = () => {
  return db.query(`
  SELECT messages.id as message_id, users.id, CONCAT(first_name, ' ', last_name) as full_name, items.photo_url, items.owner_id, items.price_per_item, messages.message, messages.buyer_id, messages.seller_id
  FROM users
  JOIN items ON users.id = items.owner_id
  JOIN messages ON users.id = messages.seller_id
  GROUP BY messages.id, users.id, users.first_name, users.last_name, items.photo_url, items.owner_id, items.price_per_item, messages.message;
  `)
}

const getInboxForUser = (id) => {
  return db.query(`
  SELECT messages.id as message_id, users.id, CONCAT(first_name, ' ', last_name) as full_name, items.photo_url, items.owner_id, items.price_per_item, messages.message, messages.buyer_id, messages.seller_id
  FROM users
  JOIN items ON users.id = items.owner_id
  JOIN messages ON users.id = messages.seller_id
  WHERE messages.buyer_id = $1
  GROUP BY messages.id, users.id, users.first_name, users.last_name, items.photo_url, items.owner_id, items.price_per_item, messages.message;
  SORT BY date;
  `, [id])
  .then((data) => {
    return data.rows;
  })
}


module.exports = { getDetailsForInbox, getInboxForUser };
