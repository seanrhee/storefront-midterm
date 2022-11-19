const db = require('../connection');
const { itemPages } = require('./items')

const filterBar = (param) => {
  let params = new URLSearchParams(param);

  const paramObject = {}
  for(const [key, value] of params) { // each 'entry' is a [key, value] tupple
    paramObject[key] = value;
  }

  const queryParams = [];

  // generic sql query string
  let queryString = `
  SELECT items.*, users.city
  FROM items
  JOIN users on users.id = owner_id
  `;

  // if location is in the search param
  if (paramObject.city) {
    queryParams.push(`%${paramObject.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
  // if search query is in the param
  if (paramObject.search) {
    queryParams.push(`%${paramObject.search}%`);
    queryString += `AND title ILIKE upper($${queryParams.length}) `
  }
  // if min/max price are in the search param
  if (paramObject.minprice) {
    queryParams.push(Number(paramObject.minprice));
    queryString += `AND price_per_item > $${queryParams.length} `;
  }
  if (paramObject.maxprice) {
    queryParams.push(Number(paramObject.maxprice));
    queryString += `AND price_per_item < $${queryParams.length} `;
  }
  if (paramObject.condition) {
    queryParams.push(paramObject.condition);
    queryString += `AND condition = $${queryParams.length} `;
  }
  if (paramObject.category) {
    queryParams.push(paramObject.category.toUpperCase());
    queryString += `AND category = $${queryParams.length} `;
  }

  queryString += ` AND sold = false
  ORDER BY id DESC
  `;

  return db.query(queryString, queryParams)
  .then(data => {
    const result = itemPages(data.rows);
  
    return result;
  });
}

module.exports = { filterBar };