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
  ORDER BY id DESC
  `)
    .then(data => {
      const result = itemPages(data.rows);

      // console.log(result);

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
  WHERE saved_items.user_id = $1`, [user_id])
    .then(data => {
      // console.log(data.rows);
      return data.rows;
    });
}

//add an item into the saved_items table
// const addFavoriteItem = (item) => {
//   console.log('item is >>>>>>>>>>>>', item.item_id)
//   return db.query(
//     `INSERT INTO saved_items (user_id, item_id)
//     VALUES ($1, $2)
//     RETURNING *`,
//     [19, item.item_id]) //hard coding user_id to 19
//     .then((result) => {
//       console.log('result>>>>>>>>', result.rows[0])
//       return result.rows[0];
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }

//const toggle favitem(itemid), determine if id exsist in the table, if it does delete and if it doesnt insert it
const toggleFavoriteItem = (item) => {
  console.log('togglefav item id>>>>>>', item.item_id)
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
          [19, item.item_id])
      } else {
        return db.query(
          `DELETE FROM saved_items
          WHERE item_id = $1`,
          [item.item_id])
      }
    })
}

const deleteItem = (item) => {
  return db.query(`
  DELETE FROM saved_items
  WHERE item_id = $1`, [item.item_id])
}

const isFavorite = (item) => {
  return db.query(`
  SELECT item_id
  FROM saved_items
  WHERE item_id = $1`, [item.item_id])
    .then((data) => {
      console.log('this is result.rows>>>>>', data.rows)
      if (data.rows.length === 0) {
        return false;
      } else {
        return true;
      }
    });
}


module.exports = { getItems, getCategory, addItem, getIndividualItem, getSavedItems, toggleFavoriteItem, deleteItem, isFavorite};
