const db = require('../connection');

const addItem = function (item) {
  console.log('add item');
  return db.query(
    `INSERT INTO items (owner_id,
      title,
      price_per_item,
      description,
      photo_url,
      sold,
      condition,
      category)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [item.owner_id, item.title, item.price_per_item, item.description, item.photo_url, false, item.condition, item.category])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}

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

const getIndividualItem = (item) => {
  return db.query(`
  SELECT *
  FROM items
  WHERE category = $1`, [item])
  .then(data => {
    return data.rows;
  });
}


module.exports = { getItems, getCategory, addItem, getIndividualItem };
