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

module.exports = { getItems, getCategory };