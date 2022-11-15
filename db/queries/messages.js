const db = require('../connection');

const getMessages = () => {
  return db.query(`
  SELECT *
  FROM messages
  `)
  .then(data => {
    const result = data.rows;

    return result;
  });
};


// const getSellerMessages = (user) => {
//   return db.query(`
//   SELECT *
//   FROM messages
//   WHERE seller_id = $1`, [user])
//   .then(result => {
//     return result.rows[0];
//   });
// }

// const createNewMessage = (message) => {

//   return db.query(
//     `INSERT INTO messages (seller_id, buyer_id, message)
//     VALUES ($1, $2, #3)
//     RETURNING *`,
//     [message.seller_id, message.buyer_id, message.message])
//     .then((result) => {
//       return result.rows[0];
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// }


// const getItemImages = () => {
//   return db.query(`
//   SELECT photo_url
//   FROM items
//   LIMIT 5`)
//   .then(data => { //async promise, always use a promise after
//     return data.rows; //an obj
//   });
// }

module.exports = { getMessages };
// module.exports = { getMessages, getSellerMessages, createNewMessage, getItemImages };
