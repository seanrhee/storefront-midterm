const db = require('../connection');
const { itemPages } = require('./items')

const getUsers = (user_id) => {
  return db.query(`
  SELECT *
  FROM items
  WHERE owner_id = $1
  ORDER BY id DESC`, [user_id])
  .then(data => {
    return data.rows;
  });
};

module.exports = { getUsers };
