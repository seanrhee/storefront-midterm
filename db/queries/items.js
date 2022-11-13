
const addItem = function (item) {
  return pool.query(
    `INSERT INTO items (owner_id,
      title,
      price_per_item,
      description,
      photo_url,
      sold,
      condition,
      category,
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
    [item.owner_id, item.title, item.price_per_item, item.description, item.photo_url, item.sold, item.condition, property.category])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}

exports.addItem = addItem;
