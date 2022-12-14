const db = require('../connection');

const itemPages = function (database) {
  const perPage = 16;

  const inputDatabase = database;

  const result = inputDatabase.reduce((resultArray, item, index) => {
    const pageIndex = Math.floor(index / perPage);

    if (!resultArray[pageIndex]) {
      resultArray[pageIndex] = [];
    }

    resultArray[pageIndex].push(item);

    return resultArray
  }, [])

  return result;
};

//add an item in items table
const addItem = function (item) {
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

//get all items
const getItems = () => {
  return db.query(`
  SELECT *
  FROM items
  WHERE sold = false
  ORDER BY id DESC
  `)
    .then(data => {
      const result = itemPages(data.rows);

    return result;
  });
};

//get an item's category
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

//get individual item to show users when they click into a listing
const getIndividualItem = (item) => {
  return db.query(`
  SELECT *
  FROM users
  JOIN items ON users.id = items.owner_id
  WHERE items.id = $1`, [item])
    .then(data => { //async promise, always use a promise after
      return data.rows[0]; //an obj
    });
}

//get saved item using userid = 19 (hard coding bc we're not making user login and registration)
const getSavedItems = (user_id = 19) => {
  return db.query(`
  SELECT *
  FROM saved_items
  JOIN items ON items.id = saved_items.item_id
  WHERE saved_items.user_id = $1
  ORDER BY items.id ASC`, [user_id])
    .then(data => {
      return data.rows;
    });
}

//const toggle favitem(itemid), determine if id exsist in the table, if it does delete and if it doesnt insert it
const toggleFavoriteItem = (item) => {
  return db.query(`
    SELECT item_id
    FROM saved_items
    WHERE item_id = $1`, [item.item_id])
    .then((result) => {
      if (result.rows.length === 0) {
        return db.query(
          `INSERT INTO saved_items (user_id, item_id)
            VALUES ($1, $2)
            RETURNING *`,
          [19, item.item_id]) //hard-coded user_id 19 to get saved_items
      } else {
        return db.query(
          `DELETE FROM saved_items
          WHERE item_id = $1`,
          [item.item_id])
      }
    })
}

//Delete item from saved_items table
const deleteFavItem = (item) => {
  return db.query(`
  DELETE FROM saved_items
  WHERE item_id = $1`, [item])
}

//used for filter
const searchBar = (param) => {
  return db.query(`
  SELECT *
  FROM items
  WHERE title LIKE '%$1%' OR description LIKE '%1%'
  ORDER BY id DESC`, [param])
  .then(data => {
    const result = itemPages(data.rows);

    return result;
  });
}

//Delete item from database
const deleteUserItem = (id) => {
  return db.query(`
  DELETE FROM items
  WHERE id = $1`, [id])
  .then(data => {
    return data;
  })
}

//Edit product info
const updateUserItem = (item, itemId, owner_id) => {
  return db.query(`
  UPDATE items
  SET title = $1, price_per_item = $2, description = $3, photo_url = $4, sold = $5, condition = $6, category = $7
  WHERE id = $8
  RETURNING *
  `, [item.title, item.price_per_item, item.description, item.photo_url, item.sold, item.condition, item.category, itemId])
  .then(item => {
    return item;
  })
}

// Get owner_id for item so user can contact the seller
const getItemOwner = (id) => {
  return db.query(`
    SELECT owner_id FROM items
    WHERE items.id = $1`, [id])
    .then(data => {
      return data.rows;
    })
};

module.exports = { getItems, getCategory, addItem, getIndividualItem, getSavedItems, toggleFavoriteItem, deleteFavItem, itemPages, searchBar, deleteUserItem, updateUserItem, getItemOwner };
