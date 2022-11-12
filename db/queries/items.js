const db = require('../connection');

const getItems = (limit = 16) => {
  return db.query(`
  SELECT *
  FROM items
  ORDER BY id DESC
  LIMIT $1`, [limit])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getItems };
