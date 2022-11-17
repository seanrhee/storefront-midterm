const db = require('../connection');
const { itemPages } = require('./items')

const searchBar = (param) => {
  console.log('searchBar called', param);
  return db.query(`
  SELECT *
  FROM items
  WHERE title ILIKE upper('%' || $1 || '%') OR description ILIKE upper('%' || $2 || '%')
  ORDER BY id DESC`, [param, param])
  .then(data => {
    const result = itemPages(data.rows);
  
    return result;
  });
}

module.exports = { searchBar };