const db = require('../connection');

const itemPages = function(database) {
  const perPage = 16;

  const inputDatabase = database;

  const result = inputDatabase.reduce((resultArray, item, index) => {
    const pageIndex = Math.floor(index/perPage);

    if (!resultArray[pageIndex]) {
      resultArray[pageIndex] = [];
    }

    resultArray[pageIndex].push(item);

    return resultArray
  }, [])

  return result;
};

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
      return result.rows[0];
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
    const result = itemPages(data.rows);

    console.log(result);

    return result;
  });
};

const getCategory = (category) => {
  return db.query(`
  SELECT *
  FROM items
  WHERE category = $1
  ORDER BY id DESC`, [category])
  .then(data => {
    const result = itemPages(data.rows)

    return result;
  })
}

const getIndividualItem = (item) => {
  return db.query(`
  SELECT *
  FROM items
  WHERE id = $1`, [item])
  .then(data => { //async promise, always use a promise after
    return data.rows[0]; //an obj
  });
}


module.exports = { getItems, getCategory, addItem, getIndividualItem };
