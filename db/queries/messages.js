const db = require('../connection');

const getInboxForUser = (id) => {
  return db.query(`
  SELECT messages.id as message_id, CONCAT(first_name, ' ', last_name) as full_name, items.photo_url, items.price_per_item, messages.message, messages.buyer_id, messages.seller_id, messages.date_sent
  FROM users
  JOIN items ON users.id = items.owner_id
  JOIN messages ON users.id = messages.seller_id
  WHERE messages.buyer_id = $1
  GROUP BY users.first_name, users.last_name, items.photo_url, items.price_per_item, messages.id
  HAVING buyer_id = $2
  ORDER BY date_sent DESC;
  `, [id, id])
  .then((data) => {
    return data.rows;
  })
}


module.exports = { getInboxForUser };
