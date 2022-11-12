const db = require('../connection');

const getItems = () => {
  return db.query(`
  SELECT *
  FROM items
  ORDER BY id DESC
  `)
  .then(data => {
    return data.rows;
  });
};

const getCategory = (category) => {
  return db.query(`
  SELECT *
  FROM items
  WHERE category = $1
  ORDER BY id DESC`, [category])
  .then(data => {
    return data.rows;
  })
}

module.exports = { getItems, getCategory };
